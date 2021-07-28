<template>
  <section class="router">
    <div class="router_link">
      <router-link
        aria-label="link pour aller sur la page messages"
        to="/messages"
      >
        <h2>Messages</h2>
      </router-link>
    </div>
    <div class="router_link">
      <router-link aria-label="link pour aller sur la page users" to="/users">
        <h2>Membres</h2>
      </router-link>
    </div>
    <div class="router_link">
      <router-link aria-label="link pour aller sur la page profil" to="/profil">
        <h2>Mon Profil</h2>
      </router-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
h2 {
  @media only screen and (max-width: 340px) {
    font-size: 1em;
    font-weight: bold;
  }
}
.router {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
}

.router-link-exact-active {
  color: #0c8f22;
  font-weight: bold;
}

a {
  text-decoration: none;
}
</style>