<template @click="reset">
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add Menu Item</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Menu Item</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
              <v-row>
                <v-text-field
                  v-model="name"
                  :counter="26"
                  :rules="nameRules"
                  label="Name"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="description"
                  :counter="140"
                  :rules="descriptionRules"
                  label="Description"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="price"
                  :rules="priceRules"
                  label="Price"
                  prefix="$"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="imageURL"
                  :rules="imageURLRules"
                  label="Image Url"
                  hint="https://www.example.com/image.jpg"
                  persistent-hint
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-combobox
                  v-model="seasonal"
                  :items="seasons"
                  label="Season/Event"
                  hint="Select a season/event or create a new one"
                  persistent-hint
                ></v-combobox>
              </v-row>
              <v-row>
                <v-switch
                  v-model="hide"
                  label="HIDE"
                ></v-switch>
              </v-row>
              <!-- <v-row>
                <v-file-input show-size counter prepend-icon="mdi-file-image-outline" label="Upload Image"></v-file-input>
              </v-row> -->
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-1" text @click="reset">Clear</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn :disabled="!valid" color="success" @click="validate">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  data: () => ({
    dialog: false,
    valid: true,

    editingItemID: "",
    name: "",
    nameRules: [
      v => !!v || "Item name is required",
      v =>
        (v && v.length <= 26) ||
        'Item name must be less than 26 characters'
    ],
    description: "",
    descriptionRules: [
      v => !!v || "Item description is required",
      v =>
        (v && v.length <= 140) ||
        'Item description must be less than 140 characters'
    ],
    price: "",
    priceRules: [
      v => !!v || "Price is required",
      v => /\./.test(v) || 'Price must be in the format $0.00'
    ],
    imageURL: "",
    imageURLRules: [
      v => !!v || "Image url is required",
      v => /^(http|https)/.test(v) || 'Url must be in the format https://www.example.com'
    ],
    seasonal: 'None',
    seasons: [
      'None',
      'Christmas',
      'Halloween',
      'Thanksgiving',
    ],
    hide: false
  }),
  watch: { 
    dialog (val) { 
      !val && this.reset()
    }
  },
  methods: {
    openEditForm(item) { 
      this.editingItemID = item.id
      this.name = item.name
      this.description = item.description
      this.price = this.handlePrice(item.price)
      this.imageURL = item.imageURL
      this.seasonal = item.seasonal
      this.hide = item.hide
      this.dialog = true
    },
    async validate() {
      if (this.$refs.form.validate()) {
        const newItem = {
          name: this.name,
          description: this.description,
          price: Number(this.price.replace('.', '')),
          imageURL: this.imageURL,
          seasonal: this.seasonal,
          hide: this.hide
        }
        if (this.editingItemID) { 
          await this.$parent.updateItem(this.editingItemID, newItem)
        } else { 
          await this.$parent.saveNewItem(newItem);
        }
        this.dialog = false
      }
    },
    handlePrice(p) {
      var strPrice = `${p}`
      if (strPrice.length == 2) strPrice = '0' + strPrice // Handles items that are less than $1.00
      return '' + strPrice.slice(0, strPrice.length - 2) + '.' + strPrice.slice(strPrice.length - 2)
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>