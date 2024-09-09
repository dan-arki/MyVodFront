<template>
  <button
    :class="buttonSizeClass"
    class="w-full bg-whiteButton text-blue400 p-3 rounded-2xl font-semibold transition duration-300 ease-in-out hover:shadow-blue"
    type="submit"
  >
    {{ btnText }}
  </button>
</template>

<script>
export default {
  props: {
    btnText: {
      type: String,
    },
    size: {
      type: String,
      default: "medium", // différentes tailles : 'small', 'medium', 'large'
    },
  },
  computed: {
    buttonSizeClass() {
      switch (this.size) {
        case "small":
          return "px-7 py-2.5";
        case "medium":
          return "px-8 py-3";
        case "large":
          return "px-9 py-4";
      }
    },
  },
};
</script>
