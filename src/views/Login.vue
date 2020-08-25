<template>
  <v-sheet id="inspire" class="mx-auto mt-lg-12" style="padding-top: 100px;">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-snackbar
              :color="alert.color"
              v-model="alert.show"
              :timeout="alert.timeout"
            >{{ alert.message }}</v-snackbar>
            <v-card class="elevation-2">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field
                    name="login"
                    v-model="input.email"
                    :rules="usernameRules"
                    label="Email"
                    type="text"
                    v-on:keyup.enter="submit"
                  ></v-text-field>
                  <v-text-field
                    v-model="input.password"
                    name="password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    v-on:keyup.enter="submit"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="secondary darken-4" @click="register">Register</v-btn>
                <v-btn dark color="primary darken-4" @click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-sheet>
</template>
<script>
import axios from "axios";
import EventBus from "../eventBus";
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      input: {
        email: "",
        password: ""
      },
      valid: true,
      usernameRules: [v => !!v || "Email is required"],
      passwordRules: [v => !!v || "Password is required"],
      alert: {
        color: "",
        show: false,
        message: "",
        timeout: 2000
      }
    };
  },
  methods: {
    async submit() {
      try {
        const payload = {
          email: this.input.email,
          password: this.input.password
        };

        await this.validateLogin(payload);
        await this.validateEmail(payload.email);

        const loginResponse = await this.loginUser(payload);
        localStorage.setItem('jwt', loginResponse.token)
        if (loginResponse.user.isAdmin) {
          localStorage.setItem('admin', true)
        }
        
        // Redirect to dashboard
        this.$router.push('dashboard')
        
      } catch (error) {
        this.alert.color = "error";
        this.alert.message = error.message;
        this.alert.show = true;
      }
    },
    validateLogin(payload) {
      if (!payload.email || !payload.password) {
        throw new Error("All fields are required.");
      } else {
        return;
      }
    },
    validateEmail(email) {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        throw new Error("Invalid email address.");
      } else {
        return;
      }
    },
    async loginUser(payload) {
      try { 
        let r = await axios.post("http://localhost:4000/users/login", payload)
        return r.data
      } catch (error) { 
        throw new Error(error.response.data['error'])
      }
    },
    register() {
      this.$router.replace({ name: "registration" });
    }
  }
};
</script>
