<template>

  <div class="sign">
     <Header/>

     <h2> Créer un compte </h2>

      <form id="signup">

        <label for="username"> Entrer votre pseudo </label>
          <input v-model="userInfos.username" placeholder="Votre pseudo" name="username"  class="username" required>

        <label for="email"> Entrer votre adresse email </label>
          <input v-model="userInfos.email" placeholder="Votre adresse e-mail" name="email"  class="email" required> 

        <label for="password"> Entrer votre mot de passe </label>
           <input v-model="userInfos.password" placeholder="Votre mot de passe" name="password" class="password" required>

            <button id='sign_btn' type="submit" @click.stop.prevent="sign()"> Valider </button>
      </form>
      <Footer/>
    </div> 
       
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';

export default {
  name: 'Sign',

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
        bio:"",
      }
    }
  },

  methods: {

    sign () {
      const userData = {
      email : this.userInfos.email,
      username: this.userInfos.username,
      password : this.userInfos.password,
      bio : this.userInfos.bio
      };

      if( userData.email == "" || userData.username == "" || userData.password == "") {
      alert("Champs manquants")
    
      }else{
        window.location.href ="/#/login"
        axios
          .post("http://localhost:8080/api/auth/signup", userData)
          .then((response) => {
            if(response) {
             alert('Votre compte a été créé avec succès')
              console.log(response.data.userId)
              
            }else{
            alert("données invalides")
          }
        }).catch((err) => console.log(err));
      } 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

h2 {
  color:#dcdbeb;
}

label {
  color: white
}

#signup {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 200px;
  
  
  input {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 20px;
    width: 200px;
    color: black;
  }

  button {
    margin-top: 20px;
    margin-right: 50px;
    margin-left:50px;
    margin-bottom: 50px;
    width: 100px;
    height: 30px;
    border-radius: 10px;
    color:#f1f0f5;
    background-color: #30289e;
    font-weight: bold;

      &:hover {
       transform: scale(1.1);
      }
  }
}

</style>
