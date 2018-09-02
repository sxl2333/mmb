<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}
                                                <span> {{orderInfo.address}}</span>
                                            </dd>

                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/'+$route.params.orderid" :options="{ size: 200 }"></qrcode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//引入二维码组件
import VueQrcode from "@xkeshi/vue-qrcode";

export default {
  //二维吗组件
  components: {
    //[]是es6的,可以让对象的键能够动态的生成
    [VueQrcode.name]: VueQrcode
  },
  name: "payOrder",
  data: function() {
    return {
      orderInfo: {}
    };
  },
  created() {
    this.$axios
      .get(`site/validate/order/getorder/${this.$route.params.orderid}`)
      .then(response => {
        //console.log(response);
        this.orderInfo = response.data.message[0];
      });
    //在页面中,轮询(多次查看接口状态)
    let InterId= setInterval(() => {
      this.$axios
        .get(`site/validate/order/getorder/${this.$route.params.orderid}`)
        .then(response => {
          if (response.data.message[0].status == 2) {
            //提示
            this.$Message.success("支付成功");
            //跳转页面
            setTimeout(() => {
              this.$router.push("/paySuccess/"+this.$route.params.orderid);
            }, 1000);
            //清除定时器
            clearInterval(InterId);
          }
        }).catch(response=>{
            this.$Message.error("支付失败")
        })
    }, 2000);
  }
};
</script>
<style lang="">
</style>

