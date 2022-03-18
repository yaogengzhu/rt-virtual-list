import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
    plugins: [
        react(),
        createHtmlPlugin({
            minify: true,
            /**
             * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
             * @default src/main.ts
             */
            entry: 'src/main.tsx',
            /**
             * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
             * @default index.html
             */
            template: 'public/index.html',
        }),
    ], // 配置需要使用的插件列表
    base: './', // 在生产中服务时的基本公共路径。
    css: {
        // css预处理器
        preprocessorOptions: {
            less: {
                charset: false,
            },
        },
    },
    server: {
        host: 'localhost', // 指定服务器主机名
        port: 3000, // 指定服务器端口
        open: true, // 在服务器启动时自动在浏览器中打开应用程序
        strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
        https: false, // 是否开启 https
        cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源
        proxy: {
            //
            '/api': {
                target: '', //代理接口
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
