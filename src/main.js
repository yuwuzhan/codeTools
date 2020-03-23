import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/common/normalize.scss';
import '@/assets/common/common.scss';
import ajax from '../utils/ajax';

Vue.config.productionTip = false;
Vue.prototype.$ajax = ajax;
Vue.prototype.$fileList = process.env.FILELIST;
new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
