<template>
  <div class="gap-4 flex-col justify-center items-center flex">
    <img :src=actor.actor.picture_url  class="rounded-full w-16 h-16 border"> </img>
    <span class="text-sm text-white text-center w-full">{{
      actor.actor.name
    }}</span>
  </div>
</template>

<script>
export default {
  props: {
    actor: {
      type: Object,
    },
    
  },
};
</script>
