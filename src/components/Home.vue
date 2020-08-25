<template>
  <v-container fluid style="padding: 0">
    <v-layout wrap>
      <v-flex mb-4>
        <v-sheet tile>
          <v-img src="@/assets/header-donut-bg.jpg" max-height="600" gradient="to top right, rgba(164, 124, 70,.4), rgba(25,35,64,.9)">
          <div style="height: 150px"></div>
            <v-card
              class="d-flex justify-space-between flex-wrap mx-auto"
              :style="contentWidth"
              color="transparent"
              flat
              tile
            >
              <v-card tile flat color="transparent" class="white--text pa-12">
                <h1 class="display-3 font-weight-bold ml-n1">{{ companyName }}</h1>
                <p class="subheading font-weight-light wrap py-3">{{ companyInfo }}</p>
              </v-card>
              <v-card tile flat color="transparent" class="pa-12">
                <span class="white--text overline">Featured Item</span>
                <v-img src="@/assets/strawberry-pink-donut.jpg" height="200px" width="200px"></v-img>
              </v-card>
            </v-card>
          </v-img>
        </v-sheet>
      </v-flex>
      <!-- put content here -->

    <!-- Embeds iframe of google map showing store location -->
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99799.33913455879!2d-121.50957364300822!3d38.58608002570775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdc798e7c1d45d7f5!2sGolden%20Donuts!5e0!3m2!1sen!2sus!4v1570511569500!5m2!1sen!2sus"
      width="350"
      height="450"
      frameborder="0"
      style="position:relative; top: 0px; left: 0px; border:0;"
      allowfullscreen
    ></iframe>

    <v-card tile flat color="transparent" class="pa-12">
                <v-img src="@/assets/open-hours.jpg" height="360px" width="250px" 
                style="position:relative; top: 0px; left: 0px; right: 0px; border:0;">
              </v-img>
    </v-card>


    <div 
    style="width: 580px; position:absolute; bottom: 200px; left: 700px; border:0;">
      <span class="yelp-review" data-review-id="6rWX8S88XuRQ9d6H1fpUYg" data-hostname="www.yelp.com">
        Read 
        <a href="https://www.yelp.com/user_details?userid=y-fr-xbc7Vk_Akmq2ZVeXw" rel="nofollow noopener">Nimartha K.</a>'s 
        <a href="https://www.yelp.com/biz/golden-donuts-elk-grove?hrid=6rWX8S88XuRQ9d6H1fpUYg" rel="nofollow noopener">review</a> of 
        <a href="https://www.yelp.com/biz/xaY0V4Vh_fv1ii1TjJWgTg" rel="nofollow noopener">Golden Donuts</a> on 
        <a href="https://www.yelp.com" rel="nofollow noopener">Yelp </a>
        <script async="async" src="https://www.yelp.com/embed/widgets.js" type="application/javascript"></script>
      </span>
    </div>


    <div
        style="width: 580px; position:absolute; bottom: 0px; left: 700px; border:0;">

        <span class="yelp-review" data-review-id="PukqPeYYUy3FkGVYf6RX6Q" data-hostname="www.yelp.com">Read 
          <a href="https://www.yelp.com/user_details?userid=iogp6txz4YOW9dxsKYstVg" rel="nofollow noopener">Erika R.</a>'s 
          <a href="https://www.yelp.com/biz/golden-donuts-elk-grove?hrid=PukqPeYYUy3FkGVYf6RX6Q" rel="nofollow noopener">review</a> of 
          <a href="https://www.yelp.com/biz/xaY0V4Vh_fv1ii1TjJWgTg" rel="nofollow noopener">Golden Donuts</a> on 
          <a href="https://www.yelp.com" rel="nofollow noopener">Yelp</a>
          <script async="async" src="https://www.yelp.com/embed/widgets.js" type="application/javascript"></script>
          
          </span>
    </div>


    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    companyName: "Golden Donuts",
    companyInfo:
      "A donuts and pastries shop located in Elk Grove, CA.",
    featuredItem: {
      backgroundColor: "grey",
      height: "128px",
      width: "128px"
    },
    contentWidth: {
      width: "1200px"
    }
  })
};
</script>

