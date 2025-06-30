import { fileURLToPath, URL } from 'node:url'
//自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    //ElementPlus自动引入
     AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server:{
  // proxy:{
  //   '^/(?!@vite|src|assets|public|index.html|favicon.ico)': {
  //     target:'',
  //     changeOrigin:true,
  //     // rewrite:path => path.replace(/^\/(?!@vite|src|assets|public|index.html|favicon.ico)/,'')
  //   }
  // }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
