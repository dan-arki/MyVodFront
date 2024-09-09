<template>
  <div
    class="flex items-center justify-center px-12 py-5 rounded-2xl bg-blue400 bg-opacity-10 transition ease-in-out duration-300 gap-7 w-fit">
    <img v-for="platform in platforms" :key="platform.id" :src="platform.logo_url" class="platform cursor-pointer"
      :alt="platform.title" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      platforms: [],
    };
  },
  mounted() {
    this.platform();
  },
  methods: {
    async platform() {
      try {
        let url = "http://localhost:3333/platform";
        // Check if userId exists in localStorage
        const userId = localStorage.getItem("userId");
        if (userId) {
          url += `?userId=${userId}`; // Append userId to the URL query string
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
  },
};
</script>

<style scoped>
.platform {
  width: 80px;
  height: 30px;
}
</style>
