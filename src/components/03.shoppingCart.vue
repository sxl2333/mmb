<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <router-link to="/index">马上去购物吧！</router-link>
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 购物车有商品是显示的内容 -->
                                <tr v-if="message.length!=0" v-for="item in message" :key="item.id" class="bigCart">
                                    <td>
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td><img :src="item.img_url" alt=""></td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number size="mini" v-model="item.buycount" :min="0" @change="numChange($event,item.id)"></el-input-number>
                                    </td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td>
                                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteOne(item.id)"></el-button>
                                    </td>

                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
  name: "cart",
  data: function() {
    return {
      message: []
    };
  },
  //声明周期函数
  created() {
    //定义变量暂存一个
    let cartDate = this.$store.state.cartDate;
    let ids = "";
    for (let key in cartDate) {
      ids += key; //cartDate 中键的名字是id,值就是数量
      ids += ",";
    }
    //去掉最后一个多余逗号,  -1就是最后一位
    ids = ids.slice(0, -1); //分割后去下标为0的部分
    //调用接口发请求
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
      // console.log(response)
      response.data.message.forEach((v, i) => {
        // 获取 Vuex中的 id对应的值
        v.buycount = cartDate[v.id];
        //默认不被选中
        v.selected = false;
      });
      this.message = response.data.message;
    });
  },
  //计算属性(总金额,数量)
  computed: {
    totalPrice() {
      let totalPrice = 0;
      this.message.forEach((v, i) => {
        if (v.selected) {
          totalPrice += v.sell_price * v.buycount;
        }
      });
      return totalPrice;
    },
    totalCount() {
      let totalCount = 0;
      this.message.forEach(v => {
        if (v.selected) {
          totalCount += parseInt(v.buycount);
        }
      });
      return totalCount;
    }
  },
  methods: {
    //都买数量发生变化时,要使用vuex的方法(提交载荷)
    numChange(num, id) {
      console.log(num, id);
      this.$store.commit("updates", {
        productId: id,
        productNum: num
      });
    },
    //单个删除
    deleteOne(id) {
      console.log(id);
      //页面中的并没有被删除,只是把储存的数据给删掉了,并让购物车的数量同步更新了
      this.$store.commit("deleteproduct", id);
      //删除页面中的
      this.message.forEach((v, i) => {
        if (v.id == id) {
          this.message.splice(i, 1);
        }
      });
    }
  }
};
</script>
<style>
.bigCart img {
  width: 50px;
}
</style>

