<template>
  <div>
    <h1> Nos membres </h1>
    <main>
      <li class="list" v-for="user in users" :key="user.id">
        <div class="card" style="width: 18rem;">
           <img :src="user.avatar"   alt="Photo de profil">
        <div class="card-body">
          <h5 class="card-title"> {{user.username}} </h5>
            <button v-if=" isAdmin = true"
                    class="btn btn-danger"
                    @click="deleteUser(user.id)"> effacer 

            </button>
   
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">{{ user.bio }}</li>
    <li class="list-group-item">{{ user.updatedAt }}</li>
    <li class="list-group-item">{{ user.createdAt }}</li>
  </ul>
  <div class="card-body">
    
    </div>
    </div>
    </li>
    </main>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListUser",

  data() {
    return {
      users: [],
      isAdmin: ""
    };
  },

  mounted() {
    axios
      .get("http://localhost:8080/api/auth/users/")

      .then((response) => {
        this.users = response.data;
       this.isAdmin = localStorage.getItem('isAdmin')
        for (let i = 0; i < this.users.length; i++) {
          this.users = response.data;
          this.users[i].createdAt = this.users[i].createdAt.replace("T", " à ");
          this.users[i].createdAt = this.users[i].createdAt.replace(".000Z","");
          this.users[i].updatedAt = this.users[i].updatedAt.replace("T", " à ");
          this.users[i].updatedAt = this.users[i].updatedAt.replace(".000Z","");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    
      deleteUser(id) {
        alert(id);
      window.confirm("Voulez-vous vraiment supprimer ce compte ?");
      axios
        .delete("http://localhost:8080/api/auth/users",id, 
        
        )
        .then((response) => {
          return response;
        })
        .catch((err) => {
          window.alert("impossible d'effacer le compte" + err);
        });
    },
  }
};
</script>

<style scoped lang="scss">

main {
  display: flex;
  justify-content: center;
}
li {
  list-style: none;
}

</style>