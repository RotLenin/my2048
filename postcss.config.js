module.exports = {
  plugins: [
    require('postcss-nested'),
    require('autoprefixer'),
    [
      "postcss-preset-env",
      {
        browsers: 'last 2 versions',
      },
    ],
  ]
};
