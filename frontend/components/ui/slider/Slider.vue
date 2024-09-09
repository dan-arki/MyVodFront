<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
</script>

<template>
  <section class="carousel-container">
    <Carousel
      :items-to-show="1"
      :navigation-enabled="true"
      :pagination-enabled="true"
      :wrap-around="true"
      class="h-fit w-full"
    >
      <Slide
        v-for="trailer in selectedTrailers"
        :key="trailer.id"
        class="h-full"
      >
        <!-- <video class="w-full h-full object-cover" autoplay muted loop>
          <source :src="video.src" type="video/mp4" />
          Your browser does not support the video tag.
        </video> -->
        <img
          class="w-full h-full object-cover"
          :src="getYoutubeThumbnail(trailer.trailer_url)"
        >
          Your browser does not support the video tag.
        </img>
      </Slide>

      <!-- <template #addons>
        <Navigation />
        <Pagination />
      </template> -->
    </Carousel>
  </section>
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

    getYoutubeAutoplay(url) {
      const videoId = url.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1`;
    },

     getYoutubeThumbnail(url) {
      const videoId = url.split("v=")[1];
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    },

    selectRandomTrailers() {
      // Choix aléatoire de 3 trailers
      const shuffled = this.trailers.sort(() => 0.5 - Math.random());
      this.selectedTrailers = shuffled.slice(0, 3);
    },
  },
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  height: fit-content;
  padding: 0;
  position: relative;
}

.carousel-container .carousel {
  height: fit-content;
}

.carousel-container .carousel .slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
}

video {
  width: 100%;
  height: 100%;
  max-height: 100vh;
  object-fit: cover;
}

.carousel-container,.carousel,ol,li>img,.carousel__viewport{
  min-width: 100vw;
  height: 100vh;
}
</style>
