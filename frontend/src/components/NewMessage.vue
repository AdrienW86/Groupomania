<template>
    <main class="container"> 
        <section class="row card bg-light m-5 p-3">
            <form enctype="multipart/form-data">               
                <div class="row">
                    <div class="col-12 justify-content-center form-group">
                        <label for="message_title">Titre de votre message</label>
                        <textarea v-on:keydown="isInvalid = false" class="form-control" v-model="message.title" id="title" name="title" rows="1" placeholder="Votre titre"></textarea>
                        <label for="message_content">Contenu de votre message</label>
                        <textarea v-on:keydown="isInvalid = false" class="form-control" v-model="message.content" id="message" name="message" rows="6" placeholder="Votre message"></textarea>
                    </div>
                    <div class="col-12 justify-content-center text-center">
                        <label for="picture">Votre image (facultatif)</label>
                        <img :src="preview" class="w-50 rounded">
                    </div>
                    <div class="col-12 justify-content-center">
                        <div class="form-group justify-content-center">
                            <label for="File">Votre photo</label>
                            <input @change="changeFile()" type="file" ref="file" name="image" class="form-control-file" id="image" accept="image/*">
                        </div>
                    </div>
                </div>
                <div class="footer col-10 mx-auto align-content-center">
                    <div><button type="submit" @click.prevent="onUpload()" class="btn btn-dark btn-block m-2 p-2">Valider</button></div>
                </div>
            </form>
        </section>
    </main>
</template>

<script>

import axios from "axios";



export default {
    name: "NewMessage",

    data() {
        return {
            message: {
            title: "",
            content:"",
            picture: "",
            UserId: "",  
            } ,
            messageAuthor: localStorage.getItem('username'),
            preview:""    
  }
},
    methods: {

     changeFile () {
     this.file = this.$refs.file.files[0];
     this.preview = URL.createObjectURL(this.file)
  },

  onUpload() {

      if (this.message.content == null || this.message.title == null) {
          window.alert('saisies invalides')
      }else{
            const formData = new FormData()              
                formData.append("image", this.file,);
                formData.append("username", localStorage.getItem('username'))
                formData.append("content", this.message.content.toString())
                formData.append("title", this.message.title.toString())         
                console.log(this.file)

                    axios.post("http://localhost:8080/api/auth/messages/new/",  formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("key")}})
                        .then((response)=> {
                   
                            console.log(response.data)
                            alert('publication réussie!')
                            window.location.href = "/#/profil"
                        })
                        .catch((error)=>{
                        console.log(error);
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    .btn btn-success {
        margin-bottom : 40px
    }

</style>