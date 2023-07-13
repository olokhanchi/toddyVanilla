import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  build: {
    outDir: 'dist', // Директория для сохранения собранного проекта
    assetsDir: '', // Директория для статических ресурсов (например, изображения)
    sourcemap: false, // Генерация sourcemaps для отладки
    minify: true, // Минимизация и оптимизация кода
    terserOptions: {
      compress: {
        drop_console: true, // Удалить все console.log
      },
      format: {
        comments: false, // Удалить все комментарии
      },
      keep_classnames: false,
      keep_fnames: false,
    },
    target: 'es2015', // Целевая версия ECMAScript
    cssCodeSplit: true, // Разделение CSS на отдельные файлы
    assetsInlineLimit: 4096, // Пороговое значение размера файлов, которые будут инлайниться в HTML
    chunkSizeWarningLimit: 500, // Пороговое значение размера чанков, при котором будет выдано предупреждение
    brotliSize: false, // Включение/отключение генерации размера файлов в формате Brotli

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
