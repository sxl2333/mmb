import Vue from 'vue';
//引入axios ,把他放在vue的原型里面

import axios from "axios"
//让每个页面不用再引入axios ,使用时this.$axios
Vue.prototype.$axios=axios
//axios的基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//导入路由
import VueRouter from "vue-router";
//导入App根组件(最外面的组件)
import App from './App.vue';
//导入01 组件页
import Index from "./components/01.index.vue";
//导入02组件页
import Detail from "./components/02productdetai.vue"
//导入03组件页
import  Cart from "./components/03.shoppingCart.vue"


//移入element这个
import ElementUI from 'element-ui';
import "../node_modules/element-ui/lib/theme-chalk/index.css"

//引入ivew
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//引入懒人加载的
import VueLazyload from 'vue-lazyload';
//转化日期的
import moment from "moment";
//全局过滤器
Vue.filter('capitalize', function (val) {

      return moment(val).format("YYYY年MM月DD日HH点mm分ss秒");
  
})
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require("./assets/img/lazyload.png"),
  attempt: 1
})

//引入放大镜的
import ProductZoomer from 'vue-product-zoomer' 
Vue.use(ProductZoomer)

Vue.config.productionTip = false;
//必须要加
Vue.use(VueRouter)
//使用element
Vue.use(ElementUI);


//定义vuex统一进行数据管理
import Vuex from 'vuex'
Vue.use(Vuex)
//实例化
const store = new Vuex.Store({
  state: {
    cartDate:JSON.parse(window.localStorage.getItem("goodsKey"))||{}
  },
  mutations: {
    addGoods(state,product){//商品的键值对-productId:productNum
      if(state.cartDate[product.productId]==undefined){
        //当没有这个id时,需要用vue.set设置属性,否则无法实现显示数据的实时更新
        Vue.set(state.cartDate,product.productId,product.productNum)
      }else{
        //传过来的id已经存在
        state.cartDate[product.productId]+=product.productNum       
      }    
    },
     //修改数据
  updates(state,product){
    state.cartDate[product.productId]=product.productNum
  },
  //删除数据
  deleteproduct(state,productId){
    //delete 删除对象属性的方法没有用,必须用vue的删除方法
   //delete state.cartDate[productId]
   Vue.delete(state.cartDate,productId)
  }
  },
 
  //getters vuex的计算属性
  getters:{
    goodsCount:state=>{
      let num=0;
      for(let key in state.cartDate){
        num+=state.cartDate[key]
      }
      return num;
    }
  }
})

window.onbeforeunload=function(){
  window.localStorage.setItem("goodsKey",JSON.stringify(store.state.cartDate))
}



//定义路由的规则
let routes=[
  {
    path:"/",
   // component:Index
   redirect:"/index"
  },
  //首页的组件
  {
  path:"/index",
  component:Index 
},
//商品详情页面的组件
{
  path:"/detail/:id",
  component:Detail,
},
//购物车
{
path:"/cart",
component:Cart,
}
]
//实例化路由对象(routes的键是固定的,所以才能快速赋值)
let router=new  VueRouter({
  routes
})
//挂载路由
new Vue({
  render: h => h(App),
  router,//路由
  store,//vuex的数据管理
}).$mount('#app')
