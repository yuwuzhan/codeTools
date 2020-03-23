const ajax = (url = null, method = 'GET', async = true) => {
	return new Promise((resolve, reject) => {
		const oReq = new XMLHttpRequest();
		oReq.onload = function reqListener() {
			resolve(this.responseText);
		};
		oReq.onerror = (err) => {
			reject(err);
		};
		oReq.open(method, url, async);
		oReq.send();
	});
};
export default ajax;

