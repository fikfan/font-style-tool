// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['shadcn-nuxt', "@nuxtjs/tailwindcss"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  runtimeConfig: {
    public: {
      googleFontsApiKey: process.env.GOOGLE_FONTS_API_KEY
    }
  },

  devtools: { enabled: true }
})