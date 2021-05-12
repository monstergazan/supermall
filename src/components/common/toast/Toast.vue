<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type: String,
        default: ''
      },
      show:{
        type: Boolean,
        default: false
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .toast{
    width: 200px;
    text-align: center;
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 10px;
    transform: translate(-50%,-50%);
    color: #fff;
    background-color: rgba(0,0,0,.8)
  }
</style>
