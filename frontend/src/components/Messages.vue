<template>
  <div>
    <Header/>
      <div class="post">
       <h1>Créer un post</h1>  
        <form>
          <section class="post_message">
            <label class="new_post" for="input_text">Envoyer un nouveau message:
            </label>
            <br />
            <h2>Titre</h2>
            <input v-model="message.title" class="post_title" placeholder="Titre du message" type="text"/>
              <h2> Message </h2>
              <input v-model="message.content" class="post_content" placeholder="Message" type="text">
          </section>
          <section class="post_image">            
            <h2> Votre image (facultatif) </h2>
           <input  type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
                        
          </section>      
            <button type="submit" 
              class="btn" @click="createMessage()">Envoyer 
            </button>
        </form>
      </div>
      
      <AllMessages/>
    <Footer/>
  </div>
</template>

<script>

import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AllMessages from "../components/AllMessages";

export default {
  name: "Messages",

  components: {
    Header,
    AllMessages,
    Footer,      
  },

  data() {
    return {
      message: {
        title: "",
        content:"",
        attachment:"",
        username: localStorage.getItem('username'),       
      },
  }
},

methods: {

  uploadImage(event) {
console.log(event.target.files[0])
   this.selectedFile = event.target.files[0];  
  },
    
 createMessage() {

  const MessageData = {
    title: this.message.title,
    content: this.message.content, 
    username: localStorage.getItem('username'),
    attachment: this.selectedFile
  }
      if (this.message.content == null || this.message.title == null) {
          window.alert('saisies invalides')
      }else{

        axios
          .post("http://localhost:8080/api/auth/messages/new", MessageData,
            { 
              headers :{
                Authorization: "Bearer " + localStorage.getItem("key"),
                
              }
            }).then((response) => {
                                               
              console.log(response) 
               
                 
            }).catch((error) => {
              console.log(error)
            })               
      }  
  }
},

}
 /*let currentUser = localStorage.getItem('username') // Pseudo capturé 
    let userMessage = response.data.UserId 
    if (userMessage) {
      userMessage = currentUser
      console.log(userMessage)
     return userMessage 
    

    }*/

</script>

<style scoped lang="scss">

h1{
  color: rgb(255, 255, 255)
}

label.new_post{
  color: rgb(255, 255, 255);
}

.input-text {
  width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
}

input {
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
}

.post_title {
  height: 30px;
  width: 200px;
}
.post_content {
  height: 30px;
  width: 200px;
}

.post_image {
  margin-top : 20px;
  margin-bottom: 20px;
  margin-left: 13%;
  display: flex;
  width: 74%;
  flex-direction: column;
}
.btn {
  margin-bottom: 60px;
}


</style>