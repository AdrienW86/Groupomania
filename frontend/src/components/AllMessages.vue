<template>
  <body>
    <h2> Chercher un message </h2>
      <input type="search" @keyup="find()" id="find" />   
        <main class="message_content">
          <li class="list" v-for="message in messages" :key="message.id">          
            <section class="header">
              <div class="username"> 
                {{ message.username }} 
              </div>
              <div  class="status"> 
                <span v-if="message.isAdmin == true" class="admin">
                  Administrateur 
                </span>
                <span else v-else-if=" message.isAdmin == false" class="membre">
                  Membre
                </span>
              </div>
            </section>
            <section class="body">
              <div class="box_picture_and_btn">
                <div class="box_picture">
                 {{message.attachment}}
                </div> 
                <div class="box_btn_and_likes">
                  <div class="box_btn">            
                    <div class="voir_message">
                      <a class="see_message" @click="getOneMessage()" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>               
                      </a>
                    </div>
                    <div class="btn_delete">
                      <a v-if="currentUser == 1" class="delete_message" @click="deleteOnePost()" type="submit"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                      </a> 
                    </div>
                  </div>
                  <div class="box_likes">                    
                    <div class="btn_like"> {{ message.likes}}
                      <a class="like" type="submit"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                          <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.964.22.817.533 2.512.062 4.51a9.84 9.84 0 0 1 .443-.05c.713-.065 1.669-.072 2.516.21.518.173.994.68 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.162 3.162 0 0 1-.488.9c.054.153.076.313.076.465 0 .306-.089.626-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.826 4.826 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.616.849-.231 1.574-.786 2.132-1.41.56-.626.914-1.279 1.039-1.638.199-.575.356-1.54.428-2.59z"/>
                        </svg>
                      </a>
                    </div> 
                    <div class="btn_dislike"> {{ message.dislikes}}
                      <a class="dislike" type="submit"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                          <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
                        </svg>
                      </a>
                    </div>                                                                      
                  </div>
                </div>
              </div>
              <div class="title">
                {{ message.title }}
              </div>
              <div class="content">
                <div class="message">                 
                  {{ message.content }} 
                </div>
              </div>
            </section>
            <section class="footer">
              <div class="date">                
                Envoyé le: {{ message.createdAt }}                 
              </div>             
            </section>                                       
          </li> 
        </main>
  </body>
</template>

<script>
import axios from "axios";
export default {
    name: "AllMessages",

data() {
  return {
  
  messages: "",
  users: [],
  currentUser: localStorage.getItem('user'),
  

  isUserLogged: "",
  msgError: "",  
     
  }   
},   
methods: {
    find() {
      document
        .getElementById("find")
        .addEventListener("keyup", function () {
          let recherche = this.value.toLowerCase();
          let documents = document.querySelectorAll("li");
          Array.prototype.forEach.call(documents, function (document) {
            // On a bien trouvé les termes de recherche.
            if (document.innerHTML.toLowerCase().indexOf(recherche) > -1) {
              document.style.display = "flex";
            } else {
              document.style.display = "none";
            }
          });
        });
    },
},

    connection() {
   if(localStorage.getItem("isAdmin")) {
        
        this.isAdmin = localStorage.getItem("isAdmin")
        console.log(this.users.isAdmin)
      }
    
},
mounted () {
  
  axios
    .get("http://localhost:8080/api/auth/messages/")
    .then((response) => {
      this.messages = response.data;
      console.log(response.data[2].id)
        for (let i = 0; i < this.messages.length; i++) {         
          this.messages[i].createdAt = this.messages[i].createdAt.replace("T", " à ");
          this.messages[i].createdAt = this.messages[i].createdAt.replace(".000Z","");                                 
        } 
      })
      .catch((err) => {
        console.log(err);
      });
    
    axios
      .get("http://localhost:8080/api/auth/users/")
      .then((response) => {
        this.users = response.data;
        console.log(this.users)
        
      })
      .catch((err) => {
        console.log(err);
      });
  
    
    }
}   

</script>

<style lang="scss" scoped>

h2 {
  color: rgb(17, 17, 119)
}

#find {
  margin-bottom: 20px;
  width: 50%;
}

.message_content {
  display: flex;
  flex-flow: wrap;
  justify-content: center;

  li {  
    list-style: none;
    display: flex;
    flex-direction: column;
    color: rgb(253, 253, 253);
    border: 2px solid white;
    border-radius: 20px;
    height: 450px;
    width: 250px;
    margin: 30px;
    box-shadow: 0px 0px 10px 4px rgba(31, 30, 30, 0.75);
    background-image: linear-gradient(rgba(252, 195, 195, 0.1), rgba(68, 12, 12, 0.9)),
    url("../assets/Groupomania_logo_red.png");
    
    &:hover {
      transform: scale(1.1);
    }

    .header {
      display: flex;
      height: 30px;
      width: 250px;
      padding-top: 10px;
      border-radius: 20px 20px 0 0;
     background: rgb(102, 27, 27);
    
      .username, .status {
        width: 125px;
        font-weight: bold;
        

        .admin {
          color:red
        }
        .membre {
          color:rgb(255, 255, 255)
        }
      }      
    }

    .body {
      display: flex;
      flex-direction: column;

      .box_picture_and_btn {
        display: flex;
        border-bottom: 2px solid white;

        .box_picture {
          height: 180px;
          width: 140px;
          border-right: 2px solid white;       
        }

        .box_btn {
          display: flex;
        
          .see_message {
            position: relative;
            left: 70px;
            top: 20px;
            color: black;

            &:hover {              
              color: red;
            }
          }
          .delete_message {
            position: relative;
            left: 55px;
            top: 60px;
            color: black;

            &:hover {              
              color: red;
            }
          }
        }

        .box_likes {
          display: flex;
          position: relative;
          top: 130px;
          justify-content: space-around;

          .btn_like, .btn_dislike {
            margin-left: 16px
          }
        }
      }

      .title {
        height: 20px;
        background: rgb(102, 27, 27);
      }

      .content {
        height: 170px;
        
        .message {
          padding-top: 20px;
        }
      }
    }
    .footer {
      height: 30px;
      padding-top: 10px;
      border-radius: 0 0 20px 20px;
      background: rgb(102, 27, 27);
    }
  } 
}
  




</style>