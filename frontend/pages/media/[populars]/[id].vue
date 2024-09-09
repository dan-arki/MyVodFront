<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from 'vue';

const media = ref(null);
const urlId = useRoute().params.populars;
const rating = ref(0);

const getPosterById = async () => {
  const id = useRoute().params.populars;
  try {
    const response = await fetch(`http://localhost:3333/media/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    media.value = data;
    rating.value = data.Rating?.[0]?.score || 0;
  } catch (error) {
    console.log(error);
  }
};

const getYoutubeEmbededUrl = (url) => {
  const videoId = url.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
};

const addToWatchlist = async () => {
  try {
    const response = await fetch("http://localhost:3333/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ mediaId: Number(urlId) }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      alert(data.message);
    } else {
      console.error(data.message);
      alert(data.message);
    }
  } catch (error) {
    console.error("Error adding to Watchlist:", error);
    alert("Error adding media to Watchlist!");
  }
};

const markAsSeen = async () => {
  try {
    const response = await fetch("http://localhost:3333/watching", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ mediaId: Number(urlId) }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      alert(data.message);
    } else {
      console.error(data.message);
      alert(data.message);
    }
  } catch (error) {
    console.error("Error marking as seen:", error);
    alert("Error marking media as seen!");
  }
};

const submitRating = async () => {
  try {
    const response = await fetch("http://localhost:3333/rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ mediaId: Number(urlId), score: Number(rating.value) }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error submitting rating:", error);
    alert("Error submitting rating!");
  }
};

onMounted(() => {
  getPosterById();
});

const ratingStars = computed(() => {
  return {
    fullStars: Array(Math.floor(rating.value)).fill('★'),
    emptyStars: Array(5 - Math.floor(rating.value)).fill('☆'),
  };
});
</script>



<template>
  <UiHeader></UiHeader>
  <section v-if="media" class="flex h-full mt-32 justify-evenly mx-4 md:mx-12">
    <div class="gap-6 flex flex-col lg:flex-row w-full">
      <div class="gap-5 flex-col items-start flex-1 min-w-0 flex">
        <UiTag></UiTag>
        <div class="gap-2.5 flex flex-col md:flex-row items-start p-2.5">
          <div class="gap-2.5 flex flex-col items-start p-2.5">
            <div class="w-full md:w-[280px] h-auto md:h-[441px] relative rounded-xl">
              <img :src="media.photo_url" alt="" class="w-full h-full object-cover rounded-xl" />
            </div>

            <div class="flex flex-col gap-1">
              <h3 class="text-white font-semibold">Category(ies) :</h3>
              <span v-for="categorie in media.categories" :key="categorie.id"
                class="text-neutral text-left w-full h-auto md:h-[21px]">
                {{ categorie.categorie.title }}
              </span>

              <div class="flex flex-col">
                <h3 class="text-white font-semibold">Duration :</h3>
                <span class="text-neutral text-left w-full h-auto md:h-[21px]">
                  {{ media.duration }} min
                </span>
              </div>
            </div>
          </div>
          <div class="gap-8 flex flex-col items-start p-2.5">
            <div class="gap-2.5 flex flex-col md:flex-row justify-between items-center w-full">
              <h2 class="text-3xl md:text-5xl font-bold text-[#eaeff5] text-left">
                {{ media.title }}
              </h2>

              <!-- Rating stars -->
              <div class="gap-1.5 flex flex-row w-40 justify-end items-start">
                <span v-for="star in ratingStars.fullStars" :key="star" class="text-yellow-500 star">{{ star }}</span>
                <span v-for="star in ratingStars.emptyStars" :key="star" class="text-gray-500 star">{{ star }}</span>
              </div>
              <!-- Rating stars -->
            </div>
            <div class="gap-4 flex flex-col md:flex-row items-center w-full">
              <UiBtnPrimary :btnText="'Watchlist'" size="medium" @click="addToWatchlist"></UiBtnPrimary>
              <UiBtnSecondary :btnText="'Already seen'" size="medium" @click="markAsSeen"></UiBtnSecondary>
            </div>
            <div class="gap-2.5 flex flex-col items-start w-full py-6">
              <div class="gap-2 flex flex-col items-start">
                <span class="text-lg font-semibold text-[#eaeff5] text-left w-full">Description</span>
                <span class="text-[#78889b] text-left w-full md:w-[432px]">{{ media.description }}</span>
              </div>
              <div class="gap-2 flex flex-col items-start w-full">
                <span class="text-lg font-semibold text-[#eaeff5] text-left w-full">Director</span>
                <span class="text-[#78889b] text-left w-full">{{ media.director }}</span>
              </div>
            </div>
            <div class="gap-2 flex flex-wrap items-start">
              <img v-for="(platform, index) in media.platforms" :key="index" :src="platform.platform.logo_url"
                class="platform w-12 h-12 object-cover rounded-lg" />
            </div>
            <!-- Rating form -->
            <div class="gap-2 flex flex-col items-start w-full py-6">
              <label for="rating" class="text-lg font-semibold text-[#eaeff5]">Rate this media</label>
              <select v-model="rating" id="rating" class="p-2.5 bg-neutral text-white rounded-lg">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <UiBtnPrimary :btnText="'Submit Rating'" size="medium" @click="submitRating"></UiBtnPrimary>
            </div>
            <!-- Rating form -->
          </div>
        </div>
      </div>
      <div class="gap-2 flex flex-col items-center p-2.5">
        <div class="gap-2.5 flex flex-col items-start">
          <div class="gap-2.5 flex flex-col items-start">
            <span class="text-lg font-semibold text-[#eaeff5] text-left w-full">Actors</span>
          </div>
          <div v-for="actor in media.actor" :key="actor.id"
            class="gap-6 flex flex-row flex-wrap items-start py-2.5 w-full">
            <UiActorCol :actor="actor"></UiActorCol>
          </div>
        </div>
        <div class="gap-2.5 flex flex-col items-start py-2.5 w-full">
          <div class="gap-2.5 flex flex-col items-start w-full">
            <span class="text-lg font-semibold text-[#eaeff5] text-left w-full">Trailer</span>
            <iframe class="w-full h-64 md:h-96 object-cover rounded-lg"
              :src="getYoutubeEmbededUrl(media.trailer_url)"></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else>
    <div class="flex justify-center items-center h-screen">
      <UiLoader></UiLoader>
    </div>
  </section>
</template>

<style scoped>
.platform {
  width: 80px;
  height: 30px;
  object-fit: contain;
}

.star {
  color: #FFD700;
  /* Gold color for stars */
}
</style>
