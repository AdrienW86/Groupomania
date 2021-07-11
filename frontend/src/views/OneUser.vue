<template>
    <Header/>
    
</template>

<script>
import axios from "axios"
import Header from "../components/Header.vue"

export default {
   name: "OneUser" ,
   components: {
       Header
   },

   data() {
    return {
      users: [],
    };
   },
    mounted() {
    axios
      .get("http://localhost:8080/api/auth/users")
      .then((response) => {
        this.users = response.data;
        for (let i = 0; i < this.users.length; i++) {
          this.users[i].createdAt = this.users[i].createdAt.replace("T", " à ");
          this.users[i].createdAt = this.users[i].createdAt.replace(".000Z","");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}



</script>