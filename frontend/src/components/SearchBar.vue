<template>
     <section>
        <input type="search" class="search" placeholder="Votre recherche" @keyup="find()" id="find" />                 
    </section>
</template>

<script>
export default {
    name:"SearchBar",

     methods: {
    find() {
      document
        .getElementById("find")
        .addEventListener("keyup", function () {
          let recherche = this.value.toLowerCase();
          let documents = document.querySelectorAll(".list");
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
}
</script>

<style lang="scss" scoped>

h3 {
  color: rgb(17, 17, 119)
}

#find {
  margin-bottom: 20px;
  width: 200px;
}

section {
  background-color: #0275d8;
  height: 100px;
  align-content: center; 
}
.search {
  margin-top: 35px
}
 ::placeholder {
text-align: center;
}
</style>