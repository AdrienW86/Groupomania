<template>
    <header>
        <nav class="navbar">
            <section class="logo">
                <router-link to="/"> 
                    <img alt="Vue logo" src="../assets/Groupomania_logo_white.png"> 
                </router-link>
            </section>
            <section v-if="isLogged ==  1" class="router">
                <div class="router_link"> 
                    <router-link to="/messages"> 
                        <span> Messages </span> 
                    </router-link> 
                </div>
                <div class="router_link"> 
                    <router-link to="/users"> 
                        <span> Membres </span> 
                    </router-link> 
                </div>
                <div class="router_link">
                    <router-link to="/profil"> 
                        <span> Mon Profil </span> 
                    </router-link> 
                </div>
            </section>
            <section class="auth">
                <div v-if="isLogged ==  0" class="connexion"> 
                    <router-link to="/login"> 
                        <button type="button" class="btn btn-success"> Connexion </button>
                    </router-link> 
                </div>
                <div v-if="isLogged == 0" class="inscription"> 
                    <router-link to="/sign"> 
                        <button type="button" class="btn btn-danger"> Inscription </button>
                    </router-link> 
                </div>
                <div v-if="isLogged == 1" class="deconnexion"> 
                    <button type= "button" class="btn btn-danger" @click="disconnect()"> Déconnexion </button>
                </div>
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
        username: localStorage.getItem('username'),
        userbio : localStorage.getItem('bio'),
        createdAt : localStorage.getItem('create'),
        userId : localStorage.getItem('user'),
    }    
},

mounted() {

    if(localStorage.islog) {
        this.isLogged = 1
        
    }else{
        this.isLogged = 0      
    }
    if(localStorage.admin == true) {
        this.isAdmin = true
    }else{
        this.isAdmin = false
    }   
},   
methods: {

    userLogged() {
      if(localStorage.getItem("user")) {
        this.isUserLogged = true;
        this.isAdmin = localStorage.getItem("isAdmin")     
      }
    },

    disconnect() {
        sessionStorage.clear()
        localStorage.clear()
        window.location.href = '/'
    }
  },
}
</script>

<style scoped lang="scss">

h2 {
    color: rgb(241, 34, 34);
    font-weight: bolder;     
}

header { 
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 100%;
    background-color: blue;

    img { 
        padding-top: 20px; 
        padding-bottom: 40px;
        width: 200px;  
        margin: auto;
    }

    nav {
        display: flex;
        width: 100%;     
        margin-top: 20px;        
    }
        a {
            font-weight: bold;
            color: #e2e8ee;
        }
        .router-link-exact-active {
            color: #fa0c0c;
        }        
}

p {
    color: red;
    font-weight: bold;
    font-size: 1.2em;
}
.logo {
    width: 20%;
}
.router {
    width: 60%;
    display: flex;
    justify-content: space-around;
}  
.auth {
    display: flex;
    position: relative;
    right: 2%; 
}
.connexion {
    margin-right: 20px;
}
</style>