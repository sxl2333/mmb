<template>
    <div class="center">
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="goodsinfo routeanimate">
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
                                        <div class="msg-tips">
                                            <div class="icon">
                                                <i class="iconfont icon-check"></i>
                                            </div>
                                            <div class="info">
                                                <strong>订单已支付成功！</strong><span><span style="fontSize:30px; color:red">{{time}}</span>秒后进入会员中心页面</span>
                                                <p>您可以点击这里进入
                                                   <router-link to="/Members" style="font-size:30px">会员中心</router-link>查看订单状态！</p>
                                                <p>如有其它问题，请立即与我们客服人员联系。</p> 
                                            </div>
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
    name:"paySuccess",
    data:function(){
        return{
            time:20,
        }
    },
    //页面渲染完成之后的钩子函数
    mounted() {
      let timeId=  setInterval(()=>{
            this.time--;
            if(this.time==0){
                //清除定时器
                clearInterval(timeId);
                //跳转订单详情页面
                this.$router.push('/orderdetail/'+this.$route.params.orderid);
               
            }
        },1000)
    },
}
</script>
<style lang="">
    
</style>
