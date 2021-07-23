<template>
  <main>
    <Header />
    <Menu />
    <section class="row card bg-light m-5 p-3">
      <form enctype="multipart/form-data">
        <div class="row">
          <div class="col-12 justify-content-center form-group">
            <label for="bio_content">Contenu de votre présentation</label>
            <textarea
              v-on:keydown="isInvalid = false"
              class="form-control"
              v-model="user.bio"
              id="bio"
              name="bio"
              rows="6"
              placeholder="Votre bio"
            ></textarea>
          </div>
          <div class="col-12 justify-content-center text-center">
            <label for="avatar">Votre image (facultatif)</label>
            <img :src="preview" class="w-50 rounded" />
          </div>
          <div class="col-12 justify-content-center">
            <div class="form-group justify-content-center">
              <label for="File">Votre photo</label>
              <input
                @change="changeFile()"
                type="file"
                ref="file"
                name="image"
                class="form-control-file"
                id="image"
                accept="image/*"
              />
            </div>
          </div>
        </div>
        <div class="footer col-10 mx-auto align-content-center">
          <div>
            <button
              type="submit"
              @click.prevent="Modify()"
              class="btn btn-dark btn-block m-2 p-2"
            >
              Valider
            </button>
          </div>
        </div>
      </form>
    </section>

    <Footer />
  </main>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "ProfilModify",

  components: {
    Header,
    Menu,
    Footer,
  },

  data() {
    return {
      user: {
        bio: "",
        avatar: "",
        UserId: "",
      },
      preview: "",
    };
  },

  methods: {
    changeFile() {
      this.file = this.$refs.file.files[0];
      this.preview = URL.createObjectURL(this.file);
    },

    Modify() {
      if (this.user.bio == null || this.user.avatar == null) {
        window.alert("Champs vides");
      } else {
        const userData = new FormData();
        userData.append("bio", this.user.bio);
        userData.append("image", this.file);

        console.log(this.file);

        axios
          .put("http://localhost:8080/api/auth/profil", userData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("key"),
            },
          })
          .then((response) => {
            console.log(response.data);
            alert("profil modifié !");
            window.location.href = "/#/profil";
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: white;
}
</style>