<template>
  <v-container fluid class="">
    <AddMenuItem v-if="admin"/>
    <v-sheet max-width="900" class="mx-auto pa-12">
      <v-row>
        <v-col v-for="(item, index) in items" :key="item.id" cols="6">
          <v-card>
            <v-list-item three-line>
              <v-list-item-content class="align-self-start">
                <v-list-item-icon v-if="item.seasonal != 'None' && item.seasonal != null">
                  <v-icon> far fa-clock</v-icon>
                  <v-card-text v-text="item.seasonal"></v-card-text>
                </v-list-item-icon>
                <v-list-item-title
                  class="headline mb-2"
                  v-text="item.name"
                ></v-list-item-title>

                <v-list-item-subtitle v-text="price(item.price)"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                size="100"
                tile
              >
                <v-img :src="item.imageURL" contain></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-actions v-if="admin">
              <v-btn text v-on:click="openEditor(item)">Edit</v-btn>
              <v-spacer></v-spacer>
              <v-icon medium v-on:click="deleteItem(item.id, index)">mdi-delete</v-icon>
            </v-card-actions>

            <v-card-actions>
              <v-btn text v-on:click="addToCartProd(item)">Place Order</v-btn>
            </v-card-actions>

             <v-snackbar
              dark
              color="indigo"
              v-model="snackbar1"
            >
              Order has been placed successfully
            </v-snackbar>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>


<script>
import AddMenuItem from "./AddMenuItem";
import axios from 'axios';

export default {
  components: {
    AddMenuItem
  },
  data() { 
    return { 
      items: [],
      errors: [],
      admin: false,
      quantity: 1,
      qitems: [1,2,3,4,5,6,7,8,9,10],
      snackbar1: false
    }
  },
  // Fetches menu when the component is created
  created() { 
    this.checkAdmin()
    axios.get('http://localhost:4000/api/menu')
    .then(response => { 
      this.items = response.data
      var i;
      if (!this.admin){
        for (i = 0; i < this.items.length; i++){
          if (this.items[i].hide) {
            this.items.splice(i,1);
          }
        }
      }
    })
    .catch(e => { 
      this.errors.push(e)
    })
  },
  methods: { 
    checkAdmin() { 
      const isAdmin = localStorage.getItem('admin')
      this.admin = !(isAdmin == undefined)
    },
    price(p) {
      var strPrice = `${p}`
      if (strPrice.length == 2) strPrice = '0' + strPrice // Handles items that are less than $1.00
      return "$" + strPrice.slice(0, strPrice.length - 2) + '.' + strPrice.slice(strPrice.length - 2)
    },
    openEditor(item) { 
      this.$children[0].openEditForm(item)
    },
    async deleteItem(itemID, index) { 
      if (confirm('Are you sure you want to delete')) { 
        const token = localStorage.getItem('jwt')
        let config = {
          method: 'delete',
          url: `http://localhost:4000/api/menu/${itemID}`,
          headers: {
            Authorization: 'Bearer ' + token
          },
        }
        const r = await axios(config)
        this.items.splice(index, 1)
      }
    },
    async saveNewItem(newItem) { 
      try { 
        const token = localStorage.getItem('jwt')
        let config = {
          method: 'post',
          url: 'http://localhost:4000/api/menu',
          headers: {
            Authorization: 'Bearer ' + token
          },
          data: newItem
        }
        const r = await axios(config)
        this.items.push(r.data)
        return
      } catch (error) { 
        this.errors.push(error)
      }
    },
    async updateItem(itemID, updatedItem) { 
      try { 
        const token = localStorage.getItem('jwt')
        let config = {
          method: 'put',
          url: `http://localhost:4000/api/menu/${itemID}`,
          headers: {
            Authorization: 'Bearer ' + token
          },
          data: updatedItem
        }
        const r = await axios(config)
        const index = this.items.findIndex(x => x.id === itemID)
        this.$set(this.items, index, r.data)
        return
      } catch (error) { 
        console.log(error)
        this.errors.push(error)
      }
    },
    async addToCartProd(prod) {
      try { 
        const token = localStorage.getItem('jwt')

        const pay = {
          menuid: prod.id,
          quantity: 1
        }

        const config = { 
          method: 'post',
          url: 'http://localhost:4000/orders',
          headers: { 
            Authorization: 'Bearer ' + token
          },
          data: pay
        }

        const r = await axios(config)
        this.snackbar1 = true

      } catch (error) { 
        this.errors.push(error)
      }
    }
  }
};
</script>