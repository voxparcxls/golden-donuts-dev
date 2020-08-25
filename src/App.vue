<template>
  <v-app>
    <div>
      <v-toolbar flat dense absolute width="100%" color="rgba(255,255,255,0)" class="mt-12 pr-12">
        <v-toolbar-title v-if="!isHomePage()">
          <v-btn text to="/">Golden Donuts</v-btn>
        </v-toolbar-title>
        <div class="flex-grow-1"></div>
        <div v-if="isHomePage()">
          <!-- Every toolbar-item should have 2 render conditions for light and dark -->
          <v-btn
            text
            dark
            v-for="(nav, i) in mainNavigation"
            :key="i"
            router
            :to="nav.url"
            class="subheading mx-2"
          >{{ nav.text }}</v-btn>
        </div>
        <div v-if="!isHomePage()">
          <v-btn
            text
            v-for="(nav, i) in mainNavigation"
            :key="i"
            router
            :to="nav.url"
            class="subheading mx-2"
          >{{ nav.text }}</v-btn>
        </div>
        <div class="flex-shrink-1"></div>
      </v-toolbar>
    </div>
    <v-content>
      <div v-if="!isHomePage()" style="height: 150px"></div>
      <router-view></router-view>
    </v-content>



    <v-footer dark padless>
      <v-card flat title class="indigo lighten-1 white--text text-center" width="100%">
        <v-card-text>
          <v-btn v-for="(icon, i) in icons" :key="i" class="mx-4 white--text" icon :target="icon.target" :href="icon.link">
            <v-icon size="24px">{{icon.icon}}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
          <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Home from "./components/Home";
import EventBus from "./eventBus.js";

export default {
  name: "App",
  components: {
    Home
  },
  data: () => ({
    mainNavigation: [
      {
        text: "Menu",
        url: "/menu"
      },
      {
        text: "Rewards",
        url: "/rewards"
      },
      {
        text: "Order",
        url: "/order"
      },
      {
        text: "About Us",
        url: "/about"
      },
      {
        text: "Account",
        url: "/dashboard"
      }
    ],
    flat: true,
    icons: [
      {icon:'fab fa-facebook', link:'https://www.facebook.com/Golden-Donuts-109590275745046/', target:'_blank'},
      {icon:'fab fa-twitter', link:'https://twitter.com/goldendonuts?lang=en', target:'_blank'},
      {icon:'fab fa-yelp', link:'https://www.yelp.com/biz/golden-donuts-elk-grove', target:'_blank'},
      {icon:'fab fa-instagram', link:'https://www.instagram.com/goldendonuts_elkgrove/', target:'_blank'}
    ]
  }),
  methods: {
    isHomePage() {
      if (this.$route.path == "/") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
