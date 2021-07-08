<template>
    <main>
        <Header/>           
            <h1> Votre profil </h1> 
                <h2> Vos informations </h2>
                    <p> Vous pouvez supprimer ou modifier vos <br> 
                        informations en cliquant sur les icônes
                    </p>
                        <section class="profil_user">
                            <div class="header_card">
                                <div class="pseudo">              
                                    {{ username }}                               
                                </div>                                 
                            </div>
                            <div class="body_card">
                                <div class="main_card">
                                    <div class="picture">
                                                                      
                                    </div>
                                    <div class="box">
                                        <div class="box_likes">
                                            <div class="likes">
                                                {{ likes }}
                                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" fill="green" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                                </svg>     
                                            </div>
                                            <div class="dislikes">
                                                {{ dislikes }}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" fill="red" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                                        <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                                                    </svg>
                                            </div>
                                        </div>
                                        <div class="box_btn">
                                            <a class="btn-modify"  type="submit" @click="modify()"> Modifier
                                                <svg class="modify" xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="white"  viewBox="0 0 16 16">
                                                    <path d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                                </svg> 
                                            </a>  
                                            <a class="btn-delete" type="submit" @click="deleted()"> Supprimer
                                                <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="white"  viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg> 
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="bio">                
                                    {{ bio }}                                
                                </div>
                                
                            </div>
                            <div class="footer_card">
                                <div class="status"> Statut: 
                                    <span v-if=" userId == 1" class="admin">
                                        Administrateur
                                    </span>
                                    <span else v-else-if=" userId > 1" class="membre"> 
                                        Membre
                                    </span>
                                    
                                </div>
                                <div class="date_creation">
                                    Profil créé le : {{createdAt}}
                                </div>
                            </div>

                        </section>
        <Footer/>

    </main>
</template>

<script>

import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

export default {

    name: "Profil",
    components: {
        Header,
        Footer              
},

data() {
   
   return {  
    
    users: [],
    email: localStorage.getItem('email'),
    userSession: localStorage.getItem('admin'),
    username: localStorage.getItem('username'),
    isAdmin: localStorage.getItem('isAdmin'),
    createdAt : localStorage.getItem('createdAt'),
    picture: localStorage.getItem('picture'),
    userId : localStorage.getItem('user'),
    token :  localStorage.getItem ('key'), 
    bio: localStorage.getItem('bio'),
    likes: localStorage.getItem('likes'), 
    dislikes: localStorage.getItem('dislikes'),  
    }      
},
methods: {

    date () {
        
    let createdAt = this.createdAt; 
    createdAt = createdAt.replace("T", " à ");
    createdAt = createdAt.replace(".000Z","");
        return createdAt
    },

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
        .put("http://localhost:8080/api/auth/profil", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("key")
            }
        })
        
     
    
},
    
deleted() {
            
   let confirm = window.confirm("Voulez-vous vraiment supprimer ce compte ?")
    if(confirm) {    
        axios
            .delete("http://localhost:8080/api/auth/profil" , {
                headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("key")
            },
           
            })
            .then(response => {                
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = '/';
                    return response;
            }).catch(err => {
                window.alert("impossible d'effacer le compte" + err )
            });
        }else{
            window.reload()
        }
    }
},
mounted() {},
date(){
    
}
  
};

</script>

<style lang="scss" scoped>

h1 {
  color: rgb(255, 255, 255); 
}

h2 {
  color: white;
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
    flex-direction: column;
    border: 2px solid white;
    border-radius: 20px;
    height: 400px;
    width: 270px;
    margin: 40px auto 40px auto;
    color: white;
    box-shadow: 0px 0px 10px 4px rgba(31, 30, 30, 0.75);

    &:hover {
        transform: scale(1.1);
    }

    .header_card {
        border-radius: 17px 17px 0 0;
        display: flex;
        height: 60px;
        width: 100%;
        background: rgb(116, 116, 202);
        justify-content: center;

        .pseudo {
           padding-top: 20px;
           font-weight: bold; 
           font-style: italic;
        }
    }

    .body_card {
        height: 280px;
        display: flex;
        flex-direction: column;
        background-image: linear-gradient(rgba(116, 116, 202, 0.7), rgba(250, 164, 164, 0.5)),
        url("../assets/Groupomania_logo_red.png");
        
        .main_card {

            display: flex;
            border-bottom: 2px solid white;
            
            .picture {
            width: 100px;
            height: 120px;
            margin: 4px;
            background-image: url("../assets/user_default.png") ;
            }
        
            .box {
                width: 120px;
                padding-left: 25px;
                padding-top: 20px;

                .box_likes {
                    display: flex;
                    justify-content: space-around;
                
                    .likes, .dislikes {                    
                        display: flex;
                        font-size: 1.3em;
                        color :rgb(43, 43, 235);                   
                    }               
                }
                .box_btn {
                    display: flex;
                    flex-direction: column;
                    font-size: 0.8em;
                    padding-top: 20px;
                    padding-left: 16px;
                    color: blue;
                
                        .btn-delete, .btn-modify {
                            padding-bottom: 10px;
                            display: flex;

                            .modify {
                                padding-left: 20px;
                            }
                            .delete {
                                padding-left: 10px;
                            }

                                &:hover {
                                    transform: scale(1.1);
                                    color: rgb(223, 37, 37);
                                }
                        }   
                }
            }
        }
        .bio {
        padding-top: 20px;
        }  
    }
    
    .footer_card {
        border-radius: 0 0 17px 17px ;
        padding-top: 5px;
        display: flex;
        flex-direction: column;
        height: 60px;
        background: rgb(116, 116, 202);

        .membre {
            color: green;
        }
       .admin {
        color: red;
        }
        .date_creation {
            padding-top : 5px;
            font-size: 0.9em
        }
    }
}







</style>