// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // import react from '@vitejs/plugin-react'
// import { tamaguiPlugin } from '@tamagui/vite-plugin'
// import path from 'path'

// export default defineConfig({
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
//   plugins: [
//     react(),
//     tamaguiPlugin({
//       config: './tamagui.config.ts',
//       components: ['tamagui'],
//     }),
//   ]
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
const appConfigs = {
  public: {
    entry: 'index.html',
    outDir: 'dist/public',
    port: 5173,
  },
  seller: {
    entry: 'seller.html',
    outDir: 'dist/seller',
    port: 5174,
  },
  admin: {
    entry: 'admin.html',
    outDir: 'dist/admin',
    port: 5175,
  },
}

export default defineConfig(({ mode }) => {
  const appTarget = mode in appConfigs ? mode : 'public'
  const current = appConfigs[appTarget as keyof typeof appConfigs]

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      react(),
      {
        name: 'html-entry-rewrite',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (
              !req.url?.includes('.') &&
              !req.url?.startsWith('/@')
            ) {
              req.url = `/${current.entry}`
            }
            next()
          })
        },
      },
    ],
    server: {
      port: current.port,
    },
    // publicDir: appTarget === 'seller' ? 'seller-public' : 'public',
    base: process.env.VITE_BASE_PATH || '/',
    build: {
      outDir: current.outDir,
      rollupOptions: {
        input: { index: path.resolve(__dirname, current.entry) },
      },
    },
  }
})
