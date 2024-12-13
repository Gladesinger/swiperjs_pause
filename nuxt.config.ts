// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/scss/variables.scss";`
        }
      }
    }
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['quote', 'swiper-container', 'swiper-slide', 'nobr'].includes(tag),
    },
  },
})
