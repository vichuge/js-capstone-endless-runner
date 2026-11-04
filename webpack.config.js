const path = require('path');

const dist = path.resolve(__dirname, 'dist');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: dist,
    },
    // Source maps only while developing: the old inline map made the published bundle ~12 MB.
    devtool: isProduction ? false : 'eval-cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.css$/i,
          // url: false -> url() paths in CSS stay relative to dist/index.html.
          use: ['style-loader', { loader: 'css-loader', options: { url: false } }],
        },
      ],
    },
    performance: {
      // Phaser alone is ~1.3 MB minified; warn only above that.
      hints: isProduction ? 'warning' : false,
      maxAssetSize: 2 * 1024 * 1024,
      maxEntrypointSize: 2 * 1024 * 1024,
    },
    devServer: {
      static: { directory: dist },
      port: 8080,
      host: 'localhost',
      open: false,
      client: { overlay: { warnings: false, errors: true } },
    },
  };
};
