import Vue from 'vue';
import Vuex from 'vuex'
import getters from './getters'
//1、安装插件
Vue.use(Vuex)
const store = new Vuex.Store({
  getters,
  state: {
    cartList:[]
  },
  mutations: {
    //不要直接在mutation中直接操作state，不便于追踪
    addToCart(state,payload) {
      payload.checked = true
      state.cartList.push(payload)
    },
    addCounter(state,payload){
      payload.count++
    }
  },
  actions: {
    addCart(context,payload){
      return new Promise((resolve,reject)=>{
        //1.查找之前数组是否有该商品
        let oldProduct = context.state.cartList.find(item=>item.iid===payload.iid)
        //2。判断oldProduct
        if(oldProduct){
          context.commit('addCounter',oldProduct)
          resolve('当前商品数量+1')
        }else{
          payload.count = 1
          context.commit('addToCart',payload)
          resolve('添加了新的商品')
        }
      })

    }
  }
})
//3、挂载vue实例上
export default store
