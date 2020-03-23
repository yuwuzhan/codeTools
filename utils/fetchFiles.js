const {stat, readdir} = require('fs').promises;
const path = require('path');
let fileId = 0;
const fileList = {
	fid: 0,
	filename: 'jsFire',
	children: [],
};
/**
 * 文件遍历方法
 * @param fullPath 需要遍历的文件路径
 * @param list 需要添加到的列表
 * @param filepath 当前文件相对路径
 */
module.exports = function readDirRecur(fullPath, list = fileList.children, filepath = fileList.filename) {
	return readdir(fullPath).then(function (files) {
		files = files.map(function (item) {
			const filedir = path.join(fullPath, item);
			return stat(filedir).then(function (stats) {
				fileId += 1;
				const _filepath = `${filepath}/${item}`;
				const obj = {filename: item, fid: fileId, filepath: _filepath};
				list.push(obj);
				if (stats.isFile()) {
					obj.isFile = true;
				}
				if (stats.isDirectory()) {
					obj.children = [];
					return readDirRecur(filedir, obj.children, _filepath);
				}
			});
		});
		return Promise.all(files).then(() => {
			return fileList;
		});
	});
};
