<template>
  <div id="detail">
    <detail-navbar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
  import DetailNavbar from "./childComps/DetailNavbar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import {getDetail, Goods} from 'network/detail';


  export default {
    components: {
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo
    },
    name: "Detail",
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {
          type: Object,
          default(){
            return {}
          }
        }
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求详细数据
      getDetail(this.iid).then(res=>{
        console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        console.log(this.goods);
      })
    }
  }
</script>

<style scoped>

</style>
