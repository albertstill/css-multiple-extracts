const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const themeOne = new ExtractTextPlugin({
  filename: 'output.css',
});

module.exports = {
  entry: './input.js',
  output: {
    filename: 'output.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /.css$/,
        loader: themeOne.extract({
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss',
                plugins: loader => [
                  require('postcss-cssnext')({
                    features: {
                      customProperties: {
                        variables: {
                          mainColor: 'pink',
                        },
                      },
                    },
                  }),
                ],
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    themeOne,
  ],
};
