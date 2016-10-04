const path = require('path');

module.exports = {
  entry: {
    main: './server/index.js',
  },
  output: {
    path: path.join(__dirname, 'out'),
    filename: 'server-bundle.js',
  },
  target: 'node',
  exclude: [
    path.resolve(__dirname, 'node_modules'),
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',

        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, 'server'),
        ],

        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,

        // Options to configure babel with
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
