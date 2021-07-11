<template>
    <main>
   <Header/>
   <Menu/>
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="Groupomania3/frontend/src/assets/Groupomania_logo_red.png"  alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title"> title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>

    <Footer/>
  
    </main>
  
</template>

<script>
import axios from "axios";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
export default {
  name: "Users",
  components: {
    Header,
    Menu,
    Footer,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    search() {
      document
        .getElementById("recherche")
        .addEventListener("keyup", function () {
          let recherche = this.value.toLowerCase();
          let documents = document.querySelectorAll(".element");
          Array.prototype.forEach.call(documents, function (document) {
            // On a bien trouvé les termes de recherche.
            if (document.innerHTML.toLowerCase().indexOf(recherche) > -1) {
              document.style.display = "block";
            } else {
              document.style.display = "none";
            }
          });
        });
    },
 
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
};
</script>

<style scoped lang="scss">

h1 {
  color: rgb(116, 25, 25);
}
h2 {
  color: rgb(116, 18, 18);
}
li {
  display: flex; 
  list-style: none;
  color: rgb(131, 20, 20);
  border: 2px solid rgb(100, 14, 14);
  height: 150px;
  width: 100%;
  .identity {
    display: flex;
    flex-direction: column;
    height: 60px;
    width: 30%;
    font-weight: bold;
    text-align: left;  
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .creation {
    width: 60%
  }
  .pseudo {
    height: 30px;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .inscription {
    height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .about_user {
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .voir_membre {
   
    .see_user {
      background: rgb(78, 9, 9);
      color: blue;
      font-weight: bold;
      
      &:hover {
        transform: scale(1.1);
        color: red;
      }
    }
  }
  .delete_membre {
      
    .delete_user{
      background: rgb(59, 7, 7);
      color: blue;
      font-weight: bold;
      
      
      &:hover {
        transform: scale(1.1);
        color: red;
      }
    }
  }
}
input {
  margin-bottom: 30px;
}
span {
  position: relative;
  font-size: 0.9em;
  top: 10px;
  left: 5px;
}
</style>