var path = require('path')
var webpack = require('webpack')

module.exports = {
	context: path.resolve(__dirname, './src'),
	// 输入文件
	entry: {
		app: './app.js'
	},
	// 输出文件
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},
	// 压缩代码
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	],
    module : {
	    loaders:[
          {
          	test: /\.js$/,
          	loader: 'babel-loader'
          },
          {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'url-loader?limit=8192&name=./[name].[ext]'
          },
	      {
	      	test: /\.css$/,
	      	loader: 'style-loader!css-loader'
	      },
          {
            test: /\.styl$/,
            loader: 'style-loader!css-loader!stylus-loader'
          }
	    ]
    }
}