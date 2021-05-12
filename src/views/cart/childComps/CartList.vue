<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :product="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "components/common/scroll/Scroll"
import CartListItem from "./CartListItem";
import CartBottomBar from "./CartBottomBar";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
    CartBottomBar
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    //对修改了dom要进行刷新，不然还是原来的高度，没法滑动
    this.$refs.scroll.refresh
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
