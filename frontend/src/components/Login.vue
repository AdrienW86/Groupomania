<template>
    <section class="connexion">
        <Header/>

      <form id="login">

              <h1> Connectez-vous </h1>

        <label for="username"> Entrer votre pseudo </label>
          <input v-model="userInfos.username" placeholder="Votre pseudo" name="username"  class="username" required>

        <label for="email"> Entrer votre adresse mail </label>
          <input v-model="userInfos.email" placeholder="Votre e-mail" name="email"  class="email" required> 

        <label for="password"> Entrer votre mot de passe </label>
           <input v-model="userInfos.password" placeholder="Votre mot de passe" name="password"  class="password" required>

            <button id='login_btn' type="button" class="btn btn-success" @click.stop.prevent="login()"> Valider </button>
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
    createdAt : this.userInfos.createdAt,
    isLog : this.userInfos.isLog,
        
  };
  
   if( userData.email == "" || userData.username == "" || userData.password == "") {
      alert("Champs manquants")
    }
  /*if (!REGEX_EMAIL.test(userData.email)) {
      alert("email incorrect");
    }
    if (!REGEX_PASSWORD.test(userData.pseudo)) {
      alert("Pseudo incorrect (doit contenir entre 4 et 15 caractères, commencer par une lettre et ne contenir aucun symboles");
    }
  if (!REGEX_PASSWORD.test(userData.password)) {
      alert("Mot de passe incorrect (doit contenir entre 4 et 15 caractères, commencer par une lettre et ne contenir aucun symboles")       
    }  */else{
      axios
        .post("http://localhost:8080/api/auth/login", userData)
        .then(response => {
          if (response.status === 200) {
             response.data.createdAt = response.data.createdAt.replace("T", " à ");
             response.data.createdAt = response.data.createdAt.replace(".000Z","");

            
            return response;
          }else{ 
            alert("Données invalides")
           
          }
        }).then(response => {
       
            localStorage.setItem("key", response.data.token);
            localStorage.setItem("user", response.data.userId);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("bio", response.data.bio);
            localStorage.setItem("isAdmin", response.data.isAdmin);
            localStorage.setItem("createdAt",response.data.createdAt);
            localStorage.setItem("islog", response.data.isLog);
            localStorage.setItem("picture", response.data.picture);
            localStorage.setItem("likes", response.data.likes);
            localStorage.setItem('dislikes', response.data.dislikes);
            localStorage.setItem('email', response.data.email);

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
  color:#dcdbeb;
}

label {
  color: white
}

#login {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 200px;
  
  input {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 20px;
    width: 200px;
    color:black;
  }

 
}

</style>
