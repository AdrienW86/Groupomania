<template>
  <footer>
    <nav class="navbar navbar-dark bg-primary">
      <section class="infos">
        <h4>Partenaires</h4>
        <ul class="liens">
          <li>
            <a
              aria-roledescription="lien vers le site Openclassrooms"
              href="https://openclassrooms.com/fr"
            >
              OpenClassrooms
            </a>
          </li>
          <li>
            <a
              aria-roledescription="lien vers le site Developer Mozilla"
              href="https://developer.mozilla.org/fr/"
            >
              Developer Mozilla
            </a>
          </li>
          <li>
            <a
              aria
              aria-roledescription="lien vers le site de Vue.js"
              href="https://vuejs.org/"
            >
              Vue.Js
            </a>
          </li>
        </ul>
      </section>
      <section class="infos">
        <h4>Contacts</h4>
        <ul class="liens">
          <li>
            <a aria-roledescription="" href="mailto: adrien_Weiss@outlook.fr">
              Messagerie</a
            >
          </li>
          <li>+33 1 80 88 80 30</li>
          <li><a href="https://openclassrooms.com/forum/"> FAQ </a></li>
        </ul>
      </section>
    </nav>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped lang="scss">
nav {
  height: 200px;
  justify-content: space-evenly;
}

.infos {
  width: 50%;
  display: flex;
  text-align: center;
  flex-direction: column;
}

h4 {
  font-weight: bold;
  font-size: 1.2em;
  color: rgb(94, 7, 7);
}

li {
  margin-bottom: 10px;
  list-style: none;
  color: white;
}

a {
  color: white;
  text-decoration: none;
}

ul {
  padding: 0;
}
</style>