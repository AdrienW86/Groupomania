<template>
<div>
 <li class="list" v-for="user in users" :key="user.id">
    <div class="card" style="width: 18rem;">
  <img class="card-img-top"   alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title"> </h5>
    <p class="card-text"></p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul>
  <div class="card-body">
    
  </div>
</div>
 </li>
</div>
</template>

<script>

import axios from 'axios';
export default {
    name:"ListUser",

   data() {
    return {
      users: [],
    };
  }, 

    mounted() {
    axios
        .get("http://localhost:8080/api/auth/users")   
              
        .then(response => {
          for (let i = 0; i < this.users.length; i++) {
            this.users = response.data           
            this.users[i].createdAt = this.users[i].createdAt.replace("T", " à ");
            this.users[i].createdAt = this.users[i].createdAt.replace(".000Z","");
            this.users[i].updatedAt = this.users[i].updatedAt.replace("T", " à ");
            this.users[i].updatedAt = this.users[i].updatedAt.replace(".000Z","");
           
          }
             
        })
        .catch((err) => {
            console.log(err);
      })
},
  
};

</script>

<style scoped lang="scss">


</style>