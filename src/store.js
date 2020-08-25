import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuItems: [
      { 
        id: 1,
        name: "Glazed",
        description: "What is a glazed donut? If you haven't had a glazed donut before, bless your heart, and get your mixing bowl out. You MUST try them — they're like heaven on earth! They're little airy fried pastries shaped like a circle with a hole in the middle, and they're light, fluffy, and covered with a sugar icing called glaze.",
        price: 1.49,
        imageURL: require("@/assets/strawberry-pink-donut.jpg")
      },
      { 
        id: 2,
        name: "Strawberry",
        description: "Erat velit scelerisque in dictum non. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Nunc pulvinar sapien et ligula. Ullamcorper velit sed ullamcorper morbi tincidunt. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Magna fringilla urna porttitor rhoncus dolor purus non enim. Sed egestas egestas fringilla phasellus faucibus. Sed nisi lacus sed viverra tellus.",
        price: 2.49,
        imageURL: require("@/assets/strawberry-pink-donut.jpg")
      },
      { 
        id: 3,
        name: "Coconut",
        description: "Arcu cursus vitae congue mauris rhoncus aenean vel elit. Tortor vitae purus faucibus ornare. Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Pretium viverra suspendisse potenti nullam ac. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Consectetur libero id faucibus nisl. Ac turpis egestas maecenas pharetra convallis. ",
        price: .99,
        imageURL: require("@/assets/strawberry-pink-donut.jpg")
      },
      { 
        id: 4,
        name: "Chocolate",
        description: "Nunc scelerisque viverra mauris in aliquam sem. Bibendum at varius vel pharetra vel turpis. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Nec ullamcorper sit amet risus nullam eget felis. In eu mi bibendum neque egestas congue quisque.",
        price: 1.49,
        imageURL: require("@/assets/strawberry-pink-donut.jpg")
      },
      { 
        id: 5,
        name: "Beignet",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 2.99,
        imageURL: require("@/assets/strawberry-pink-donut.jpg")
      },
    ]
  },
  mutations: {

  },
  actions: {

  },
});
