<template>
  <div class="home">
   
    <Header/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
   Header
  }
}
</script>
 
 <style scoped lang="scss">

  nav {

    display:flex;

      .logo {
        width: 70%
      }
      .auth {
        width   : 30%;
        display : flex;
        justify-content: space-around;
       
        button {
         height: 40px;
         width : 100px;
         font-weight: bolder;

          .router-link {
            color: rgb(204, 190, 190);
            text-decoration: none;
         
          }
         
         

         
        }  
       
      }
  }
   

</style>
 