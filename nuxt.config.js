// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-vuefire"],
  plugins: ["@/plugins/firebase.js"],
  css: ["@/assets/css/global.css", "@/assets/css/tailwind.css"],
  tailwindcss: {},
  autoprefixer: {},
  alias: {
    assets: "/<rootDir>/assets/",
  },
  head: {
    title: "Competence Hub",
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico?v2" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      { rel: "icon", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", sizes: "192x192", href: "/android-chrome-192x192" },
      { rel: "icon", sizes: "512x512", href: "/android-chrome-512x512" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  },
  app: {
    head: {
      title: "Competence Hub",
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  ssr: false, // vuefire SSR support is still in experimental. 2023-07-17
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
      serviceAccount: JSON.stringify({
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URI,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URI,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
      }),
    },
  },
});
