<template>
     <section>
        <h3> Chercher un message </h3>
        <input type="search" @keyup="find()" id="find" />
           
                    
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
  width: 50%;
}

</style>