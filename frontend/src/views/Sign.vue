<template>
  <div class="sign">
    <Header />

    <h1>Créer un compte</h1>

    <form id="checkForm" aria-label="formulaire d'inscription">
      <label for="username"> Entrer votre pseudo </label>

      <input
        id="username"
        placeholder="Votre pseudo"
        v-model="username"
        name="username"
        type="text"
        class="username"
        required
      />

      <label for="email"> Entrer votre adresse mail </label>
      <input
        id="email"
        placeholder="Votre email"
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
        placeholder="(6 caractères minimum)"
        name="password"
        type="password"
        class="password"
        minlength="6"
        required
      />

      <button
        aria-label="bouton d'enregistement"
        id="sign_btn"
        type="submit"
        class="btn btn-primary"
        @click.stop.prevent="Sign()"
      >
        Envoyer</button
      >/>
    </form>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
export default {
  name: "Sign",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      email: null,
      username: null,
      password: "",
      bio: "",
      avatar: "",
    };
  },
  methods: {
    Sign() {
      const userData = {
        email: this.email,
        username: this.username,
        password: this.password,
        bio: this.bio,
        avatar: this.avatar,
      };

      if (
        userData.email == null ||
        userData.username == null ||
        userData.password == null
      ) {
        window.confirm("Vous devez remplir tous les champs");
      } else if (userData.password.length < 5) {
        window.alert("Votre mot de passe doit contenir 6 caractères minimum");
      } else {
        axios
          .post("http://localhost:8080/api/auth/sign", userData)
          .then((response) => {
            if (response) {
              alert("Votre profil a bien été enregistré");
              console.log(response.data.userId);
              window.location.href = "/#/login";
            } else {
              alert("données invalides");
            }
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  #sign_btn {
    color: white;
    width: 140px;
    height: 40px;
    position: relative;
    left: 30px;
    top: 40px;
  }
}
</style>
