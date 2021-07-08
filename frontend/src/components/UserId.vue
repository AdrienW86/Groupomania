<template>
    <section> 
        <Header/>
          
            <h1> Vous regardez le profil de : {{user.username}}</h1>
                <div class="user_card"> 
                    <div class="user_profil"> 
                        <div class="user_picture"> 
                           {{user.picture}}
                        </div>
                        <div class="user_infos">
                            <div class="username"> 
                                {{user.username}}
                            </div>
                            <div class="user_bio"> 
                                {{user.bio}}
                            </div>
                        </div>
                    </div>
                    <div class="user_date"> 
                        {{user.createdAt}}
                    </div>
                </div>
          <Footer/>
    </section>   
</template>

<script>

import axios from "axios"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
    name: 'UserId',
    components: {
        Header,
        Footer
    },
 data() {
    return {
      user: [],
      
    };
  },


mounted() {
    axios
      .get("http://localhost:8080/api/auth/users/2")
      .then((response) => {
        console.log(response.data)
        this.user = response.data;
         this.user.createdAt = this.user.createdAt.replace("T", " à ");
          this.user.createdAt = this.user.createdAt.replace(".000Z","");
      })
      .catch((err) => {
        console.log(err);
      })
  }
}


</script>



<style lang="scss" scoped>

.user_card {
   height: 400px;
   width: 96%;
   margin: 2%;
   border: 2px solid white; 

   .user_profil {
       display: flex;
       height: 160px;
       width: 100%;

       .user_picture {
           height: 140px;
           width: 30%;
       }

       .user_infos {
           height: 160px;
           display: flex;
           flex-direction: column;
           width: 70%;

           .username {
               height: 20px;               
               margin-bottom: 20px;
               font-weight: bold;
               font-style: italic;
               font-size: 1.2em;
               color: whitesmoke;
               border: 2px solid white;             
           }

           .user_bio {
               height: 120px;
               font-weight: bold;
               color: blue;
           }
       }
   }

   .user_date {
       width: 100%;
       height: 40px;
       font-weight: bold;
       color: whitesmoke;
       border: 2px solid white;
   }
}

</style>