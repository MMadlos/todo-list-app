const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

const ruleForStyles = {
	test: /\.css$/,
	use: ["style-loader", "css-loader"],
}

const ruleForImages = {
	test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
	type: "asset/resource",
}

const rules = [ruleForStyles, ruleForImages]

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: { rules },
	devServer: {
		open: true,
	},
	plugins: [new HtmlWebpackPlugin({ template: "src/index.html" })],
}
