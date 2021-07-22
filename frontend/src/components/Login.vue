<template>
  <section class="connexion">
    <Header />

    <h1>Connectez-vous</h1>

    <form id="checkForm">
      <label for="username"> Entrer votre pseudo </label>

      <input
        id="username"
        v-model="username"
        name="username"
        type="text"
        class="username"
        required
      />

      <label for="email"> Entrer votre adresse mail </label>
      <input
        id="email"
        v-model="email"
        name="email"
        type="email"
        class="email"
        required
      />

      <label for="password"> Entrer votre mot de passe </label>
      <input
        v-model="password"
        id="password"
        name="password"
        type="password"
        class="password"
        minlength="5"
        required
      />

      <button id="login" type="submit" class="btn btn-primary" @click.stop.prevent="Login" > envoyer </button> 
    </form>
    <Footer />
  </section>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
export default {
  name: "Login",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
      isAdmin: "",
      bio: "",
      avatar: "",
      createdAt: "",
      isLog : "",
    };
  },

  

  methods: {
  async Login  () {
      const userData = {
        email: this.email,
        username: this.username,
        password: this.password,
      //  isAdmin: this.isAdmin,
      //  bio: this.bio,
      //  avatar: this.avatar,
     //   createdAt: this.createdAt,
     //   isLog: this.isLog,
      };
      if (
        userData.email == false ||
        userData.username == false ||
        userData.password == false
      ) {
        alert("Données invalides");
       } else {
       
       await axios
        .post("http://localhost:8080/api/auth/login",userData)
          .then((response) => {
            if (response.status === 200) {
              
              return response;
            } else {
              window.alert("Données invalides");
              throw response.status;
            }
          })
          .then((response) => {
            localStorage.setItem("key", response.data.token);
            localStorage.setItem("user", response.data.userId);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("bio", response.data.bio);
            localStorage.setItem("isAdmin", response.data.isAdmin);
            localStorage.setItem("createdAt", response.data.createdAt);
            localStorage.setItem("islog", response.data.isLog);
           
            console.log(response.data);
          })
          .catch((err) => {
            alert("compte inexistant")
            console.log(err);
          });
      }this.$router.push('/profil')
    }
  },
}
</script>

<style scoped lang="scss">
h1 {
  color: #30289e;
  margin-top: 60px;
}
#checkForm {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 200px;
  margin-top: 60px;
  margin-bottom: 250px;
  justify-content: center;
  input {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 20px;
    width: 200px;
    color: black;
  }
  #login {
    color: white;
    width: 140px;
    height: 40px;
    position: relative;
    left: 30px;
    top: 40px;
  }
}
</style>
