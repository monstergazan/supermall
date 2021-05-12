<template>
  <div id="detail">
    <detail-navbar ref="nav" class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" probe-type="3">
<!--      <ul>-->
<!--        <li v-for="i in this.$store.state.cartList">{{i}}</li>-->
<!--      </ul>-->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar class="bottom-bar" @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavbar from "./childComps/DetailNavbar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail';
  import Scroll from "components/common/scroll/Scroll";

  export default {
    components: {
      DetailCommentInfo,
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      GoodsList,
      DetailBottomBar
    },
    name: "Detail",
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends:[],
        themeTopYs: [],
        getThemeTopYs: null,
        currentIndex: 0
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求详细数据
      getDetail(this.iid).then(res=>{
        // console.log(res);
        // 封装到data
        const data = res.result

        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // console.log(this.goods);
        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品详情数据
        this.detailInfo = data.detailInfo;
        //5、获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        if(data.rate.cRate!==0){
          this.commentInfo = data.rate.list[0]
        }
        // this.$nextTick(()=>{
        //   this.themeTopYs=[]
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   console.log(this.themeTopYs);
        // })
      })

      //3.请求推荐数据
      getRecommend().then(res=>{
        this.recommends = res.data.list
        // console.log(this.recommends);
      })
      //4.
      // this.getThemeTopYs = debounce(()=>{
      //
      // })
    },
    mounted() {

    },
    updated() {

    },
    methods: {
      imageLoad(){
        this.$refs.scroll.scroll.refresh()
        // this.getThemeTopYs()
          // this.themeTopYs=[]
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE)
          // console.log(this.themeTopYs);
      },
      titleClick(index){
        // console.log(index);
        // console.log(-this.themeTopYs[index]);
        this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        // console.log(1);
        const positionY = -position.y
        //
        // console.log(this.themeTopYs);
        // console.log(position);
        let length = this.themeTopYs.length
        for(let i = 0;i<length-1;i++){
          if(this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

      },
      addToCart(){
        // console.log(111);
        //1.获取购物车展示的信息
        const product={}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice
        product.iid = this.iid
        //2.将商品添加进购物车 用vuex
        // this.$store.cartList.push()
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product).then(res=>{
          console.log(res);
        })

        //3.添加到购物车成功


      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px);
  }
  .detail-nav{
    position: relative;
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    z-index: 9;
    background-color: #fff;
  }
</style>
