<template>
  <div class="flex flex-col gap-4">
    <h3 class="font-bold text-2xl text-white">{{ titleText }}</h3>
    <UiPosterCard></UiPosterCard>
  </div>
</template>

<script>
export default {
  props: {
    titleText: {
      type: String,
      default: "Nouveautés",
    },
  },
};
</script>
