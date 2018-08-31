<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                         <el-input v-model.trim="name" placeholder="请输入用户名"></el-input>
                        <br>
                        <br>
                        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
                        <br>
                        <br>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" value="立即登录" @click="login">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import $ from 'jquery';
//暴露数据
export default {
  name: "login",
  data:function(){
      return{
          name:"admin",
          password:"123",
      }
  },
  methods:{
      login(){
          
          //判断用户或密码是否为空，为空提示用户
          if(this.name==""||this.password==""){
              this.$message.error("账号或密码为空，请输入账号和密码")
              return
          }
          //显示进度条
          this.$Loading.start();
          //登录接口的调用
          this.$axios.post("site/account/login",{
              user_name:this.name,
              password:this.password
          }).then(response=>{
             // console.log(response)
              //把登录状态改为true传给vueX
              this.$store.commit("changeloginStatus",true)
              //登录完成回到来时的页面
              console.log(this.$store.state.fromPath);
              
              this.$router.push(this.$store.state.fromPath)
              //响应完成,结束进度条,
               this.$Loading.finish();
          }).catch(response=>{
              //错误显示的进度条
              this.$Loading.error();
          })
      }
  }

};
</script>
<style lang="">
</style>

