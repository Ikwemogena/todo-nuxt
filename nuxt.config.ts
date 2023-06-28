// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
  ],
  app: {
    head: {
      title: "TO-DO",
      meta: [
        {name: 'description', content: 'TO-DO template'}
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
      ]
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
})
