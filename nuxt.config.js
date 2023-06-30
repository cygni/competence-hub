// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-vuefire"],
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
      apiKey: "AIzaSyAxPNtT3asb3vcsXIeg-DDKfQQYnY2-eLQ",
      authDomain: "cygni-competence-hub.firebaseapp.com",
      projectId: "cygni-competence-hub",
      storageBucket: "cygni-competence-hub.appspot.com",
      messagingSenderId: "936812239764",
      appId: "1:936812239764:web:c67f45faed8254fd4e8d81",
    },
    admin: {
      serviceAccount: "credentials.json",
    },
  },
});
