<template>
  <UiHeader></UiHeader>
  <section class="min-h-screen flex flex-col justify-start gap-8">
    <!-- Slider -->
    <UiSlider></UiSlider>

    <!-- Barre de recherche -->
    <div class="searchBarContainer flex flex-col justify-center items-center self-center mt-4">
      <div class="flex relative w-full">
        <input type="text" class="searchBar" placeholder="Que cherchez-vous ?" v-model="searchQuery" />
        <img src="/iconSearch.svg" alt="searchIcon"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
      </div>
    </div>

    <!-- Filtres -->
    <div class="flex flex-col md:flex-row justify-between mx-4 md:mx-10">
      <div
        class="flex items-center justify-center px-12 py-5 rounded-2xl bg-blue400 bg-opacity-10 transition ease-in-out duration-300 gap-7 w-fit">
        <img v-for="platform in platforms" :key="platform.id" :src="platform.logo_url" class="platform cursor-pointer"
          :alt="platform.title" @click="filterByPlatform(platform.id)" />
      </div>
      <div class="flex gap-2 md:gap-4 mt-4 md:mt-0">
        <UiTag :tagText="'Films'" @click="filterByMediaType(1)"></UiTag>
        <UiTag :tagText="'Séries'" @click="filterByMediaType(2)"></UiTag>
      </div>
    </div>

    <!-- Listes nouveautés -->
    <article class="mx-4 md:mx-10">
      <h2 class="text-2xl md:text-4xl font-semibold text-white mb-4">Nouveautés</h2>
      <div class="flex flex-col">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="poster in filteredPosters" :key="poster.id"
            class="w-full h-auto rounded-lg flex flex-col items-start cursor-pointer hover:shadow-blue transition duration-300 ease-in-out"
            @click="getPosterById(poster.id, poster.title)">
            <img :src="poster.photo_url" class="w-full h-full object-cover rounded-lg" :alt="poster.title" />
            <span class="font-semibold text-xs text-white mt-2">
              {{ poster.title }}
            </span>
          </div>
        </div>
      </div>
    </article>

    <article class="mx-4 md:mx-10">
      <h2 class="text-2xl md:text-4xl font-semibold text-white mb-4">Les mieux notés</h2>
      <div class="flex flex-col">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="poster in filteredTopRated" :key="poster.id"
            class="w-full h-auto rounded-lg flex flex-col items-start cursor-pointer hover:shadow-blue transition duration-300 ease-in-out"
            @click="getPosterById(poster.id, poster.title)">
            <img :src="poster.photo_url" class="w-full h-full object-cover rounded-lg" :alt="poster.title" />
            <span class="font-semibold text-xs text-white mt-2">
              {{ poster.title }}
            </span>
          </div>
        </div>
      </div>
    </article>

    <!-- Liste trailers -->
    <article class="flex flex-col gap-8 mx-4 md:mx-10 mt-16">
      <h2 class="font-semibold text-3xl md:text-5xl self-center text-white">Trailers</h2>
      <UiTrailersList></UiTrailersList>
    </article>

    <!-- Liste Autres plateformes -->
    <article class="flex flex-col gap-8 mx-4 md:mx-10 mt-16">
      <h2 class="font-semibold text-3xl md:text-5xl self-center text-white">
        Découvrez d’autres plateformes
      </h2>
      <UiPlatformsList></UiPlatformsList>
    </article>
  </section>
</template>


<script>
export default {
  data() {
    return {
      posters: [],
      searchQuery: "",
      platforms: [],
      top_rated: [], // Ensure top_rated is initialized
      filteredPlatformId: null, // New data property
      filteredMediaType: null, // New data property for media type
    };
  },
  mounted() {
    this.getNewPosters();
    this.platform();
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
        this.posters = data;

        const sortedPosters = data.filter(media => media.Rating && media.Rating.length > 0)
          .sort((a, b) => b.Rating[0].score - a.Rating[0].score);

        this.top_rated = sortedPosters;
      } catch (error) {
        console.log(error);
      }
    },
    getPosterById(id, title) {
      this.$router.push(`/media/${id}/${title}`);
    },
    async platform() {
      try {
        let url = "http://localhost:3333/platform";
        const userId = localStorage.getItem("userId");
        if (userId) {
          url += `?userId=${userId}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to get platforms");
        }

        const data = await response.json();
        this.platforms = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    filterByPlatform(platformId) {
      this.filteredPlatformId = platformId;
    },
    filterByMediaType(mediaType) {
      this.filteredMediaType = mediaType;
    },
  },
  computed: {
    filteredPosters() {
      let filtered = this.posters;

      if (this.filteredPlatformId) {
        filtered = filtered.filter((poster) =>
          poster.platforms.some((p) => p.platform.id === this.filteredPlatformId)
        );
      }

      if (this.filteredMediaType !== null) {
        filtered = filtered.filter((poster) => poster.media_type === this.filteredMediaType);
      }

      if (this.searchQuery) {
        filtered = filtered.filter(
          (poster) =>
            poster.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            poster.director.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },
    filteredTopRated() {
      let filtered = this.top_rated;

      if (this.filteredPlatformId) {
        filtered = filtered.filter((poster) =>
          poster.platforms.some((p) => p.platform.id === this.filteredPlatformId)
        );
      }

      if (this.filteredMediaType !== null) {
        filtered = filtered.filter((poster) => poster.media_type === this.filteredMediaType);
      }

      if (this.searchQuery) {
        filtered = filtered.filter(
          (poster) =>
            poster.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            poster.director.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },
  },
};



</script>

<style>
.searchBarContainer {
  width: 40%;
}

.searchBar {
  background-color: rgba(255, 255, 255, 0.1);
  color: #8ca1ba;
  width: 100%;
  height: 100%;
  padding: 8px 16px;
  /* Ajoute du padding pour améliorer l'apparence */
  border: solid 1px #8ca1ba;
  border-radius: 16px;
  /* Ajoute des coins arrondis */
  font-size: 16px;
  outline: none;
  /* Supprime le contour par défaut */
}

.searchBar::placeholder {
  color: #8ca1ba;
  /* Couleur du placeholder */
}

.searchBar:hover {
  background-color: rgba(255, 255, 255, 0.2);
  /* Légère variation de couleur au survol */
}

.platform {
  width: 80px;
  height: 30px;
}

.searchBar:focus {
  background-color: rgba(255, 255, 255, 0.2);
  /* Variation de couleur lorsqu'elle est focus */
  color: #ffffff;
}
</style>
