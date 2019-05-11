import Vue from 'vue'
import Router from 'vue-router'
import Seller from '../components/Seller/Seller.vue'
import Goods from '../components/Goods/Goods.vue'
import Ratings from '../components/Ratings/Ratings.vue'
Vue.use(Router)
export default new Router({
	linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [
     {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    }
  ]
})
