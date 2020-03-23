const readDirRecur = require('./utils/fetchFiles');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const jsFilePath = './code/js'
const filePath = path.resolve(jsFilePath);
module.exports = {
	chainWebpack: config => {
		config
			.plugin('define')
			.tap(definitions => {
				readDirRecur(filePath).then((fileList) => {
					Object.assign(definitions[0]['process.env'], {
						FILELIST: JSON.stringify(fileList),
					});
				});
				return definitions;
			});
	},
	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([{from: jsFilePath, to: 'jsFire'}]),
		],
	},
	// pluginOptions: {}
};
