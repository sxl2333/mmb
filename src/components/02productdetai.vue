<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">

                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="num1" @change="handleChange" :min="0" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="AddCar" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <Affix></Affix>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=true" :class="{selected:showDiscuss}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=false" :class="{selected:!showDiscuss}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-show="showDiscuss" v-html="goodsinfo.content">

                            </div>
                            <div class="tab-content" v-show="!showDiscuss">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！" v-model.trim="commentsInfo"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="submitCommit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | capitalize}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">                                       
                                            <Page :total="totalCount" show-elevator show-sizer placement="top" :page-size-opts="[5,6,10,13,26]"  @on-change="pageChange" @on-page-size-change="pageSizeChange" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | capitalize}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
        <img v-if="imglist.length!=0" :src="imglist[0].original_path" class="imgJump" alt="">
    </div>
</template>
<script>
import $ from "jquery"
export default {
  name: "detail",
  data: function() {
    return {
      productId: "",
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      //购买数量
      num1: 0,
      //商品和评价的点击切换
      showDiscuss: true,
      //放大镜
      images: {
        normal_size: []
      },
      zoomerOptions: {
        zoomFactor: 5, // 放大倍数
        pane: "container-round", // container-round 小放大镜
        hoverDelay: 300,
        namespace: "zoomer",
        move_by_click: true, // true 点击切换
        scroll_items: 7,
        choosed_thumb_border_color: "yellowgreen" // 框的颜色
      },
      //评论内容
      commentsInfo: "",
      //页码
      pagNum: 1,
      //页容量
      pagSize: 10,
      //评论数据
      comments: [],
      //评论总条数
      totalCount: 0
    };
  },
  methods: {
    //商品详情页面
    getproductdetail() {
      this.productId = this.$route.params.id;
     // console.log(this.productId)
      this.$axios
        .get(
          `site/goods/getgoodsinfo/${this.productId}`
        )
        .then(response => {
          // console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          let temArr = [];
          this.imglist.forEach((v, i) => {
            temArr.push({
              id: v.id,
              url: v.original_path
            });
          });
          this.images.normal_size = temArr;
        });
    },
    //获取评论
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${
            this.productId
          }?pageIndex=${this.pagNum}&pageSize=${this.pagSize}`
        )
        .then(response => {
          //console.log(response);
          this.comments = response.data.message;
          this.totalCount = response.data.totalcount;
        });
    },
    //发表评论
    submitCommit() {
      //空评论,提示
      if (!this.commentsInfo) {
        this.$Message.error("内容为空,评论无效!");
        return;
      }
      //非空内容提交
      this.$axios.post(`site/validate/comment/post/goods/${this.productId}`,{
     commenttxt:this.commentsInfo  
     })
     .then((response)=>{
          console.log(response)
           this.$Message.success("评论成功!");
           //重新获取评论
        this.getComments()
        this.commentsInfo=""
      })
    },
    //点击页码
    pageChange(page) {
      this.pagNum = page;
      //重新获取评论
      this.getComments()
    },
    //点击切换页容量
    pageSizeChange(size) {
      this.pagSize = size;
       //重新获取评论
      this.getComments()
    },
    //点击加入购物车
    AddCar(){
        //获取添加购物车的位置
        let carOffset=$(".add").offset()
        //获取购物车的位置
        let buy=$(".icon-cart").offset()
      console.log(buy)

        let a=  $(".imgJump").css(carOffset).show().addClass("img ").addClass("imgs").css(buy)
    }
  },
  watch: {
    //监听$route的改变,重新获取数据
    $route: function(val, oldVal) {
      //放大镜这个地方必须把改为空数组,不然不会随着传入的id不同,而更换不同的图片
      this.images.normal_size = [];
      //获取这个id的数据
      this.getproductdetail();
    }
  },
  created() {
    //调用获取商品详情的方法
    this.getproductdetail();
    //调用获取评论的方法
    this.getComments();
    
  }
};
</script>


<style lang="less">
.tab-content img {
  width: 100%;
  height: 100%;
  display: block;
  
}
/*放大镜样式*/
.pic-box {
  width: 395px;
}
.thumb-list img {
  width: 80px;
  height: 80px;
  margin-right: 2px;
}

.pic-box {
  .control-box .thumb-list {
    grid-column-gap: 0px;
  }
  .control {
    display: flex;
    justify-content: center;
  }
}
.pic-box .control-box .thumb-list {
  grid-column-gap: 0px;
}
.pic-box .control {
  display: flex;
  justify-content: center;
}
//点击购物车,显示图片的样式
.imgJump{
    width: 50px;
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
}
.imgJump.img{
    opacity: 1;
    transition: all 1s;
    transform: scale(1) rotate(0);
    // display: block;
}
.imgJump.img.imgs{
    transform: scale(0) rotate(360deg)
}
</style>