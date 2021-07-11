<template>
    
   
     <div class="message-infos">
         <h1> mes messages </h1>
                <li class="list" v-for="message in messages" :key="message.id">
                    <section class="content">
                        <div class="present">
                            <div class="user">
                                <span class="infos"> {{ message.UserId }} </span>
                                <span class="photo"> {{ message.picture}} </span>
                            </div>
                             <div class="date">
                                <span class="infos"> Envoyé le: {{ message.createdAt }} </span>
                            </div>
                        </div>
                        <div class="voir_message">
                            <button class="see_message" @click="getOneMessage()">Voir</button>
                        </div>
                    </section>
                    <section class="about_message">
                        <div class="title"> 
                          {{ message.title }}
                        </div>
                        <div class="message_content">
                            <span class="infos">{{ message.content }} </span>
                        </div>
                    </section>
                </li>
            </div> 
    
</template>

<script>

import axios from "axios";

export default { 
   name: "ListMessage", 
   
   data() {
  return {
  messages :[] 
  ,
  isUserLogged: "",
  msgError: "",  
  isAdmin: "",   
  }   
},  

mounted () {
   axios
    .get("http://localhost:8080/api/auth/messages")
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


li {
  display       : flex;
  flex-direction: column;
  list-style    : none;
  color         : rgb(165, 5, 5);
  border        : 2px solid rgb(143, 24, 24);
  height        : 150px;
  width         : 100%;

    .content {
        display      : flex;
        height       : 60px;
        width        : 100%;
        font-weight  : bold;
        text-align   : left;   
        white-space  : nowrap;
        overflow     : hidden;
        text-overflow: ellipsis;
    }

    .present {
        width: 84%;
    }
    
  .user {
    height: 30px;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .date {
    height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .voir_message {
    width: 14%;
   
    .see_message {
      background: rgb(148, 32, 32);
      color: blue;
      font-weight: bold;
      width: 100%;
      &:hover {
        transform: scale(1.1);
        color: red;
      }
    }
  }
}
</style>