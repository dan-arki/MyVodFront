<template>
  <svg class="animate-spin w-12 h-12" viewBox="0 0 24 24">
    <defs>
      <linearGradient
        x1="28.1542969%"
        y1="63.7402344%"
        x2="74.6289062%"
        y2="17.7832031%"
        id="linearGradient-1"
      >
        <stop stop-color="rgba(164, 164, 164, 1)" offset="0%" />
        <stop
          stop-color="rgba(164, 164, 164, 0)"
          stop-opacity="0"
          offset="100%"
        />
      </linearGradient>
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none">
      <g transform="translate(-236.000000, -286.000000)">
        <g transform="translate(238.000000, 286.000000)">
          <circle
            id="Oval-2"
            :stroke="`url(#linearGradient-1)`"
            stroke-width="4"
            cx="10"
            cy="12"
            r="10"
          />
          <path
            d="M10,2 C4.4771525,2 0,6.4771525 0,12"
            id="Oval-2"
            stroke="rgba(164, 164, 164, 1)"
            stroke-width="4"
          />
          <rect
            id="Rectangle-1"
            fill="rgba(164, 164, 164, 1)"
            x="8"
            y="0"
            width="4"
            height="4"
            rx="8"
          />
        </g>
      </g>
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
