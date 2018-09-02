<template>
    <div class="el-row">
        <div class="el-col el-col-24">
            <div class="comp">
                <div class="tmpl routeanimate">
                    <div class="section">
                        <div class="location">
                            <span>当前位置：</span>
                            <router-link to="/index">首页</router-link> &gt;
                           <router-link to="/members">会员中心</router-link>&gt;
                            <a href="#/site/member/orderlist" class="router-link-exact-active ">我的订单</a>
                        </div>
                    </div>
                    <div class="section clearfix">
                        <div class="left-260">
                            <div class="bg-wrap">
                                <div class="avatar-box">
                                    <a href="/user/center/avatar.html" class="img-box">
                                        <i class="iconfont icon-user-full"></i>
                                    </a>
                                    <h3>

                                        ivanyb

                                    </h3>
                                    <p>
                                        <b>注册会员</b>
                                    </p>
                                </div>
                                <div class="center-nav">
                                    <ul>
                                        <li>
                                            <h2>
                                                <i class="iconfont icon-order"></i>
                                                <span>订单管理</span>
                                            </h2>
                                            <div class="list">
                                                <p>
                                                    <router-link to="/orderList"> <i class="iconfont icon-arrow-right"></i>交易订单</router-link>
                                                   
                                                       
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <h2>
                                                <i class="iconfont icon-user"></i>
                                                <span>账户管理</span>
                                            </h2>
                                            <div class="list">
                                                <p>
                                                    <a href="#/site/member/center" class="">
                                                        <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                </p>
                                                <p>
                                                    <a href="#/site/member/center" class="">
                                                        <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                </p>
                                                <p>
                                                    <a href="#/site/member/center" class="">
                                                        <i class="iconfont icon-arrow-right"></i>修改密码</a>
                                                </p>
                                                <p>
                                                    <a href="javascript:void(0)">
                                                        <i class="iconfont icon-arrow-right"></i>退出登录</a>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="right-auto">
                            <div class="bg-wrap" style="min-height: 765px;">
                                <div class="sub-tit">
                                    <ul>
                                        <li class="selected">
                                            <router-link to="/orderList">交易订单</router-link>
                                        </li>
                                    </ul>
                                </div>

                                <div class="table-wrap">
                                    <el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                                    :current-page="pageIndex" :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                                    </el-pagination>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                                        <tbody>
                                            <tr>
                                                <th width="16%" align="left">订单号</th>
                                                <th width="10%">姓名</th>
                                                <th width="12%">订单金额</th>
                                                <th width="11%">下单时间</th>
                                                <th width="10%">状态</th>
                                                <th width="12%">操作</th>
                                            </tr>
                                            <tr v-for="(item, index) in message" :key="index.id">
                                                <td>{{item.order_no}}</td>
                                                <td align="left">{{item.accept_name?item.accept_name:"匿名用户"}}</td>
                                                <td align="left">
                                                    <strong style="color: red;">￥{{item.order_amount}}</strong>
                                                    <br> 在线支付
                                                </td>
                                                <td align="left">{{item.complete_time | capitalize("YYYY:MM:DD:HH:mm:ss")}}</td>
                                                <td align="left">
                                                    {{item.statusName}}
                                                </td>
                                                <td align="left">
                                                   <router-link :to="'/orderdetail/'+item.id"> 查看订单</router-link>
                                                    <br>
                                                    <router-link  :to="'/payOrder/'+item.id" v-if="item.status==1">去付款</router-link>
                                                    <!-- <br> -->
                                                    <!-- <a href="javascript:void(0)">|取消</a> -->
                                                    <!-- <br> -->
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="page-foot">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "orderList",
  data:function(){
      return{
          //当前页
          pageIndex:1,
          //页容量
          pageSize:10,
          //总条数
          totalCount:0,
        //列表信息
        message:[],
      }
  },
  created() {
    this.getOrderList()
  },
  methods:{
      //获取订单列表
      getOrderList(){
            this.$axios.get(`site/validate/order/userorderlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(response=>{
         // console.log(response)
          this.totalCount=response.data.totalcount
            this.message=response.data.message
      })
      },
      //页容量改变
      handleSizeChange(size){
          this.pageSize=size
          this.pageIndex=1
          this.getOrderList()
      },
      //页码改变
      handleCurrentChange(index){
          this.pageIndex=index
          this.getOrderList()
      }
  }
};
</script>
<style >
.sub-tit {
  padding-top:30px;
  height: 72px;
}
.table-wrap{
    margin-top: 30px
}
</style>

