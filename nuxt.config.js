// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-vuefire"],
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
      serviceAccount: {
        credential: {
          type: "service_account",
          project_id: process.env.FIREBASE_PROJECT_ID,
          private_key_id: process.env.FIREBASE_KEY_ID,
          private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\n/gm, "\n"),
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID,
          auth_uri: process.env.FIREBASE_AUTH_URI,
          token_uri: process.env.FIREBASE_TOKEN_URI,
          auth_provider_x509_cert_url:
            process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URI,
          client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URI,
        },
      },
    },
  },
});
