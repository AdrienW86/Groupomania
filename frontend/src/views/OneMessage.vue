<template>
  <main>
    <Header />
    <Menu />
    <div class="message-infos">
    
    </div>
    <Footer />
  </main>
</template>

<script>
import axios from "axios"

import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";



export default {
  name: "OneMessage",

  props: {
    message: {
      type: [Number]
    }
    
  },

  components: {
    Header,
    Menu,
    Footer,
  
    
  },

  data() {
    return {
    
    };
  },

  mounted() {
    axios.get("http://localhost:8080/api/auth/messages/"+3)

     .then((response) => {
        this.messages = response.data;
        
        }
     )
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: red
}
</style>