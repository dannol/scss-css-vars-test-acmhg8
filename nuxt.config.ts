// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt'],
  app: {
    head: {
      link: [
        // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Halfmoon/1.0.4/css/halfmoon.min.css" integrity="sha512-7dQ9SpDRusB0AuLtR7I3eriXktzIPDjckPHWGESXOCOULsvCb8piUukRxu79vDOsCwPs3tXXCYyAn7SbHMKUQQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/halfmoon@1.1.1/css/halfmoon-variables.min.css',
        },
        {
          rel: 'stylesheet',
          // href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/fontawesome.min.css',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
        },
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        // },
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/light.min.css',
        // },
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/halfmoon@1.1.1/js/halfmoon.min.js',
        },
      ],
    },
  },
});
