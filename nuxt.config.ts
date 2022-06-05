import fs from "node:fs";
import { defineNuxtConfig } from 'nuxt';



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
});
