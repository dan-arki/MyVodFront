<template>
  <div class="flex gap-5 flex-wrap">
    <div
      v-for="trailer in selectedTrailers"
      :key="trailer.id"
      class="w-96 h-60 rounded-lg overflow-hidden hover:shadow-blue transition duration-300 ease-in-out"
    >
      <iframe
        allow="autoplay"
        class="w-full h-full object-cover"
        frameborder="0"
        :src="getYoutubeEmbededUrl(trailer.trailer_url)"
      >
        Your browser does not support the video tag.
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trailers: [],
      selectedTrailers: [],
    };
  },

  mounted() {
    this.getTrailers();
  },

  methods: {
    async getTrailers() {
      try {
        const response = await fetch("http://localhost:3333/media", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        this.trailers = data;
        this.selectRandomTrailers();
      } catch (error) {
        console.log(error);
      }
    },

    getYoutubeEmbededUrl(url) {
      const videoId = url.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    },

    getYoutubeAutoplay(url) {
      const videoId = url.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1`;
    },

    selectRandomTrailers() {
      // Choix aléatoire de 3 trailers
      const shuffled = this.trailers.sort(() => 0.5 - Math.random());
      this.selectedTrailers = shuffled.slice(0, 3);
    },
  },
};
</script>
