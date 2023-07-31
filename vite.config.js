import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: '',
    sourcemap: false, 
    minify: true,
    terserOptions: {
      compress: {
        drop_console: true,
      },
      format: {
        comments: false,
      },
      keep_classnames: false,
      keep_fnames: false,
    },
    target: 'es2015', 
    cssCodeSplit: true, 
    assetsInlineLimit: 4096, 
    chunkSizeWarningLimit: 500, 
    brotliSize: false,

    // Алиасы для резолвинга модулей
    alias: {
      '@': '/src',
      // Другие алиасы...
    },

    // Пользовательские опции режима разработки или сборки
    // (например, установка глобальных переменных для сборки production)
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      // Другие определения...
    },
  },

  // Плагины Vite
  plugins: [babel()],

  // Дополнительные опции разработки
  server: {
    // ...другие опции сервера разработки...
    host: 'localhost',
    port: 3000, // Порт для сервера разработки
    open: true, // Автоматическое открытие браузера при запуске сервера
    watch: false,
  },
});
