<template>
    <main>
        <Header/>
            <Menu/>
                <SearchBar/>
            <ListMessage/>
        <Footer/>
    </main>
</template>

<script>
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import SearchBar from "../components/SearchBar.vue";
import ListMessage from "../components/ListMessage.vue";


export default {
    name: "Messages",
    components: {
        Header,
        Menu,
        Footer,
        SearchBar,
        ListMessage,              
},

mounted () {
     
  axios
    .get("http://localhost:8080/api/auth/messages")
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

