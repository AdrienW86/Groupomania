<template>
  <div class="home">
   
    <Header/>

    <section> 
      <h1> Bienvenue chez Groupania</h1>
        <h2> Inscrivez-vous ou connectez-vous  </h2>
          <p>afin de pouvoir rejoindre notre réseau social et pouvoir partager vos idées, vos photos et bien plus encore !</p>
     
    </section>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header.vue';
import Footer from "../components/Footer.vue";

export default {
  name: 'Home',
  components: {
   Header,
   Footer,
  }
}
</script>
 
 <style lang="scss" scoped>

 img {
   height: 280px; 
   width: 280px
 }

 </style>