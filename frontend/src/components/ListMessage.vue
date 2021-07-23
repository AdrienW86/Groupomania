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
            <h6 class="card-title">{{ message.title }}</h6>
            {{ message.content }}
          </div>

          <div class="card_body">
            <button class="btn btn-primary" @click="getOneMessage(message.id)">
              voir
            </button>

            <form enctype="mmultipart/form-data">
              <textarea
                v-model="comment.content"
                type="textarea"
                rows="2"
                name="comment"
                placeholder="Votre commentaire, agrandissez la fenêtre"
                class="comment-input"
              >
              </textarea>
              <div class="btn-comment">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click="commentMessage(message.id)"
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
              <span id="dislike" class="dislike"> {{ message.dislikes }} </span>
              <button
                type="button"
                class="btn btn-danger"
                @click="dislike(message.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  class="bi bi-hand-thumbs-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"
                  />
                </svg>
              </button>
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
  props: [],

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
        // message: ""
      },
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
      alert(id);
      axios
        .get("http://localhost:8080/api/auth/messages/" + id, {
          headers: { Authorization: "Bearer " + localStorage.getItem("key") },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.href = "/#/messages/" + id;
    },
    deleteMessage(id) {
      let resultat = window.confirm("effacer le message ?");
      if (resultat == true) {
        alert("message effacé");
        axios
          .delete("http://localhost:8080/api/auth/messages/+" + id)

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
        .post("http://localhost:8080/api/auth/messages/like/" + id, {
          headers: { Authorization: "Bearer " + localStorage.getItem("key") },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dislike(id) {
      axios
        .post("http://localhost:8080/api/auth/messages/dislike/" + id, {
          headers: { Authorization: "Bearer " + localStorage.getItem("key") },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    commentMessage(id) {
      if (this.comment.content == null) {
        window.alert("saisies invalides");
      } else {
        const newComment = new FormData();
        newComment.append("username", localStorage.getItem("username"));
        newComment.append("content", this.comment.content.toString());
        axios
          .post(
            "http://localhost:8080/api/auth/messages/comment/" + id,
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