import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from 'tailwindcss'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    svgLoader(),
    AutoImport({
      dts: './src/auto-imports.d.ts',
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core'],

      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: './src/components.d.ts',
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ['src/components/'],
      resolvers: [ElementPlusResolver()]
    })
  ],
  build: {
    assetsDir: 'static/assets',
    chunkSizeWarningLimit: 1600
  },
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
