<template>
    <main>
        <Header/>
            
                <h1> Votre profil </h1> 
                    <h2> Vos informations </h2>
                        <p> Vous pouvez supprimer ou modifier vos <br> 
                            informations en cliquant sur les icônes
                         </p>
                        <section class="profil_user"> 
                            <div class="pseudo">              
                                {{ username }}                               
                            </div> 
                            <div class="bio">                
                                 {{ userbio }}                                
                            </div>
                            <div class="box_btn">
                                <a class="btn-modify"  type="submit" @click="modify()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                    </svg> 
                                </a>  
                                <a class="btn-delete" type="submit" @click="deleted()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg> 
                                </a>
                            </div>
                        </section>
       
        


        

        <Footer/>

    </main>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
//import Menu from "../components/Menu"
import axios from "axios";
export default {
    name: "Profil",
    components: {
        Header,
       // Menu,
        Footer              
},
data() {
    return {  
    
    users: [],
    userSession: localStorage.getItem('admin'),
    username: localStorage.getItem('username'),
    bio : "",
    createdAt : localStorage.getItem('create'),
    userId : localStorage.getItem('user'),
    token :  localStorage.getItem ('key') 
          
   
    }
},
methods: {
     
 
    connection() {
   if(localStorage.getItem("user")) {
        this.isUserLogged = true;
        this.isAdmin = localStorage.getItem("isAdmin")
        console.log(this.isAdmin)
      }
    if(localStorage.islog) {
        this.isLogged = 1      
    }else{
        this.isLogged = 0 
            
    }
},
   
modify() {
    axios
        .put
     
    
},
    
deleted() {
            
    window.confirm("Voulez-vous vraiment supprimer ce compte ?")       
        axios
            .delete("http://localhost:8080/api/auth/me" , {
                headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("key")
            }
            })
            .then(response => {                
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = '/';
                    return response;
            }).catch(err => {
                window.alert("impossible d'effacer le compte" + err )
            });
    }
},
mounted() {},
date(){}
  
};
</script>

<style lang="scss" scoped>
h1 {
  color: rgb(122, 31, 31); 
}
h2 {
  color: rgb(138, 23, 23);
  margin-bottom: 50px;
  margin-top: 50px;
}
p {
    font-weight: bold;
    font-size: 1.1em;
    color:rgb(6, 6, 75);
}
.profil_user {
    display: flex;
    border: 2px solid white;
    padding: 20px;
    color: white;
}
.pseudo {
    width: 15%;   
}
.bio {
    width: 65%;
}
.box_btn {
    display: flex;
.btn-delete, .btn-modify {
    margin-left: 10px;
    margin-right: 10px;
        &:hover {
            transform: scale(1.1);
            color: blue;
    }
}
    
}
</style>