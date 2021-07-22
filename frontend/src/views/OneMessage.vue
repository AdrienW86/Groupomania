<template>
  <main>
    <Header/>
    <Menu/>
    <div class="message-infos">
      
        <app-listmessage>   </app-listmessage>
  
         
          
     </div>    
    <Footer/>
  </main>
</template>

<script>
//import axios from "axios"

import Header from "../components/Header.vue"
import Menu from "../components/Menu.vue"
import Footer from "../components/Footer.vue"


export default {
   name: "OneMessage" ,
  
   components: {
       Header,
       Menu,
       Footer,
      
   },

   

   data() {
    return {
      text: 'Hi from data'
      
    };
   },

  
}



</script>