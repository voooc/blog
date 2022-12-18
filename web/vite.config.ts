import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    base: './',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
      Components({
        resolvers: [TDesignResolver({
          library: 'vue-next',
        })],
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      }
    },
    server: {
      host: true,
      port: 3000,
      open: true,
      // http://localhost:3000/api/bar -> http://jsonplaceholder.typicode.com/bar
      proxy: {
        '/api': {
          target: 'http://os.biomap-test.com/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/,''),
        }
      },

    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      sourcemap: mode !== 'production',
      chunkSizeWarningLimit: 2000,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          math: 'strict',
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
          },
          javascriptEnabled: true,
        }
      }
    },
    optimizeDeps: {
      include: [
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
      exclude: ['vue-demi'],
    }
  };
};
