const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './main.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index.js',
      publicPath: '/'
   },
   devServer: {
      inline: true,
      port: 8080,
      historyApiFallback: true
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            resolve: {
              extensions: ['.js', '.jsx']
            },
            loader: 'babel-loader',
            query: {
              presets: ['env', 'react', 'es2015', 'stage-0'],
              plugins: ["transform-class-properties"]
            }
         },
         {
           test: /\.css$/,
           loader: ['style-loader', 'css-loader']
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: 'index.html'
      })
   ]
}
