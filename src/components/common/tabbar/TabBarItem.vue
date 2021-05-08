<template>
  <div class="tar-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
<!--    <img src="../../assets/img/tabbar/home.svg">-->
<!--    <div>首页</div>-->
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    //这里的path是通过App.vue里面的标签传过来的
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data(){
    return{
    }
  },
  computed: {
    isActive(){
      return this.$route.path === this.path
      //这里是比较点击的路径和当前的路径是否一致，主要是为了点击事件的button高亮
      // return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
    //这里主要是封装字体的颜色，默认activeColor设置为红色，这样在app.vue就可以不指定传过来的颜色
    //如果想要改变颜色，直接在app。vue改就行，不需要进到组件源码改，因为组件是给别人用的
  },
  methods: {
    itemClick(){
      this.$router.replace(this.path)
      //设置点击事件跳转路由
    }
  }
}
</script>
<style scoped>
  .tar-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tar-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
