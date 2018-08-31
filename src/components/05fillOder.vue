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
                                <li class="active">
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
                    <div class="cart-box">
                        <!-- status-icon 让输入框的后面 有提示图标 -->
                        <el-form status-icon :model="orderForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <!-- 上面的一堆 个人信息输入 -->
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input v-model="orderForm.accept_name" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="">
                                        <v-distpicker @selected="selected" :province="orderForm.area.province.value" :city="orderForm.area.city.value" :area="orderForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input v-model="orderForm.address" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input v-model="orderForm.mobile" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱账号" prop="email">
                                        <el-input v-model="orderForm.email" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="email">
                                        <el-input v-model="orderForm.post_code" style="width:500px"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- 单选框 -->
                                        <el-radio v-model="orderForm.payment_id" label="6">在线支付</el-radio>
                                        <span style="color:#666">手续费:0.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- 单选框 -->
                                        <el-radio @change="expressChange(20)" v-model="orderForm.express_id" label="1">顺丰快递(20元)</el-radio>
                                        <el-radio @change="expressChange(10)" v-model="orderForm.express_id" label="2">圆通快递(10元)</el-radio>
                                        <el-radio @change="expressChange(8)" v-model="orderForm.express_id" label="3">韵达快递(8元)</el-radio>
                                    </li>
                                    
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="item in message" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <router-link :to="'/detail'+item.id">{{item.title}}</router-link>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <el-form-item label="订单备注(100字符以内)" prop="message">
                                                <!-- resize="none" 让文本域无法拖拽 -->
                                                <el-input type="textarea" resize="none" :row="2" v-model="orderForm.message" style="width:500px"></el-input>
                                            </el-form-item>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{orderForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderForm.goodsAmount+orderForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link to="/cart" >返回购物车</router-link>
                                            <a id="btnSubmit" class="btn submit" @click="sureOrder">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
//导入省事联动
import VDistpicker from "v-distpicker";

export default {
  name: "oder",
  //在组件创建成功就获取商品订单详情
  created() {
    //获得商品的ids
    this.orderForm.goodsids = this.$route.params.ids;
    //console.log(this.$route.params.ids)
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
      .then(response => {
          //计算总价格
          let total=0;
        //获取商品id和数量的键值对
        let cargoodsobj={}

        response.data.message.forEach(v => {

          //获取这个商品的数量,在VUex中有存储
          v.buycount = this.$store.state.cartDate[v.id];
          //单个商品的总价格
          v.totalamount=v.buycount*v.sell_price
          //所有商品的总价格
          total+=v.totalamount
          
          cargoodsobj[v.id]=v.buycount

        });
        //赋值数据
        this.message = response.data.message;
        //给表单总价格数据赋值
        this.orderForm.goodsAmount=total
        //给表单的商品信息赋值
        this.orderForm.cargoodsobj=cargoodsobj
      });
  },
  //计算属性
  computed:{
      totalCount(){
          let totalCount=0
          this.message.forEach(v=>{
              totalCount+=v.buycount
          })
          return totalCount
      }
  },
  //注册的组件
  components: { VDistpicker },
  //方法
  methods: {
    //省市区变动触发的方法
    selected(value) {
      console.log(value); //每一个value值都是一个对象,包括code,value
      this.orderForm.area = value; //把变动后的值,赋值给表单元素
    },
    //选择快递时,快递费的变化
    expressChange(price) {
      //改变快递费用
      this.orderForm.expressMoment = price;
      // console.log(price)
    },
    //提交订单
    sureOrder(){

        this.$axios.post(`site/validate/order/setorder`,this.orderForm).then(response=>{
            // console.log(response)
            let orderid=response.data.message.orderid
            //提交订单
            this.$router.push("/payOrder/"+orderid)
            //删除购物车数据,使用提交载荷
            this.message.forEach(v=>{
                this.$store.commit("deleteproduct",v.id)
            })
        })

    }
  },
  data: function() {
    //手机号码验证的自定义规则
    var checkMobile = (rule, value, callback) => {
      setTimeout(() => {
        //定义正则规则
        if (value.trim == "") {
          callback(new Error("请输入手机号码"));
        } else {
          let exec = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
          if (exec.test(value) == true) {
            callback();
          } else {
            callback(new Error("请输入正确的手机号码"));
          }
        }
      }, 300);
    };
    //邮箱验证
    var checkEmail = (rule, value, callback) => {
      // 如果value 不为空 格式验证
      // console.log(value);
      if (value.trim().length != 0) {
        // 验证
        // 邮箱的正则
        let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (exec.test(value.trim()) == true) {
          callback();
        } else {
          callback(new Error("请输入正确邮箱"));
        }
      } else {
        callback();
      }
    };
    //邮政编码验证
    var checkPostCode = (rule, value, callback) => {
      if (value.trim().length != 0) {
        //邮编的正则
        let exec = /^[1-9]\d{5}(?!\d)$/;
        if (exec.test(value.trim()) == true) {
          callback();
        } else {
          callbacke(new Error("请输入正确邮编"));
        }
      } else {
        callback();
      }
    };
    return {
      //页面商品详情
      message: "",
      orderForm: {
        //收获人姓名
        accept_name: "石女士",
        //所属地区
        area: {
          province: { code: "440000", value: "广东省" },
          city: { code: "440300", value: "深圳市" },
          area: { code: "440306", value: "宝安区" }
        }, // 省市区
        //详细地址
        address: "重量",
        //手机号码
        mobile: "17607270945",
        //邮箱账号
        email: "",
        //邮政编码
        post_code: "",
        //支付方式
        payment_id: "6", // 支付方式
        express_id: "1", //默认快递
        //快递费
        expressMoment: 20,
        //文本域备注
        message: "",
        //商品id
        goodsids: "",
        //商品总价格
        goodsAmount:0,
        //商品的id和价格的键值对
        cargoodsobj:{}
      },
      rules: {
        //收获人的规则
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20个字符",
            trigger: "change"
          }
        ],
        //地址的规则
        address: [
          {
            required: true,
            message: "请输入省市区之外的详细地址",
            trigger: "blur"
          }
        ],
        //手机号码的规则
        mobile: [{ validator: checkMobile, trigger: "blur" }],
        //邮箱账号规则
        email: [{ validator: checkEmail, trigger: "blur" }],
        //邮政编码
        post_code: [{ validator: checkPostCode, trigger: "blur" }]
      }
    };
  }
};
</script>
<style lang="">
</style>
