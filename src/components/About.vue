<template>
  <v-sheet id="inspire" class="mx-auto mt-lg-12" style="padding-top: 100px;">
    <v-content>
      <v-container fluid class="">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>

            <v-card
    class="mx-auto"
    max-height="300"
    max-width="600"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-2 blue--text">Golden Donuts</div>
        <v-list-item-title class="about mb-2 black--text" >About</v-list-item-title>

         <v-list-item-title class="sub mb-1 black--text" > Golden Donuts is a donuts and pastries shop 

         </v-list-item-title>
         <v-list-item-title class="sub mb-1 black--text" >  in Elk Grove, CA. 
                The shop serves donuts, cronuts, </v-list-item-title>
            <v-list-item-title class="sub mb-1 black--text" >  fritters, muffins, croissants, and more. 
                Golden Donuts </v-list-item-title>
 <v-list-item-title class="sub mb-3 black--text" > was established in 2000 by Amanda and Isaac.</v-list-item-title>


        <v-list-item-subtitle class="blue--text">Address: </v-list-item-subtitle>
        <v-list-item-subtitle class="mb-2 black--text">8411 Elk Grove Florin Rd, Elk Grove, CA 95624</v-list-item-subtitle>

        <v-list-item-subtitle class="blue--text">Telephone: </v-list-item-subtitle>
        <v-list-item-subtitle class="black--text"> +1 (916) 681-5141 </v-list-item-subtitle>
       


      </v-list-item-content>

      <v-list-item-avatar src="@/assets/3.jpg"
        tile
        size="30"
        color=""
      ></v-list-item-avatar>
    </v-list-item>

   
  </v-card>


          </v-flex>
           
        </v-layout>
      </v-container>
    </v-content>
  </v-sheet>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.action {
    font-size:  2.2em;
    
}

.about {
    font-size: 2.3em;
}
</style>