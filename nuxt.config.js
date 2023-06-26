// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-vuefire"],
  plugins: ["@/plugins/firebase.js"],
  css: ["@/assets/css/global.css"],
  alias: {
    assets: "/<rootDir>/assets/",
  },
  app: {
    head: {
      title: "Competence Hub",
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  vuefire: {
    auth: true,
    config: {
      apiKey: "AIzaSyD8J4I7DT9EAfqxXO8FZWLXm17_I7KLxfs",
      authDomain: "competence-hub.firebaseapp.com",
      projectId: "competence-hub",
      storageBucket: "competence-hub.appspot.com",
      messagingSenderId: "348871633146",
      appId: "1:348871633146:web:a660f88f12d9b4b4b24143",
    },
    admin: {
      serviceAccount: "credentials.json",
    },
  },
});
