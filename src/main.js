import Vue from 'vue';
//导入路由
import VueRouter from "vue-router";
//导入App根组件(最外面的组件)
import App from './App.vue';

import Index from "./components/01.index.vue";

Vue.config.productionTip = false;
//必须要加
Vue.use(VueRouter)
//定义路由的规则
let routes=[
  {
    path:"/",
   // component:Index
   redirect:"/index"
  },
  {
  path:"/index",
  component:Index
}]
//实例化路由对象(routes的键是固定的,所以才能快速赋值)
let router=new  VueRouter({
  routes
})
//挂载路由
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
