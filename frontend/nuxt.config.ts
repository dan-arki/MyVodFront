// import { defineNuxtConfig  } from '@nuxt/bridge'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
   carousel: {
    prefix: 'Vue'
  },
    build: {
    transpile: ['vue3-carousel'],
  },
  
  
  modules: ["vue3-carousel-nuxt",]
  
})