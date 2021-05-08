<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature/>
      <tab-control :titles="['流行','新款','精选']"
                   class="tab-control"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
<!--    组件不能直接点击，需要加上native-->
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeature from "./childComps/HomeFeature";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  import {getHomeMultidata,getHomeGoods} from "network/home";
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      HomeFeature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 事件监听方法
       */
      tabClick(index){
        // console.log(index);
        switch (index){
          case 0 :
            this.currentType = 'pop';
            break;
          case 1 :
            this.currentType = 'new';
            break;
          case 2 :
            this.currentType = 'sell';
            break;
        }
      },
      backTopClick(){
        // console.log('aaa');
        //父访问子，一般用ref
        //1、用ref拿到scroll组件，获取到里面的scroll属性，进行处理
        //2、用ref拿到scroll组件，获取到里面的scrollTo方法（已经封装好）
        this.$refs.scroll.scrollTo(0, 0)
        //后面的500是设置500ms内返回动画
      },
      /**
       *判断滚动条到哪里了，到了一定位置显示返回顶部图标
       **/
      contentScroll(position){
        // console.log(position);
        //因为position.y是负值，不加负号永远不会大于1000
        this.isShowBackTop = -(position.y)>1000
      },


      /**
       * 网络请求封装方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      },
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  /*;vh是视口高度*/
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    /*position: sticky;*/
    top: 44px;
    z-index: 9;
  }
  .content {
    /*height: 400px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }
</style>
