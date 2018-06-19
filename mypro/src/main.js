// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import moment from 'moment';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

Vue.config.productionTip = false

// Vue.prototype.$api = api.api();
// Vue.prototype.$err = api.error;
Vue.prototype.$Router = router;
// Vue.prototype.$Store = store;
Vue.prototype.$http = axios;
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue();
Vue.prototype.$moment = moment;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
