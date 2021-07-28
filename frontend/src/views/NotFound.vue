<template>
  <main>
    <Header />
    <section>
      <h1>Désolé la page demandée n'existe pas ou n'existe plus !</h1>

      <h2>ERREUR 404 !</h2>

      <h3>Il semblerait que vous vous soyez perdu...</h3>

      <p>N'ayez crainte, sans détours il n'y a point de voyage....</p>
      <p></p>

      <p>
        Vous pouvez toujours revenir sur vos pas et revenir à l'écran principale
        <br />
        grace aux boutons de connexion et d'inscription en haut à droite de
        votre écran.
      </p>
    </section>
    <Footer />
  </main>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  name: "Messages",
  components: {
    Header,
    Footer,
  },
};
</script>
<style lang="scss" scoped>
h1 {
  margin: 10%;
}
h2 {
  color: red;
  font-style: italic;
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 50px;
}
h3 {
  margin: 20px;
  color: blue;
  font-weight: bold;
}
p {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 30px;
}
</style>