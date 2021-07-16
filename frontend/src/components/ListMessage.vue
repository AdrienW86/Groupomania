<template>
     <div class="message-infos">
         <h1> Derniers messages publiés </h1>

         <button type="btn" class="btn btn-success"> 
           <router-link to="/new-message"> Envoyer un message 
           </router-link> 
           </button>
             <li class="list" v-for="message in messages" :key="message.id">
                 <div class="card">
                  <div class="admin" v-if="message.isAdmin == true">
                      <h5> {{message.username}} </h5>
                  </div>
                  <div class="membre" v-else-if="message.isAdmin == false">
                      <h5> {{message.username}} </h5>
                  </div>                
                   <div class="image_message">
                      <img :src="message.picture" 
                            class="card-img-top"  alt="photo_message"> 
                   </div>
                        <div class="card-body">
                            <h5 class="card-title">
                                {{message.title}} 
                            </h5>
                            <p class="card-text">
                                {{message.content}}
                            </p>
                                {{message.createdAt}} 
                            <button type="button" 
                                    class="btn btn-success"
                                    @click="Like()"> like</button> 
                <span id="like"> {{message.likes}} </span>

                            <button type="button" class="btn btn-danger"> dislike </button>

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
    


    Like() {
      
      
      
    },

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

h5 {
  font-weight: bold;
  font-style: italic;
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

a {
  color:white;
  text-decoration: none;
  font-weight: bold;
}

.admin {
    color:red;
    
}

.membre {
    color:green;
    
}

span{
  color: red
}
</style>