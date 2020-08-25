<template>
  <v-container fluid>
    <v-sheet max-width="900" class="mx-auto pa-12">
      <v-row justify="center">
        <span>Dashboard</span>
      </v-row>
      <v-row justify="center">
        <span>{{user.name}}</span>
      </v-row>
      <v-row justify="center">
        <span>{{user.email}}</span>
      </v-row>
      <v-row justify="center">
        <v-btn color="error" @click="logOut()">Log Out</v-btn>
      </v-row>
      <v-row justify="center" v-if="changePassFields === false" class="mt-5">
        <v-btn color="primary" @click="changePassFields = true">Change Password</v-btn>
      </v-row>

      <v-row v-if="changePassFields === true" class="">
        <v-text-field
          v-model="password"
          name="password"
          label="New Password"
          type="password"
          v-on:keyup.enter="changePassword"
        ></v-text-field>
        <v-text-field
          v-model="confirmpassword"
          name="password"
          label="Retype New Password"
          type="password"
          class="ml-sm"
          v-on:keyup.enter="changePassword"
        ></v-text-field>
        <v-btn dark color="primary darken-4" @click="changePassword()">Change Password</v-btn>
      </v-row>

      <v-row justify="center" v-if="updateNameField === false" class="mt-5">
        <v-btn color="primary" @click="updateNameField = true">Edit Name</v-btn>
      </v-row>

      <v-row v-if="updateNameField === true">
          <v-text-field
              label="Name"
              v-model="name"
              type="text"
              required
          ></v-text-field>
          <v-btn dark color="primary darken-4" @click="updateName()">Edit Name</v-btn>
      </v-row>
      
      <v-row justify="center" class="mt-5">
        <v-btn color="error" @click="deleteAccount()">Delete Account</v-btn>
      </v-row>

      <v-snackbar
        :color="alert.color"
        v-model="alert.show"
        :timeout="alert.timeout"
      >{{ alert.message }}</v-snackbar>
    </v-sheet>
  </v-container>
</template>

<script>
import axios from "axios";
export default{
	data(){
		return{
      user: {},
      errors: [],
      alert: {
        color: "",
        show: false,
        message: "",
        timeout: 2000
      },
      password: '',
      confirmpassword: '',
      name: '',
      changePassFields: false,
      updateNameField: false
		}
  },
  created() { 
    const token = localStorage.getItem('jwt')
    axios.get('http://localhost:4000/users/me', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => { 
      this.user = response.data
    })
    .catch(e => { 
      this.errors.push(e)
    })
  },
  methods: { 
    async logOut() {
      try { 
        await this.logOutUser()
        localStorage.removeItem('jwt')
        localStorage.removeItem('admin')
        this.$router.push('login');
      } catch (error) { 
        this.alert.color = "error";
        this.alert.message = error.message;
        this.alert.show = true;
      }
    },
    async logOutUser() { 
      try { 
        const token = localStorage.getItem('jwt')
        let config = {
          method: 'post',
          url: 'http://localhost:4000/users/me/logout',
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
        const r = await axios(config)
        return
      } catch (error) { 
        throw new Error(error.response.data['error'])
      }
    },
    async changePassword(){
      try { 

        if(this.password && this.confirmpassword){
          if(this.password !== this.confirmpassword)
          {
            this.alert.color = "error";
            this.alert.message = 'Password and Confirm Password should be same';
            this.alert.show = true;
          }else{
            const pay = { 
              password: this.password
            }
            const token = localStorage.getItem('jwt')
            let config = {
              method: 'put',
              url: 'http://localhost:4000/users/me',
              headers: {
                Authorization: 'Bearer ' + token
              },
              data: pay
            }
            const r = await axios(config)
            this.alert.color = "success";
            this.alert.message = 'Password has been changed successfully';
            this.alert.show = true;

            this.changePassFields = false;
            return
          }
        }else{
          this.alert.color = "error";
          this.alert.message = 'Fields are required';
          this.alert.show = true;
        }
      } catch (error) { 
        throw new Error(error.response.data['error'])
      }
    },
    async updateName(){
      try { 

        if(this.name){
          const token = localStorage.getItem('jwt')
          const pay = {
            name: this.name
          }
          let config = {
            method: 'put',
            url: 'http://localhost:4000/users/me',
            headers: {
              Authorization: 'Bearer ' + token
            },
            data: pay
          }
          const r = await axios(config)
          this.alert.color = "success";
          this.alert.message = 'Name has been updated successfully';
          this.alert.show = true;

          this.updateNameField = false;
          return
        }else{
          this.alert.color = "error";
          this.alert.message = 'Field is required';
          this.alert.show = true;
        }
      } catch (error) { 
        throw new Error(error.response.data['error'])
      }
    },
    async deleteAccount(){
      if (confirm('Are you sure you want to delete your Account')) { 
        const token = localStorage.getItem('jwt')
        let config = {
          method: 'delete',
          url: `http://localhost:4000/users/me`,
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
        const r = await axios(config)

        this.alert.color = "success";
        this.alert.message = 'Your account has been deleted successfully';
        this.alert.show = true;
        this.logOut();
      }
    }
  }
}
</script>