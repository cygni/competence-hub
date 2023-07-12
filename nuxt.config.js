// https://nuxt.com/docs/api/configuration/nuxt-config
import ServiceAccount from "./config/serviceAccount.js";

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
  ssr: true,
  vuefire: {
    auth: true,
    config: {
      apiKey: "AIzaSyCv2SZo5e62v566bJOgLRPe5erL7VCUGok",
      authDomain: "cygnicompetencehub.firebaseapp.com",
      projectId: "cygnicompetencehub",
      storageBucket: "cygnicompetencehub.appspot.com",
      messagingSenderId: "225273337132",
      appId: "1:225273337132:web:161ab4d7909b78531e0889",
      measurementId: "G-JY96C7V423",
    },
    admin: {
      serviceAccount: ServiceAccount,
    },
  },
});
