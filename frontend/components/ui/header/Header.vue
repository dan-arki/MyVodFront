<template>
  <!-- header -->
  <header class="flex justify-between w-full items-center px-8 py-2 mt-4 z-10 fixed top-0">
    <NuxtLink to="/">
      <img class="w-28 h-28" src="/logoMyVod.svg" alt="logo" />
    </NuxtLink>
    <nav>
      <ul class="flex gap-6">
        <li class="flex flex-col items-center">
          <img src="/watchings.svg" alt="" />
          <NuxtLink to="/watchings"
            class="text-white text-lg hover:text-blue400 hover:font-semibold transition duration-300 ease-in-out">Déjà
            vu</NuxtLink>
        </li>
        <li class="flex flex-col items-center">
          <img src="/watchlist.svg" alt="" />
          <NuxtLink to="/watchlist"
            class="text-white text-lg hover:text-blue400 hover:font-semibold transition duration-300 ease-in-out">
            Watchlist</NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Conditionally render logout button if token exists -->
    <div v-if="isLoggedIn">
      <button @click="logout" class="text-white text-lg">Logout</button>
    </div>

    <!-- Render register button if not logged in -->
    <div v-else>
      <NuxtLink to="/register">
        <UiBtnPrimary :btnText="'Commencer'" size="large"></UiBtnPrimary>
      </NuxtLink>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      // Check if token exists in localStorage
      return localStorage.getItem("token") !== null;
    },
  },
  methods: {
    logout() {
      // Remove token, userId, and username from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      // Redirect to login or home page after logout
      this.$router.push("/login"); // Redirect to login page or another route
    },
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
