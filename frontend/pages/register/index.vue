<template>
  <section class="min-h-screen flex justify-center items-center">
    <div class="w-full max-w-sm flex flex-col justify-center items-center gap-6">
      <NuxtLink to="/">
        <img src="/logoMyVod.svg" alt="" />
      </NuxtLink>
      <div class="bg-white p-8 w-full rounded-2xl shadow-xl">
        <p class="text-gray-900 text-center text-3xl font-bold mb-6">
          Inscription
        </p>
        <form @submit.prevent="register" class="w-full">
          <input class="w-full mb-5 p-3 border bg-white border-gray-300 rounded-2xl text-gray-700" v-model="username"
            type="text" placeholder="Pseudo" aria-label="pseudo" />
          <input class="w-full mb-5 p-3 border bg-white border-gray-300 rounded-2xl text-gray-700" v-model="email"
            type="email" placeholder="Email" aria-label="email" />
          <input class="w-full mb-5 p-3 border bg-white border-gray-300 rounded-2xl text-gray-700" v-model="password"
            type="password" placeholder="Password" aria-label="Password" />

          <!-- Liste plateformes -->
          <p class="text-center text-xl font-bold text-textBlack">
            Vos Plateformes
          </p>
          <div class="flex justify-center items-center gap-4">
            <div v-for="platform in platforms" :key="platform.id">
              <label class="flex items-center">
                <input type="checkbox" v-model="selectedPlatforms" :value="platform.id" class="mr-2" />
                <img class="platform cursor-pointer mt-4" :src="platform.logo_url" :alt="platform.title" />
              </label>
            </div>
          </div>

          <!-- Primary Button component -->
          <UiBtnPrimary :btnText="'Commencer'"></UiBtnPrimary>
        </form>
        <div class="flex gap-1 justify-center mt-5">
          <span class="font-bold text-xs text-textBlack">Déjà un compte ?</span>
          <NuxtLink to="/login" class="text-blue400 font-bold text-xs hover:underline">Se connecter</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      platforms: [],
      selectedPlatforms: [], // Array to store selected platform IDs
    };
  },
  mounted() {
    this.fetchPlatforms();
  },
  methods: {
    async register() {
      try {
        const response = await fetch("http://localhost:3333/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
            platforms: this.selectedPlatforms, // Include selected platforms
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to register");
        }

        this.$router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPlatforms() {
      try {
        const response = await fetch("http://localhost:3333/platform", {
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
  },
};
</script>

<style scoped>
.platform {
  width: 80px;
  height: 30px;
}
</style>
