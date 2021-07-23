<template>
  <header>
    <nav class="navbar navbar-dark bg-primary">
      <section class="logo">
        <img alt="Vue logo" src="../assets/Groupomania_logo_white.png" />
      </section>
      <section v-if="isLogged == 0" class="auth">
        <button type="button" class="btn btn-success">
          <router-link to="/login"> Connexion </router-link>
        </button>
        <button type="button" class="btn btn-danger">
          <router-link to="/sign"> Inscription </router-link>
        </button>
      </section>
      <section v-if="isLogged == 1" class="deconnexion">
        <button type="button" class="btn btn-danger" @click="disconnect()">
          Déconnexion
        </button>
      </section>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isLogged: "",
      isAdmin: "",
      username: localStorage.getItem("username"),
      userbio: localStorage.getItem("bio"),
      createdAt: localStorage.getItem("create"),
      userId: localStorage.getItem("user"),
    };
  },
  mounted() {
    if (localStorage.islog) {
      this.isLogged = 1;
    } else {
      this.isLogged = 0;
    }
    if (localStorage.admin == true) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  },
  methods: {
    userLogged() {
      if (localStorage.getItem("user")) {
        this.isUserLogged = true;
        this.isAdmin = localStorage.getItem("isAdmin");
      }
    },
    disconnect() {
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = "/";
    },
  },
};
</script>

<style scoped lang="scss">
nav {
  height: 100px;
}

.logo {
  @media only screen and (max-width: 477px) {
    display: none;
  }
}

img {
  width: 200px;
  margin: 20px;
}

.auth,
.deconnexion {
  @media only screen and (max-width: 477px) {
    position: relative;
    left: 5%;
    width: 90%;
  }
}

button {
  margin-right: 10px;
}

a {
  font-weight: bold;
  color: #e2e8ee;
  text-decoration: none;
}

.router-link-exact-active {
  color: #281ebb;
}
</style>