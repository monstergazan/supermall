<template>
<div class="tab-control">
  <div v-for="(item,index) in titles"
       class="tab-item"
       @click="itemClick(index)"
       :class="{active: index===currentIndex}">
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles:{
      type: Array,
      default(){
        return [];
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index
      this.$emit('tabClick',index)
      //向父组件，home发射事件
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
  }
  .tab-item {
    flex: 1;
  }
  .tab-item span{
    padding: 5px;
  }
  /*动态绑定class*/
  .active {
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
