<template>
  <v-flex>
    (Admin View: this should show all customer's orders to be processed)
    <v-data-table :headers="headers" :items="orders" :items-per-page="50">
      <template v-slot:item.action="{ item }">
        <select
          v-model="item.status"
          style="border: 1px solid #aaa; border-radius: 3px; padding: 4px;"
        >
          <option disabled value>{{ item.status }}</option>
          <option v-for="(status, key) in statusList" v-bind:key="key">{{ status }}</option>
        </select>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      statusList: [
        "Pending",
        "In Progress",
        "Completed",
        "Rejected",
        "Withdrawn",
        "Picked Up"
      ],
      headers: [
        {
          text: "Customer Name",
          value: "name",
          align: "left",
          sortable: false
        },
        {
          text: "Phone Number",
          value: "phone",
          align: "left",
          sortable: false,
          width: "150px"
        },
        {
          text: "Order Details",
          value: "details",
          align: "left",
          sortable: false,
          width: "280px"
        },
        { text: "Total Price", value: "price", align: "left", sortable: false },
        { text: "Purchased On", value: "time", align: "left", sortable: false },
        { text: "Status", value: "status", align: "left", sortable: false },
        { text: "Change Status", value: "action" }
      ],
      orders: [
        {
          name: "John",
          phone: "(916) 555-1204",
          details:
            "36x Glazed, 12x Strawberry, 24x Chocolate, 36x Glazed, 12x Strawberry, 24x Chocolate",
          price: 300,
          time: new Date().toLocaleString(),
          status: "Pending"
        },
      ]
    };
  },
  async created(){
    await this.getAllOrders();
  },
  methods:{
    async getAllOrders(){
      const token = localStorage.getItem('jwt');
      let config = {
        method: 'get',
        url: `http://localhost:4000/api/orders`,
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

          const uID = r.data[a].userid;
          let config1 = {
            method: 'get',
            url: `http://localhost:4000/api/users/${uID}`,
            headers: {
              Authorization: 'Bearer ' + token
            }
          }

          const r1 = await axios(config);
          const r2 = await axios(config1);
          if(r1.data.length){
            r.data[a].productData = r1.data[0];
          }

          let customername =  '';

          if(r2.data.length){
            customername = r2.data[0].name;
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
          this.orders.push(
            {
              name: customername,
              phone: '',
              details: r.data[a].quantity + 'x ' + r.data[a].productData.name,
              price: '$' + r.data[a].amount / 100,
              time: orderfdate,
              status: statusVar
            }
          );
        }
      }
    } 
  }
};
</script>