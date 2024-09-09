<template>
  <!-- <div
    class="flex items-center justify-center px-8 py-2 h-fit rounded-full bg-blue400 bg-opacity-10 transition ease-in-out duration-300 hover:bg-blue400 hover:text-white cursor-pointer"
  > -->
  <span
    class="text-lg text-blue400 text-center font-bold px-8 py-2 h-fit rounded-full bg-blue400 bg-opacity-10 transition ease-in-out duration-300 hover:bg-blue400 hover:text-white cursor-pointer"
    >{{ tagText }}</span
  >
</template>

<script>
export default {
  props: {
    tagText: {
      type: String,
      default: "Films",
    },
  },
};
</script>
