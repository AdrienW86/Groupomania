<template>
    <main>
   <Header/>
   <Menu/>
   <SearchBar/>
  <ListUser/>

    <Footer/>
  
    </main>
  
</template>

<script>

import axios from 'axios';
import Header from "../components/Header";
import Menu from "../components/Menu";
import SearchBar from "../components/SearchBar.vue";
import ListUser from "../components/ListUser.vue";
import Footer from "../components/Footer";

export default {
  name: "Users",
  components: {
    Header,
    Menu,
    SearchBar,
    ListUser,
    Footer,
  },

  mounted() {
      
    axios
      .get("http://localhost:8080/api/auth/users/")
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
  },
}


</script>

