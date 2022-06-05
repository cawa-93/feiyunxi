import fs from "node:fs";
import { defineNuxtConfig } from 'nuxt';
import { VitePWA } from 'vite-plugin-pwa';



function getImages(path: string) {
  return fs.readdirSync(`./public/${path}`).map(name => `/${path}/${name}`);
}



// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    public: {
      imageSet: {
        feiyunxi: getImages('images/feiyunxi'),
        xiao: getImages('images/xiao'),
      },
      imageLoveSet: {
        feiyunxi: getImages('images/love/feiyunxi'),
        xiao: getImages('images/love/xiao'),
      },
    },
  },

  vite: {
    plugins: [
      VitePWA({
        manifest: {
          lang: 'ru',
        },
        base: '/',
        includeAssets: [
          ...getImages('images/feiyunxi'),
          ...getImages('images/xiao'),
          ...getImages('images/love/feiyunxi'),
          ...getImages('images/love/xiao'),
        ],
      }),
    ],
  },

  // plugins:
});
