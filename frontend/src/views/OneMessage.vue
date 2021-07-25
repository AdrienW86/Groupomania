<template>
  <main>
    <Header />
    <Menu />              
        <section class="card">        
           
                
                 
              <img
                :src="message.picture"
                class="card-img-top"
                alt="photo_message"
              />
                   
          
          <div class="text">
            <h6 class="card-title">{{message.title }}</h6>
            {{ message.content }}
          </div>
          <div class="card_body">
            <form enctype="multipart/form-data">
              <textarea                
                type="select"
                v-model="comment.content"
                rows="2"
                name="comment"
                placeholder="Votre commentaire, agrandissez la fenêtre"
                class="comment-input">
              </textarea> 
              <div class="btn-comment">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent.stop="commentMessage(message.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-envelope-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"
                    />
                  </svg>
                </button>
              </div>
            </form> 
          </div>
          <div class="card-footer">
            <p>{{ message.createdAt }}</p>
            <div class="box-btn">
              <button
                type="button"
                class="btn btn-success"
                @click="like(message.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  class="bi bi-hand-thumbs-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
                  />
                </svg>
              </button>
              <span id="like" class="like"> {{ message.likes }} </span>             
            </div>
          </div>
            
    </section> 
    
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
      
  components: {
    Header,
    Menu,
    Footer,          
  },

  data() {
    return {
      message: "",
      isUserLogged: "",
      isAdmin: localStorage.getItem("isAdmin"),
      comment: {
        content: "",
        username: localStorage.getItem("username") 
      }
    };
  },
  methods: {

    commentMessage(id) {
      console.log(this.comment.content)
      console.log(id)
      console.log(this.comment.username)
      if (this.comment.content == null) {
        window.alert("saisies invalides");
      } else {
        const newComment = {
       username : this.comment.username,
       content : this.comment.content
        }

        axios
          .post(
            "http://localhost:8080/api/auth/messages/comment/"+id,
            newComment,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("key"),
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            alert("commentaire envoyé !");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    like(id) {
      
      axios
        .post("http://localhost:8080/api/auth/messages/like/"+id,this.user, {
          headers: { Authorization: "Bearer " + localStorage.getItem("key") },
        })
        .then((response) => {
          location.reload();
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {

    const messageId = this.$route.params.id
     axios
        .get(`http://localhost:8080/api/auth/messages/${messageId}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("key") },
        })
        .then((response) => {
          this.message = response.data
          this.message.content = response.data.content
          this.message.title = response.data.title
          this.message.username = response.data.username
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
  })
}
}
</script>

<style lang="scss" scoped>

img {
  height: 300px;
  width: 300px
}