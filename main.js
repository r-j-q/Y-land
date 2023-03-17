import App from './App'
import uView from "uview-ui";
Vue.use(uView);
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
import * as http from 'config/https.js'
import * as common from 'config/common.js'
Vue.prototype.$common = common; 
Vue.prototype.$http = http;
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif