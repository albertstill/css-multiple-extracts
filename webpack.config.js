const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const multi = require('multi-loader');

// turns object to webpack require string for use with multi-loader
// it can't turn the postcss plugins function
const combineLoaders = require('webpack-combine-loaders');

const themeOne = new ExtractTextPlugin({
  filename: 'themeOne.css',
});

const themeTwo = new ExtractTextPlugin({
  filename: 'themeTwo.css',
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
        loader: multi(
          combineLoaders(
            themeOne.extract({
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                  },
                },
                // {
                //   loader: require.resolve('postcss-loader'),
                //   options: {
                //     ident: 'postcss',
                //     plugins: loader => [
                //       require('postcss-cssnext')({
                //         features: {
                //           customProperties: {
                //             variables: {
                //               mainColor: 'pink',
                //             },
                //           },
                //         },
                //       }),
                //     ],
                //   },
                // },
              ],
            }),
          ),
          combineLoaders(
            themeTwo.extract({
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                  },
                },
                // {
                //   loader: require.resolve('postcss-loader'),
                //   options: {
                //     ident: 'postcss',
                //     plugins: loader => [
                //       require('postcss-cssnext')({
                //         features: {
                //           customProperties: {
                //             variables: {
                //               mainColor: 'red',
                //             },
                //           },
                //         },
                //       }),
                //     ],
                //   },
                // },
              ],
            }),
          ),
        ),
      },
    ],
  },
  plugins: [themeOne, themeTwo],
};
