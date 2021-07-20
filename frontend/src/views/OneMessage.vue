<template>
  <main>
    <Header/>
    <Menu/>
    <div class="message-infos">
         <h1> Message de :  </h1>
             <li class="list" v-for="message in messages" :key="message.id">
                 <div class="card" style="width: 28rem;">
                    <img class="card-img-top"  alt="Card image cap">{{message.picture}}
                        <div class="card-body">
                            <h5 class="card-title">
                                {{message.title}}
                            </h5>
                            <p class="card-text">
                                {{message.content}}
                            </p>
                            <a href="#" class="btn btn-primary">Voir le message</a>
                        </div>
                 </div>
             </li>              
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
       Footer
   },

   data() {
    return {
      messages: [],
      
    };
   },
}



</script>