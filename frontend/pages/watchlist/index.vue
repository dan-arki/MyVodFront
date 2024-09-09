<template>
  <UiHeader class="mb-20"></UiHeader>
  <section class="min-h-screen flex flex-col gap-8 p-4 md:p-10 bg-gray-900 text-white mt-20">
    <div class="flex flex-col gap-4">
      <div v-for="watching in watchlist" :key="watching.id"
        class="w-full flex flex-col md:flex-row items-start bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <img :src="watching.media.photo_url" class="w-full md:w-1/4 h-auto object-cover rounded-lg"
          :alt="watching.media.title" />
        <div class="flex flex-col justify-between md:ml-4 w-full">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">{{ watching.media.title }}</h2>
            <p class="text-gray-400">{{ watching.media.description }}</p>
          </div>
          <div class="flex justify-between items-center mt-4">
            <span class="text-gray-400">{{ watching.media.duration }} min</span>
            <UiBtnPrimary :btnText="'Watch Again'" @click="watchAgain(watching.media.id)"></UiBtnPrimary>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      watchlist: []
    };
  },
  mounted() {
    this.getWatchlist();
  },
  methods: {
    async getWatchlist() {
      try {
        const response = await fetch("http://localhost:3333/watchlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        this.watchlist = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #1a202c;
  /* Dark background color */
}
</style>
