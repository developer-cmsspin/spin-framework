/**
 *  Webpack runs when the project starts in Production mode.
 *  mode: production/dev
 *  npx webpack
 *  npx webpack --env=production
 *  npx webpack --env=watch
 *
 */
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const Entries = require("./webpack.config/Entries.js");
const Sing = require("./webpack.config/sign.js")();
const CopyPlugin = require("copy-webpack-plugin");
const Appsettings = require("./appsettings.json");
const webpack = require("webpack");
const Path = require("path");
const fs = require("fs");

module.exports = (env) => {
	// Start::config env
	let file =
		env.production == true
			? "./webpack.config/env/env.prod.js"
			: `./webpack.config/env/env.${Appsettings.Enviroment}.js`;
	file = fs.existsSync(file) ? file : false;
	file = env.watch === true ? "./webpack.config/env/env.watch.js" : file;
	file = !file && fs.existsSync("./webpack.config/env/env.dev.js") ? "./webpack.config/env/env.dev.js" : file;
	file = !file ? "./webpack.config/env/env.prod.js" : file;
	let Config = require(file);
	let react = new Entries([...Config.path.filesTS, ...Config.path.filesTSX, ...Config.path.filesSASS]);
	// End::config env

	// Start::info alert
	console.log();
	console.log(`== > YOU ARE CONNECTED ENVIRONMENT: ${Appsettings.Enviroment}`);
	console.log(`== > RUNNING IN MODE: ${Config.mode}`);
	console.log(`== > CONFIGURATION FILE: ${file}`);
	console.log();
	// End::info alert

	//Start::Resolve plugins
	let plugins = [];
	plugins.push(
		new MiniCSSExtractPlugin({
			filename: ({ chunk }) => {
				const name = chunk.name.replace("scss_", "");
				return `css/${name}.min.css`;
			},
		})
	);
	/* validate copy plugin */
	if (Config.copyFiles && Config.copyFiles.length > 0) {
		plugins.push(
			new CopyPlugin({
				patterns: Config.copyFiles,
			})
		);
	}
	//End::Resolve plugins
	plugins.push(
		new webpack.ProvidePlugin({
			$: "jquery",
			jquery: "jquery",
			"window.jQuery": "jquery",
			jQuery: "jquery",
			Rellax: "rellax",
			AOS: "aos",
		})
	);

	return react.define().then((entries) => {
		return {
			entry: entries,
			mode: Config.mode,
			devtool: Config.devtool,
			watch: Config.watch,
			plugins: plugins,
			resolve: {
				extensions: [".ts", ".tsx", ".js"],
				alias: {
					Modules: Path.resolve(__dirname, "Spin/Module"),
					Themes: Path.resolve(__dirname, "Spin/Themes"),
					Core: Path.resolve(__dirname, "Spin/SPA"),
					jquery: Path.resolve(__dirname, "node_modules/jquery/dist/jquery.min.js"),
					"jquery-validation": Path.resolve(
						__dirname,
						"node_modules/jquery-validation/dist/jquery.validate.min.js"
					),
					bootstrap: Path.resolve(__dirname, "node_modules/bootstrap/dist/js/bootstrap.min.js"),
					aos: Path.resolve(__dirname, "node_modules/aos/dist/aos.js"),
					rellax: Path.resolve(__dirname, "node_modules/rellax/rellax.min.js"),
					lazysizes: Path.resolve(__dirname, "node_modules/lazysizes/lazysizes.min.js"),
					"dist-front": Path.resolve(__dirname, "wwwroot/dist-front/"),
				},
			},
			output: {
				path: Path.resolve(__dirname, Config.path.output),
				filename: "js/[name].min.js",
			},
			/*
			optimization: {
				runtimeChunk: 'single',
				splitChunks: {
					chunks: 'async',
					cacheGroups: {
						commons: {
							name: 'commons',
							chunks: 'initial',
							minChunks: 3
						}					
					}
				}
			  },	
			  */
			module: {
				rules: [
					{
						test: /\.ts(x?)$/,
						exclude: /node_modules/,
						use: [
							{
								loader: "ts-loader",
							},
						],
					},
					{
						test: /\.(sa|sc|c)ss$/,
						use: [MiniCSSExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
					},
					{
						test: /\.(png|woff|woff2|eot|ttf|svg|jpg|webp)$/,
						use: [
							{
								loader: "url-loader",
								options: {
									limit: 8192,
									publicPath: "./../",
								},
							},
						],
					},
				],
			},
			externals: {
				react: "React",
				"react-dom": "ReactDOM",
				"react-router-dom": "ReactRouterDOM",
			},
		};
	});
};
