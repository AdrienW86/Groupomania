<template>
  <main>
    <Header />
    <Menu />
    <div class="bar"></div>
    <h1>Vos informations</h1>
    <p>
      Vous pouvez supprimer ou modifier vos <br />
      informations en cliquant sur les icônes
    </p>
    <section>
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">{{ users.username }}</h5>
          <div class="admin" v-if="users.isAdmin == true">Administrateur</div>
          <div class="membre" v-else-if="users.isAdmin == false">Membre</div>
        </div>
        <div class="card-body">
          <img :src="users.avatar" alt="Card image cap" />
          <p class="card-text">{{ users.bio }}</p>
        </div>
        <div class="card-footer">
          <span> Créé le: </span> <br />
          {{ users.createdAt }} <br />
          <span> Dernière modification: </span> <br />
          {{ users.updatedAt }} <br />

          <section class="btn-box">
            <button type="button" class="btn btn-success">
              <router-link to="/profil-modify"> Modifier </router-link>
            </button>
            <button type="button" class="btn btn-danger" @click="DeleteUser()">
              Effacer
            </button>
          </section>
        </div>
      </div>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import axios from "axios";

export default {
  name: "Profil",
  components: {
    Header,
    Menu,
    Footer,
  },
  data() {
    return {
      users: [],
      userSession: localStorage.getItem("admin"),
      username: localStorage.getItem("username"),
      avatar: "",
      bio: "",
      preview: "",
      createdAt: localStorage.getItem("create"),
      userId: localStorage.getItem("user"),
      token: localStorage.getItem("key"),
    };
  },

  methods: {
    DeleteUser() {
      window.confirm("Voulez-vous vraiment supprimer ce compte ?");
      axios
        .delete("http://localhost:8080/api/auth/profil", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("key"),
          },
        })
        .then((response) => {
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = "/";
          return response;
        })
        .catch((err) => {
          window.alert("impossible d'effacer le compte" + err);
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/auth/profil", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("key"),
        },
      })
      .then((response) => {
        this.users = response.data;
        this.users.createdAt = this.users.createdAt.replace("T", " à ");
        this.users.createdAt = this.users.createdAt.replace(".000Z", "");
        this.users.updatedAt = this.users.updatedAt.replace("T", " à ");
        this.users.updatedAt = this.users.updatedAt.replace(".000Z", "");
        return this.users;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: white;
}

h1 {
  color: #0275d8;
  font-weight: bold;
  font-style: italic;
  margin: 30px;
}

.bar {
  color: rgb(122, 31, 31);
  background-color: #0275d8;
  height: 100px;
}

h3 {
  color: blue;
  font-weight: bold;
  margin-top: 20px;
}

h5 {
  color: blue;
  font-weight: bold;
}
section {
  display: flex;
  justify-content: center;
}
img {
  width: 50%;
  height: 300px;
}
p {
  width: 80%;
  margin-top: 2%;
  margin-left: 10%;
  margin-right: 10%;
}
.card {
  margin-bottom: 50px;
  height: 650px;
  width: 80%;
}
span {
  color: blue;
  font-weight: bold;
}

.btn-box {
  display: flex;
  justify-content: space-evenly;
}
.admin {
  color: red;
  font-weight: bold;
}

.membre {
  color: green;
  font-weight: bold;
}
</style>