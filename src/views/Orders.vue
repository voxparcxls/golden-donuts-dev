<template>
  <v-container fluid>
    <v-sheet max-width="1200" class="mx-auto pa-12">
      <OrdersCustomer v-if="!admin" />
      <div style="height: 100px;"></div>
      <OrdersAdmin v-if="admin" />
    </v-sheet>
  </v-container>
</template>
<script>
import OrdersCustomer from "../components/OrdersCustomer";
import OrdersAdmin from "../components/OrdersAdmin";
import axios from 'axios';
export default {
  components: {
    OrdersCustomer,
    OrdersAdmin
  },
  data() {
    return {
      admin: true
    };
  },
  created(){
    this.checkAdmin()
  },
  methods: { 
    checkAdmin() { 
      const isAdmin = localStorage.getItem('admin')
      this.admin = !(isAdmin == undefined)
    }
  }
};
</script>