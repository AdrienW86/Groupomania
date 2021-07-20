<template>
     <main class="message-infos">
         <h1> Derniers messages publiés </h1>

         <button type="btn" class="btn btn-success"> 
           <router-link to="/new-message"> Envoyer un message 
           </router-link> 
          </button>
          <section>
             <li class="list" v-for="message in messages" :key="message.id">
                 <div class="card">
                   <div class="card-header">
                      <div class="admin" v-if="message.isAdmin == true">
                        <h5> {{message.username}} </h5>
                      </div>
                      <div class="membre" v-else-if="message.isAdmin == false">
                        <h5> {{message.username}} </h5>
                      </div>                
                      <div class="image_message">
                        <img :src="message.picture" 
                              class="card-img-top"  
                              alt="photo_message">                                       
                      </div>
                   </div>
                    <div class="card-body">
                      <div>
                        <h5 class="card-title"> {{message.title}} </h5>
                          <p class="card-text"> {{message.content}}</p>    
                      </div> 
                    </div>
                      <div class="card_body">                                             
                            <button 
                                type="button" 
                                class="btn btn-success"
                                @click="like(message.id);">like
                            </button> 
                              <span id="like" class="like"> {{message.likes}} </span>
                            <button 
                                    type="button"
                                    class="btn btn-danger"
                                    @click="dislike(message.id)"> dislike </button>
                              <span id="dislike" class="like"> {{message.dislikes}} </span>
                            
                            <form enctype="mmultipart/form-data">
                              <input v-model="comment.content" type="textarea"  name="comment" placeholder="Votre commentaire">
                                <button 
                                type="submit" 
                                class="btn btn-primary"
                                @click="commentMessage(message.id)"> Commenter </button>
                            </form>
                      </div>                                                             
                      <div class="card-footer">
                         <p> {{message.createdAt}} </p>
                            <button v-if=" isAdmin = true" 
                                    class="btn btn-danger"
                                    @click="deleteMessage(message.id)"> effacer 
                            </button>
                            <button type="button" 
                                    class="btn btn-primary"
                                    @click="getOneMessage(message.id)">Voir le message</button>
                      </div>
                    
                 </div>
             </li>  
          </section>            
     </main>    
</template>

<script>

import axios from "axios";
import { mapState } from "vuex";

export default { 
   name: "ListMessage", 

   computed: {
     ...mapState(['users']),
   },

   data() {
    return {
      messages    : [], 
      isUserLogged: "",  
      isAdmin     : localStorage.getItem('isAdmin'),
      user : localStorage.getItem('user'),
      comment: {
        content: ""
      }
    }
  }, 
  
  methods: {
    
    listMessages() {
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

    getOneMessage(id) {
      alert(id)
      axios
      .get("http://localhost:8080/api/auth/messages/"+id, {
         headers: { Authorization: "Bearer " + localStorage.getItem("key") },
            })
      .then((response) => {
      console.log(response)
      }).catch(err => {
        console.log(err)
      })     
       window.location.href = "/#/messages/"+id;
    },

    deleteMessage(id) {
alert(id)
      axios
        .delete("http://localhost:8080/api/auth/messages/+"+id,  )
        
      .then((response) => {
      console.log(response)
      }).catch(err => {
        console.log(err)
      })     
        
    },

     like(id) {
     
      console.log(id)
      axios.post("http://localhost:8080/api/auth/messages/like/"+id,{
         headers: { Authorization: "Bearer " + localStorage.getItem("key") },
            }                   
      ).then((response) => {      
      console.log(response)
      }).catch(err => {
        console.log(err)
      })     
    },

    dislike(id) {
      
      axios.post("http://localhost:8080/api/auth/messages/dislike/"+id,{
         headers: { Authorization: "Bearer " + localStorage.getItem("key") },
            }
      )  
      .then((response) => {
      console.log(response)
      }).catch(err => {
        console.log(err)
      })     
    }, 
    
    commentMessage(id) {

      if (this.comment.content == null ) {
        window.alert("saisies invalides");
      } else {
      const newComment = new FormData();
      newComment.append("username", localStorage.getItem("username"));
      newComment.append("content", this.comment.content.toString());

      axios.post("http://localhost:8080/api/auth/messages/comment/"+id, newComment,{
            headers: { Authorization: "Bearer " + localStorage.getItem("key") },
          })
          .then((response) => {
            console.log(response.data);
            alert("commentaire envoyé !");
            
          })
          .catch((error) => {
            console.log(error);
          }); 
      }
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
section {
  display: flex;
  flex-flow: wrap;
  justify-content: center
}
li {
    list-style     : none;
    display        : flex; 
    margin         : 20px;
    justify-content: center;
}

.card {
    margin-top     : 30px;
    height         : 600px;
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

.likes {
  color: green
}

.dislikes {
  color: red
}

</style>