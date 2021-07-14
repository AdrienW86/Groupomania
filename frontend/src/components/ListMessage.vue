<template>
     <div class="message-infos">
         <h1> Derniers messages publiés </h1>
             <li class="list" v-for="message in messages" :key="message.id">
                 <div class="card">
                   {{message.username}}
                   <div class="image_message">
                      <img :src="message.picture" 
                            class="card-img-top"  alt="photo_message"> 
                   </div>
                        <div class="card-body">
                            <h5 class="card-title">
                                {{message.title}} {{message.id}} 
                            </h5>
                            <p class="card-text">
                                {{message.content}}
                            </p>
                            <button type="button"
                            class="btn btn-primary" 
                            v-on:click.capture="getOneMessage()">Voir le message</button>
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
      messages    : [], 
      isUserLogged: "",  
      isAdmin     : "",  
    }
  },  

  methods: {

    getOneMessage() {
      
    },

    
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

h1 {
  color            : #0275d8;
  font-weight      : bold;
  font-style       : italic;
  margin           : 30px
}

li {
    list-style     : none;
    display        : flex; 
    margin         : 20px;
    justify-content: center;
}

.card {
    margin-top     : 30px;
    height         : 400px;
    width          : 250px; 
    justify-content: center;
}
.card-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
    
}

img {
  width: 200px;
  height: 200px;
}

</style>