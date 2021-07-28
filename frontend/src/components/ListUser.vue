<template>
  <div>
    <h1>Nos membres</h1>
    <main>
      <li class="list" v-for="user in users" :key="user.id">
        <div class="card">
          <div class="header-card">
            <img :src="user.avatar" alt="Photo de profil" />
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ user.username }}</h5>
            <div class="admin" v-if="user.id === 1">Administrateur</div>
            <div class="membre" v-else-if="user.id > 1">Membre</div>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="bio">
                {{ user.bio }}
              </span>
            </li>
            <li class="list-group-item">
              Profil mis à jour le :
              <br />
              <span class="update">
                {{ user.updatedAt }}
              </span>
            </li>
            <li class="list-group-item">
              Profil créé le :
              <br />
              <span class="create">
                {{ user.createdAt }}
              </span>
            </li>
          </ul>
          <div class="card-footer">
            <button
              v-if="currentUser === '1'"
              class="btn btn-danger"
              @click="deleteUser(user.id)"
            >
              effacer
            </button>
            <button class="btn btn-primary" @click="getOneUser(user.id)">
              Voir
            </button>
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
      isAdmin: "",
      currentUser: localStorage.getItem("user"),
    };
  },

  mounted() {
    const log = localStorage.getItem("islog");
    if (log != 1) {
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = "/login";
    } else {
      axios
        .get("http://localhost:8080/api/auth/users/")

        .then((response) => {
          this.users = response.data;
          for (let i = 0; i < this.users.length; i++) {
            this.users = response.data;
            this.users[i].createdAt = this.users[i].createdAt.replace(
              "T",
              " à "
            );
            this.users[i].createdAt = this.users[i].createdAt.replace(
              ".000Z",
              ""
            );
            this.users[i].updatedAt = this.users[i].updatedAt.replace(
              "T",
              " à "
            );
            this.users[i].updatedAt = this.users[i].updatedAt.replace(
              ".000Z",
              ""
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    deleteUser(id) {
      let resultat = window.confirm("supprimer l'utilisateur ?");
      if (resultat == true) {
        alert("utilisateur supprimé");
        axios
          .delete("http://localhost:8080/api/auth/users/" + id)
          .then((response) => {
            location.reload();
            console.log(response);
          })
          .catch((err) => {
            window.alert("impossible d'effacer le compte" + err);
          });
      } else {
        alert("utilisateur conservé");
      }
    },

    getOneUser(id) {
      window.location.href = "/#/users/" + id;
    },
  },
};
</script>

<style scoped lang="scss">
main {
  display: flex;
  flex-flow: wrap;
}

li {
  list-style: none;
}
</style>

<style lang="scss" scoped>
h1 {
  color: #0275d8;
  font-weight: bold;
  font-style: italic;
  margin: 30px;
}
h5 {
  color: blue;
  font-weight: bold;
}
main {
  display: flex;
  justify-content: space-between;
}

.list {
  margin: 10px;
}
.card {
  width: 260px;
}

img {
  margin-top: 4px;
  width: 250px;
}

.bio {
  color: blue;
  font-weight: bold;
}

.update,
.membre {
  color: green;
  font-weight: bold;
}

.create,
.admin {
  color: red;
  font-weight: bold;
}
</style>