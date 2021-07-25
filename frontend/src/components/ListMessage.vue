<template>
  <main class="message-infos">
    <button type="btn" class="btn btn-success">
      <router-link to="/new-message"> Envoyer un message </router-link>
    </button>
    <section>
      <li class="list" v-for="message in messages" :key="message.id">
        <div class="card">
          <div class="card-header">
            <section>
              <div v-if="message.UserId == 1" class="admin">
                <h5>{{ message.username }}</h5>
              </div>
              <div v-else class="membre">
                <h5>{{ message.username }}</h5>
              </div>
              <div
                class="btn-delete"
                v-if="user == 1 || user == message.UserId"
              >
                <button
                  class="btn btn-danger"
                  @click="deleteMessage(message.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                    />
                  </svg>
                </button>
              </div>
            </section>

            <div class="image_message">
              <img
                :src="message.picture"
                class="card-img-top"
                alt="photo_message"
              />
            </div>
          </div>
          <div class="text">
            <h6 class="card-title">{{message.title }}</h6>
            {{ message.content }}
          </div>

          <div class="card_body">
           <button class="btn btn-primary" @click="getOneMessage(message.id)">
              voir
            </button>  
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

  props: 
    {
      title: String
    },
  
    
      
      
    
  
 
  computed: {
    ...mapState(["users"]),
  },
  data() {
    return {
      messages: [],
      isUserLogged: "",
      isAdmin: localStorage.getItem("isAdmin"),
      user: localStorage.getItem("user"),
      comment: {
        content: "",

        
        
      },
      messageId: null
    };
  },

  methods: {
    listMessages() {
      axios
        .get("http://localhost:8080/api/auth/messages/")
        .then((response) => {
          this.messages = response.data;
          for (let i = 0; i < this.messages.length; i++) {
            this.messages[i].createdAt = this.messages[i].createdAt.replace(
              "T",
              " à "
            );
            this.messages[i].createdAt = this.messages[i].createdAt.replace(
              ".000Z",
              ""
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOneMessage(id) {
      
     const messageId = this.$route.params.id
      axios
        .get(`http://localhost:8080/api/auth/messages/${messageId}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("key") },
        })
        .then((response) => {

          this.messageId = response.id
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.href = '/#/messages/'+id;
    },
    deleteMessage(id) {
      let resultat = window.confirm("effacer le message ?");
      if (resultat == true) {
        alert("supression du message numéro" +id);
        axios
          .delete ("http://localhost:8080/api/auth/messages/"+id)

          .then((response) => {
            console.log(response);
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("message conservé");
      }
    },
    like(id) {
      console.log(id);
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
    axios
      .get("http://localhost:8080/api/auth/messages/")
      .then((response) => {
        this.messages = response.data;
        for (let i = 0; i < this.messages.length; i++) {
          this.messages[i].createdAt = this.messages[i].createdAt.replace(
            "T",
            " à "
          );
          this.messages[i].createdAt = this.messages[i].createdAt.replace(
            ".000Z",
            ""
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: #0275d8;
  font-weight: bold;
  font-style: italic;
  margin: 30px;
}
h5 {
  font-weight: bold;
  font-style: italic;
}
h6 {
  color: blue;
  font-weight: bold;
}
section {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
}
li {
  list-style: none;
  display: flex;
  margin: 20px;
  justify-content: center;
}
.card {
  margin-top: 30px;
  height: 600px;
  width: 250px;
  justify-content: center;
}
img {
  width: 240px;
  height: 300px;
}
.card-header {
  height: 300px;
}
.card-text {
  height: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text {
  height: 220px;
}
img {
  position: relative;
  width: 200px;
  height: 200px;
}
a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
.admin {
  color: red;
}
.membre {
  color: green;
}
.like {
  color: green;
  font-weight: bold;
  font-size: 1.5rem;
}
.dislike {
  color: red;
  font-weight: bold;
  font-size: 1.5rem;
}
.btn-delete {
  position: relative;
  left: 50px;
  bottom: 5px;
}
.box-btn {
  display: flex;
  justify-content: space-evenly;
}
.comment-input {
  border-radius: 20px;
}
form {
  display: flex;
  margin-left: 10px;
}
.btn-comment {
  position: relative;
  left: 5px;
  top: 10px;
}
::placeholder {
  text-align: center;
}
</style>