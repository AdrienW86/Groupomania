<template>
  <main>
    <Header />
    <Menu />
    <div class="message-infos">
      <div class="card" style="width: 28rem">
        <div class="card-header">
          <img :src="user.avatar" class="card-img-top" alt="Card image cap" />
        </div>
        <div class="card-body">
          <h3 class="card-title">
            {{ user.username }}
          </h3>
          <div class="admin" v-if="user.isAdmin == true">Administrateur</div>
          <div class="membre" v-else-if="user.isAdmin == false">Membre</div>

          <p class="card-text">
            {{ user.bio }}
          </p>
        </div>
        <div class="card-footer">
          <br />
          Profil créé le: <br />
          <span class="created"> {{ user.createdAt }} </span> <br />
          <br />
          Profil mis à jour le: <br />
          <span class="updated"> {{ user.updatedAt }} </span><br />
        </div>
      </div>
    </div>
    <Footer />
  </main>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "OneUser",
  components: {
    Header,
    Menu,
    Footer,
  },

  data() {
    return {
      user: "",
    };
  },
  mounted() {
    const userId = this.$route.params.id;
    axios
      .get(`http://localhost:8080/api/auth/users/${userId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("key") },
      })
      .then((response) => {
        this.user = response.data;

        this.user.createdAt = this.user.createdAt.replace("T", " à ");
        this.user.updatedAt = this.user.updatedAt.replace("T", " à ");
        this.user.updatedAt = this.user.updatedAt.replace(".000Z", "");
        this.user.createdAt = this.user.createdAt.replace(".000Z", "");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
.message-infos {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 12% 10% 12% 10%

}

.card {
  margin-bottom: 10%;
}
.admin {
  color: red;
  font-weight: bold;
}
.membre {
  color: green;
  font-weight: bold;
}
.created,
.updated {
  font-weight: bold;
  font-style: italic;
}

.card-footer,
p {
  color: blue;
  font-weight: bold;
  padding-bottom: 10%;
}
p {
  margin-top: 30px;
}
.created {
  color: red;
}

.updated {
  color: green;
}
</style>