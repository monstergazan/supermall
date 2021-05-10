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
    data() {
      return {
        scroll: null,
        probeType: {
          type: Number,
          default: 0
        },
        pullUpLoad: {
          type: Boolean,
          default: false
        }
      }
    },
    mounted() {
      //1。创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM: true,
        //2.0方法需要加这个才可以滚动，我日
        click: true,
        mouseWheel: true,
        pullUpLoad: this.pullUpLoad,
        //不建议写死，因为有些地方是不要求上拉加载更多的，比如profile界面
        probeType: this.probeType
      })
      // this.scroll.scrollTo(0, 0)
      //2、监听滚动位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
      // 3.监听上拉事件
      this.scroll.on('pullingUp',() => {
        // console.log('上拉加载更多');
        this.$emit('pullingUp')
      })
    },
    methods:{
      scrollTo(y,x,time=300){
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
