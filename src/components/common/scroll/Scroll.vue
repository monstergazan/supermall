<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data(){
      return {
        scroll: null,
        probeType:{
          type: Number,
          default: 0
        }
      }
    },
    mounted() {
      //1。创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        observeDOM: true,
        //2.0方法需要加这个才可以滚动，我日
        click: true,
        mouseWheel: true,
        pullUpLoad: true,
        probeType: this.probeType
      })
      // this.scroll.scrollTo(0, 0)
      this.scroll.on('scroll',(position)=>{
        // console.log(position);
        this.$emit('scroll',position)
      })
    },
    methods:{
      scrollTo(y,x,time=300){
        this.scroll.scrollTo(x,y,time)
      }
    }
  }
</script>

<style scoped>

</style>
