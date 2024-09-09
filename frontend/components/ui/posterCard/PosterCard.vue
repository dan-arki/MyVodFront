<template>
  <div class="flex flex-col">
    <div class="flex gap-6">
      <div
        v-for="poster in posters"
        :key="poster.id"
        class="w-36 h-48 rounded-lg flex flex-col items-start cursor-pointer hover:shadow-blue transition duration-300 ease-in-out"
        @click="getPosterById(poster.id, poster.title)"
      >
        <img
          :src="poster.photo_url"
          class="w-full h-full object-cover rounded-lg"
          :alt="poster.title"
        />
        <span class="font-semibold text-xs text-white mt-2">{{
          poster.title
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posters: [],
    };
  },
  mounted() {
    this.getNewPosters();
  },
  methods: {
    async getNewPosters() {
      try {
        const response = await fetch("http://localhost:3333/media", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        this.posters = data;
        // slice the first 6 posters
        this.posters = this.posters.slice(0, 4);
      } catch (error) {
        console.log(error);
      }
    },

    getPosterById(id, title) {
      this.$router.push(`/media/${id}/${title}`);
    },
  },
};
</script>
