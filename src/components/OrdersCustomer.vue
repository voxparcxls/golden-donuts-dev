<template>
  <v-flex>
    (Customer View: this should only show the customer's orders)
    <br/><br/>
    Orders are currently only available for customers who wish to purchase large orders
    <br />
    <b>My Orders:</b> 
    <v-data-table :headers="headers" :items="orders" :items-per-page="50">
      <template v-slot:item.actions="{ item }">
         <v-btn color="primary" fab x-small dark >
            <v-icon>mdi-pencil</v-icon>
         </v-btn>
         &nbsp;
         <v-btn v-if="item" color="warning" fab x-small dark @click="deleteOrder(item)" >
            <v-icon>mdi-delete</v-icon>
         </v-btn>
      </template>
    </v-data-table>
    <v-snackbar
      dark
      color="indigo"
      v-model="snackbar1"
    >
      Order has been deleted successfully
    </v-snackbar>
  </v-flex>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      headers: [
        {
          text: "Menu Name",
          value: "name",
          align: "left",
          sortable: false
        },
        { text: "Quantity", value: "quantity", sortable: false },
        {
          text: "Amount",
          value: "amount",
          align: "left",
          sortable: false
        },
        { text: "Purchased On", value: "date", align: "left", sortable: false },
        { text: "Status", value: "status", align: "left", sortable: false },
        { text: "Actions", value: "actions", align: "left", sortable: false }
      ],
      orders: [],
      snackbar1: false
    }
  },
  async created(){
    await this.getUserOrders();
  },
  methods:{
    async getUserOrders(){
      try { 
        const token = localStorage.getItem('jwt');
        let config = {
          method: 'get',
          url: 'http://localhost:4000/orders/me',
          headers: {
            Authorization: 'Bearer ' + token
          }
        }

        const r = await axios(config)
        if(r.data.length > 0){
          for(let a=0;a<r.data.length;a++){
            const token = localStorage.getItem('jwt');
            const menuID = r.data[a].menuid;
            let config = {
              method: 'get',
              url: `http://localhost:4000/api/menu/${menuID}`,
              headers: {
                Authorization: 'Bearer ' + token
              }
            }

            const r1 = await axios(config);
            if(r1.data.length){
              r.data[a].productData = r1.data[0];
            }

            let statusVar = '';
            if(r.data[a].status){
              statusVar = r.data[a].status.toUpperCase();
            }

            let orderfdate = '';

            if(r.data[a].orderdate){
              let tmpD = new Date(r.data[a].orderdate)
              orderfdate = tmpD.toLocaleString('en-US')            
            }

            let productName = '';
            if(r.data[a].productData.name){
              productName = r.data[a].productData.name
            }

            let productQtny = '';
            if(r.data[a].quantity){
              productQtny = r.data[a].quantity
            }

            let productAmt = 0;
            if(r.data[a].amount){
              productAmt = r.data[a].amount
            }

            let orderIDt = '';
            if(r.data[a].id){
              orderIDt = r.data[a].id;
            }
            this.orders.push(
              {
                name: productName,
                quantity: productQtny,
                amount: '$' + productAmt / 100,
                date: orderfdate,
                status: statusVar,
                orderid: orderIDt
              }
            );
          }
        }
      } catch (error) { 
        this.errors.push(error)
      }
    },
    async deleteOrder(item){
      if (confirm('Are you sure you want to delete your order')) { 
        const token = localStorage.getItem('jwt')

        let orderID = item.orderid;
        let config = {
          method: 'delete',
          url: `http://localhost:4000/orders/${orderID}`,
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
        const r = await axios(config)
        this.snackbar1 = true;
        this.orders = [];
        this.getUserOrders();
      }
    }
  }
};
</script>