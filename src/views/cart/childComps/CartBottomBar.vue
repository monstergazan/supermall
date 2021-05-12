<template>
  <div class="bottom-bar">
    <div class="check-content" @click="allChecked">
      <check-button class="check-button" :is-checked="isSelectedAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="cal">
      去计算({{length}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    methods: {
      allChecked() {
        if(this.isSelectedAll){
          this.$store.state.cartList.forEach(item=>item.checked=false)
        }else{
          this.$store.state.cartList.forEach(item=>item.checked=true)
        }
      }
    },
    computed: {
      totalPrice(){
        return '$' + this.$store.state.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      length(){
        return this.$store.state.cartList.filter(item=>{
          return item.checked
        }).length
      },
      isSelectedAll(){
        let checked = this.$store.state.cartList.filter(item=>{
          return item.checked
        }).length
        if(checked===0||checked!==this.$store.state.cartList.length){
          return false
        }else{
          return true
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    bottom: 0;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;

  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    width: 21px;
    height: 21px;
    line-height: 21px;
    margin-right: 5px;
  }
  .price{
    margin-left: 40px;
    flex: 1;
  }
  .cal{
    width: 90px;
    background-color: red;
    text-align: center;
  }
</style>
