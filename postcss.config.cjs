const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
      cascade: true,
      grid: 'autoplace',
      flexbox: '2009',
      supports: true,
      remove: true,
    }),
  ],
};
