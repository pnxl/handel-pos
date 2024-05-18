// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/styles/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["nuxt-icon", "nuxt-headlessui"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    public: {
      databaseUrl: "",
      anonymousApikey: "",
      locale: "id-id",
      currency: "Rp ",
    },
  },
  headlessui: {
    prefix: "Headless",
  },
});
