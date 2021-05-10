<template>
  <div id="detail">
    <detail-navbar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <DetailShopInfo :shop="shop"></DetailShopInfo>
  </div>
</template>

<script>
  import DetailNavbar from "./childComps/DetailNavbar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import {getDetail, Goods,Shop} from 'network/detail';


  export default {
    components: {
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    name: "Detail",
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}
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
      })
    }
  }
</script>

<style scoped>

</style>
