import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      minPrice: localStorage.getItem('minPrice')||0 , //最低起送费
      deliveryPrice: localStorage.getItem('deliveryPrice') || 0,//配送费
      // selectFood: []
  },
  getters: {
    //总价格
    // totalPrice(state) {
    //   var total = 0
    //   state.selectFood.forEach((food) => {
    //         total += food.price * food.count
    //   })
    //       return total
    // },
    // //总个数
    // totalCount(state) {
    //   let total = 0
    //   state.selectFood.forEach((food) => {
    //     total += food.count
    //   })
    //   return total
    // }
  },
  mutations: {
    addfood(state, payload) {
      let flag = false
      state.selectFood.some((item) => {
        if (item.name === payload.name) {
          item.count = parseInt(payload.count)
          flag = true
        }
      })
      
      if (!flag) {
        state.selectFood.push(payload)
      }
    },
    removefood(state, payload) {
      state.selectFood.some((food, i) => {
        if (food.name == payload.name) {
          state.selectFood.splice(i, 1)
          return true
         }
      })
    }
  },
  actions: {
    addfood(context,payload) {
      context.commit('addfood', payload)
    }
  }
})
