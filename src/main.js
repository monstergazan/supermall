import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
//解决移动端300ms延迟
FastClick.attach(document.body)
//使用懒加载插件
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')




