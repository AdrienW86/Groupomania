<template>
    <section class="connexion">
        <Header/>

      <form id="login">

              <h1> Connectez-vous </h1>

        <label for="username"> Entrer votre pseudo </label>
          <input v-model="userInfos.username" name="username"  class="username" required>

        <label for="email"> Entrer votre adresse mail </label>
          <input v-model="userInfos.email" name="email"  class="email" required> 

        <label for="password"> Entrer votre mot de passe </label>
           <input v-model="userInfos.password" name="password"  class="password" required>

            <button type="button" class="submit" @click.stop.prevent="login()"> Valider </button>
      </form>
      <Footer/>
    </section>
    
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
export default {
  name: 'Login',
  components: {
    Header,
    Footer   
  },
  data() {
    return {
        userInfos : {
        email: "",
        username: "",
        password: "",
        isAdmin: "",
        bio: "",
        avatar:"",
        createdAt: "",
      },
    err: "",
    }
  },
methods: {
login() {
  const userData = {
    email : this.userInfos.email,
    username: this.userInfos.username,
    password : this.userInfos.password,
    isAdmin: this.userInfos.isAdmin,
    bio: this.userInfos.bio,
    avatar: this.userInfos.avatar,
    createdAt : this.userInfos.createdAt,
    isLog : this.userInfos.isLog,    
  };
  
  if( userData.email == true || userData.username == true || userData.password == true) {
      window.alert("Données invalides")
    }else{
      axios
        .post("http://localhost:8080/api/auth/login", userData)
        .then(response => {
          if (response.status === 200) {
            
            return response;
          }else{ 
            window.alert("Données invalides")
            throw(response.status);
          }
        }).then(response => {
            localStorage.setItem("key", response.data.token);
            localStorage.setItem("user", response.data.userId);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("bio", response.data.bio);
            localStorage.setItem("isAdmin", response.data.isAdmin);
            localStorage.setItem("createdAt",response.data.createdAt);
            localStorage.setItem("islog", response.data.isLog);
              window.location.href = "/#/profil"
              console.log(response.data)
        }).catch(err =>{
              console.log(err)
        });
      }   
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  color         :#30289e;
}

#login {
  display       : flex;
  flex-direction: column;
  margin        : auto;
  width         : 200px;
  
  input {
    margin-top        : 10px;
    margin-bottom     : 10px;
    height            : 20px;
    width             : 200px;
    color             : black;
  }
  button {
    margin-top        : 20px;
    margin-right      : 50px;
    margin-left       : 50px;
    margin-bottom     : 30px;
    width             : 100px;
    height            : 30px;
    border-radius     : 10px;
    background-color  :#2418cf;
    color             :whitesmoke;
    font-weight       : bold;
      &:hover {
            transform: scale(1.1);
            
    }
  }
}
  
</style>

