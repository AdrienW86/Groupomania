<template>
     <div class="message-infos">
         <h1> mes messages </h1>
             <li class="list" v-for="message in messages" :key="message.id">
                 <div class="card" style="width: 28rem;">
                    <img class="card-img-top"  alt="Card image cap">{{message.picture}}
                        <div class="card-body">
                            <h5 class="card-title">
                                {{message.title}} {{message.id}}
                            </h5>
                            <p class="card-text">
                                {{message.content}}
                            </p>
                            <button type="button" 
                            class="btn btn-primary" 
                            @click="getOneUser()">Voir le message</button>
                        </div>
                 </div>
             </li>              
     </div>    
</template>

<script>

import axios from "axios";

export default { 
   name: "ListMessage", 
   
   data() {
  return {
  messages :[], 
  
  
  isUserLogged: "",
  msgError: "",  
  isAdmin: "",   
  }   
},  


mounted () {
   axios
    .get("http://localhost:8080/api/auth/messages/")
    .then((response) => {
      this.messages = response.data;
        for (let i = 0; i < this.messages.length; i++) {         
          this.messages[i].createdAt = this.messages[i].createdAt.replace("T", " à ");
          this.messages[i].createdAt = this.messages[i].createdAt.replace(".000Z","");                                 
        } 
      })
      .catch((err) => {
        console.log(err);
      });
    }, 
}


</script>

<style lang="scss" scoped>
li{
    list-style: none;
    display: flex;
    justify-content: center;
}
.card {
    margin-top: 30px;
}


</style>