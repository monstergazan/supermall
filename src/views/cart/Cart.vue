<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import {mapGetters} from 'vuex'
  import CartBottomBar from "./childComps/CartBottomBar";
  export default {
    name: "Cart",
    components: {
      CartBottomBar,
      NavBar,
      CartList
    },
    computed: {
      //将getters中的方法通过mapgetters映射过来
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    weight: 700
  }
</style>
