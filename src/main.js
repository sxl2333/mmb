import Vue from 'vue';
//引入axios ,把他放在vue的原型里面

import axios from "axios"
//让每个页面不用再引入axios ,使用时this.$axios
// 跨域请求时 是否会携带 凭证(cookie),保持登录必须写这个
axios.defaults.withCredentials=true;

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
//导入04组件页
import Login from "./components/04.login.vue"
//导入05订单详情页面
import Oder from "./components/05fillOder.vue"
//导入06订单生成页面\
import PayOrder from "./components/06.payOrder.vue"
//导入07支付成功页面
import PaySuccess from "./components/07.paySuccess.vue"
//导入08会员中心页面
import Members from "./components/08.Members.vue"
//导入09订单列表页面
import OrderList from "./components/09.orderList.vue"
//导入支付订单详情页面
import OrderDetail from "./components/10.orderdetail.vue"

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
Vue.filter('capitalize', function (val,formatStr) {
    if(formatStr==undefined){
      return moment(val).format("YYYY年MM月DD日HH点");
    }else{
      return moment(val).format(formatStr);
    }
      
  
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
    cartDate:JSON.parse(window.localStorage.getItem("goodsKey"))||{},
    isLogin:false,//默认没有登录
    //来时的地址
    formPath:""
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
  },
  //切换登录状态
  changeloginStatus(state,isLogin){
    state.isLogin=isLogin
  },
  //保存来时的路径
  saveFromPath(state, fromPath){
    state.fromPath=fromPath
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
//在页面刷新或关闭时保存数据到本地
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
},
//登录页面
{
  path:"/login",
  component:Login
},
//订单详情页面
{
  path:"/oder/:ids",
  component:Oder,
  meta: { requiresAuth: true }
},
//订单支付页面
{
  path:"/payOrder/:orderid",
  component:PayOrder,
  meta: { requiresAuth: true }
},
//订单支付成功
{
  path:"/paySuccess/:orderid",
  component:PaySuccess,
  meta: { requiresAuth: true }
},
//会员中心页面
{
  path:"/members",
  component:Members,
  meta: { requiresAuth: true }
  
},
//交易订单页面
{
  path:"/orderList",
  component:OrderList,
  meta: { requiresAuth: true }
  
},
//支付订单详情页面
{
  path:"/orderdetail/:id",
  component:OrderDetail,
  meta: { requiresAuth: true }
  
}

]
//实例化路由对象(routes的键是固定的,所以才能快速赋值)
let router=new  VueRouter({
  routes
})

//增加导航守卫（路由守卫）
router.beforeEach((to,from,next)=>{
  //每次有数据过来,就保存地址
  //提交载荷,保存数据
  store.commit("saveFromPath",from.path)
  //如果访问的页面时oder页面，需要判断登录
  if(to.meta.requiresAuth==true){
    axios.get(`site/account/islogin`).then(response=>{
      if(response.data.code!="nologin"){
        next()//如果有登录，继续执行代码
      }else{
        next("/login")//如果没有登录，返回登录页面
      }
    })
  }else{//其他不需要判断登录的页面，继续执行自己的代码
    next()
  }
})

//挂载路由
new Vue({
  render: h => h(App),
  router,//路由
  store,//vuex的数据管理
  //在高一层的组件中判断登录状态
  beforeCreate(){
    axios.get("site/account/islogin").then(response=>{
      if(response.data.code=="logined"){
        store.state.isLogin=true
      }
    })
  }
}).$mount('#app')
