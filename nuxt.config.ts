import fs from "node:fs";
import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        public: {
            imageSet: {
                feiyunxi: fs.readdirSync('./public/images/feiyunxi'),
                xiao: fs.readdirSync('./public/images/xiao'),
            }
        }
    }
});
