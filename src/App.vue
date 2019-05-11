<template>
  <div id="app">
    <!-- 头部 -->
    <Header />
    <!-- 中间 -->
    <div class="tab border-1px">
      <div class="tab_item">
        <router-link :to="{name:'Goods'}">商品</router-link>
      </div>
      <div class="tab_item">
        <router-link :to="{name:'Seller'}">评论</router-link>
      </div>
      <div class="tab_item">
        <router-link :to="{name:'Ratings'}">商家</router-link>
      </div>
    </div>
    <!-- 底部 -->
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="stylus" scoped>
.tab
 display: flex
 width: 100%
 height: 40px
 line-height: 40px
 border-1px(rgba(7, 17, 27, .1))
 .tab_item
   flex: 1
   text-align: center
   font-size: 14px
   & > a
     display:block
     color:rgb(77, 85, 93)
     &.active
       color:rgb(240, 20, 20)
</style>
