<template>
  <v-sheet id="inspire" class="mx-auto mt-lg-12">
    <v-content>
      <v-container class="mt-xl pt-xl" fluid style="padding-top: 100px !important;">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-snackbar
              :color="alert.color"
              v-model="alert.show"
              :timeout="alert.timeout"
            >{{ alert.message }}</v-snackbar>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Register</v-toolbar-title>
              </v-toolbar>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Name"
                      v-model="input.name"
                      type="text"
                      :rules="nameRules"
                      required
                    ></v-text-field>

                    <v-text-field
                      label="Email Address"
                      v-model="input.email"
                      required
                      type="text"
                      :rules="emailRules"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      v-model="input.password"
                      required
                      type="password"
                      :rules="passwordRules"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
              </v-form>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="secondary" @click="goToLoginPage()">Back</v-btn>
                <v-btn color="primary" @click="register()">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-sheet>
</template>
<script>
import EventBus from "../eventBus";
import axios from "axios";
export default {
  data() {
    return {
      input: {
        name: "",
        email: "",
        username: "",
        password: ""
      },
      valid: true,
      nameRules: [v => !!v || "Name is required"],
      emailRules: [v => !!v || "Email is required"],
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
    async register() {
      try { 
        const payload = { 
          name: this.input.name,
          email: this.input.email,
          password: this.input.password
        }
        this.validateLogin(payload);
        this.validateEmail(payload.email);

        const registrationResponse = await this.registerUser(payload);
        localStorage.setItem('jwt', registrationResponse.token)
        
        this.$router.push('dashboard');
      } catch (error) { 
        this.alert.color = "error";
        this.alert.message = error.message;
        this.alert.show = true;
      }
    },
    validateLogin(payload) { 
      if (!payload.name || !payload.email || !payload.password) { 
        throw new Error("All fields are required")
      } else { 
        return;
      }
    },
    validateEmail(email) {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        throw new Error('Invalid email address.');
      } else {
        return;
      }
    },
    async registerUser(payload) { 
      try { 
        const r = await axios.post("http://localhost:4000/users/register", payload)
        return r.data
      } catch (error) { 
        throw new Error(error.response.data['error'])
      }
    },
    goToLoginPage() {
      this.$router.push('login')
    }
  }
};
</script>
