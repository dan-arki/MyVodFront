<template>
  <div>
    <UiHeader class="mb-20"></UiHeader>

    <section class="min-h-screen flex flex-col justify-start gap-8 px-4 md:px-10 py-8 mt-20">
      <article class="flex flex-col gap-8">
        <div v-for="watching in watchings" :key="watching.id"
          class="flex flex-col md:flex-row items-start bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <img :src="watching.media.photo_url" class="w-full md:w-1/4 h-auto object-cover rounded-lg mb-4 md:mb-0"
            :alt="watching.media.title" />
          <div class="flex flex-col justify-between md:ml-4 w-full">
            <div>
              <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">{{ watching.media.title }}</h2>
              <p class="text-gray-400">{{ watching.media.description }}</p>
            </div>
            <div class="flex justify-between items-center mt-4">
              <span class="text-gray-400">{{ watching.media.duration }} min</span>
              <UiBtnPrimary :btnText="'Watch Again'" @click="watchAgain(watching.media.id)"></UiBtnPrimary>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      watchings: [],
      searchQuery: "",
    };
  },
  mounted() {
    this.getWatchings();
  },
  methods: {
    async getWatchings() {
      try {
        const response = await fetch("http://localhost:3333/watching", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        this.watchings = data;
      } catch (error) {
        console.log(error);
      }
    },
    watchAgain(id) {
      // Implement the watch again functionality here
      console.log(`Watch again: ${id}`);
    },
  },
};
</script>

<style scoped>
/* Additional margin-top and responsiveness adjustments */
section {
  margin-top: 40px; /* Increase margin-top as needed */
}

@media (max-width: 768px) {
  .flex-col.md:flex-row {
    flex-direction: column; /* Ensure items stack vertically on smaller screens */
  }
  
}
</style>
