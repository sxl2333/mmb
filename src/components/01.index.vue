<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="itemSon in item.subcates" :key="itemSon.id">
                                                {{itemSon.title}}&nbsp;
                                            </span>

                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="itemSon in item.subcates" :key="itemSon.id">{{itemSon.title}}</a>

                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel :interval="5000" arrow="always">
                            <el-carousel-item v-for="item in sliderlist" :key="item">
                               <a href="#">
                                    <img :src="item.img_url" alt="" class="bannerImg">
                               </a>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <!-- |这个是过滤器的管道 -->
                                    <span>{{item.add_time | capitalize}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="(item, index) in list" :key="index">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="itemSon in item.level2catelist" :key="itemSon.subcateid" >{{itemSon.subcatetitle}}</a>
                   
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itemS in item.datas" :key="itemS">
                            <router-link :to="'/detail/'+itemS.artID">
                                <div class="img-box">
                                    <img v-lazy="itemS.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemS.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemS.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemS.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemS.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                          </router-link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
//获取3网络数据
;

export default {
  name: "index",
  data: function() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
        list:[]
    };
  },
  //创建成功
  created() {
    this.$axios.get("site/goods/gettopdata/goods")
      .then(response => {
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
        //console.log(response);
      })
      //商品列表的借口
    this.$axios.get("site/goods/getgoodsgroup").then((response)=>{
        //console.log(response);
        this.list=response.data.message
    }) 
  },
 
};
</script>

<style>
body{
    background-color: rgb(99, 4, 4)!important;
}
.el-carousel .el-carousel__container {
  height: 341px;
}
.el-carousel .el-carousel__container img {
  height: 100%;
  width: 100%;
}
</style>

