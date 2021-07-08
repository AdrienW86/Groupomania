<template>
    <section> 
      <Header/>
          <h1> Message posté par </h1>
            <div  class="message_box"> 
                <div class="message_header"> 
                    <div class="username">
                        nom de l'utilisateur
                    </div>
                    <div class="post_title"> 
                        titre du message
                    </div>
                </div>
                <div class="message_body"> 
                    <div class="post_picture"> 
                        photo de l'utilisateur
                    </div>
                    <div class="post_content"> 
                        contenu du message de l'utilisateur
                    </div>
                </div>
                <div class="message_footer"> 
                    <div class="post_date"> 
                        message crée le :
                    </div>
                    <div class="box_like"> 
                        <a class="like" type="submit">
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.964.22.817.533 2.512.062 4.51a9.84 9.84 0 0 1 .443-.05c.713-.065 1.669-.072 2.516.21.518.173.994.68 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.162 3.162 0 0 1-.488.9c.054.153.076.313.076.465 0 .306-.089.626-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.826 4.826 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.616.849-.231 1.574-.786 2.132-1.41.56-.626.914-1.279 1.039-1.638.199-.575.356-1.54.428-2.59z"/>
                            </svg> 36
                        </a>
                        <a class="dislike" type="submit"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                                <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
                            </svg> 
                        </a>
                    </div>
                </div>
            </div>
      <Footer/>
    </section>
</template>

<script>

import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
    name: 'MessageId',

    components: {
    Header,   
    Footer         
  },
    
}
</script>

<style lang="scss" scoped>

.message_box {
    width: 90%;
    margin: 5%;
    color: white;
    border: 2px solid white;

    .message_header {
        display: flex;
        height: 40px;
        width: 96%;
        margin: 2%;
        
        justify-content: space-around;       
    }
    .message_body {
        display: flex;
        height: 100px;
        width: 96%;
        margin: 2%;
        
        justify-content: space-between;

        .post_picture {
            height: 90%;
            width: 30%;
           
        }

        .post_content {
            height : 90%;
            width: 100%;            
        }
    }

    .message_footer {
        display: flex;
        height: 60px;
        width: 96%;
        margin: 2%;
        justify-content: space-between;
        

       .box_like {
           display: flex;
           margin: 2%;
           

           .like {
               height: 30px;
               width: 30px;               
               margin-right: 20px;

               &:hover {
                   svg {
                       fill: green
                   }
               }
           }
           .dislike {
               height: 30px;
               width: 30px;

               &:hover {
                   svg {
                       fill: rgb(255, 4, 4)
                   }
               }
               
           }
       }
    }
}

</style>