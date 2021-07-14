<template>
    <main>
        <Header/>
            <Menu/>
                <SearchBar/>
                <NewMessage/>   
            <ListMessage/>
        <Footer/>
    </main>
</template>

<script>

import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import NewMessage from "../components/NewMessage.vue";
import SearchBar from "../components/SearchBar.vue";
import ListMessage from "../components/ListMessage.vue";

export default {
  name: "Messages",
    components: {
      Header,
      Menu,
      Footer,
      SearchBar,
      NewMessage,
      ListMessage,              
  },
}    
</script>

