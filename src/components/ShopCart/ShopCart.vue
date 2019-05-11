<template>
	 <div class="shopcar">
     <div class="content" @click="toggleShow">
        <div class="content_left">
          <div class="logo_wrap">
              <div class="logo" :class="{'lineheight':this.totalCount> 0}">
                <span class="icon-shopping_cart"></span>
              </div>
          </div>
          <div class="num" v-show="this.totalCount > 0">{{this.totalCount}}</div>
          <div class="price" :class="{'lineheight':this.totalPrice> 0}">￥{{this.totalPrice}}元</div>
          <div class="desc">另需配送费￥{{this.$store.state.deliveryPrice}}元</div>
        </div>
        <div class="content_right">
					<div class="pay" :class="{'gotoPay':isPay}">
						{{payDesc}}
					</div>
				</div>
     </div>
    <transition name="shopCart">
     <div class="shopcart_list" v-show="islistShow">
			 	 	<div class="shopcart_wraper">
					  <div class="header">
							<span class="cart">购物车</span>
							<span class="empty">清空</span>
						</div>
            <div class="content" ref="content_wrapper">
								<ul>
									<li class="content_item" v-for="(food,index) in selectFoods" :key="index">
										<div class="content_item_left">
											{{food.name}}
										</div>
										<div class="content_item_right">
											<span class="price">￥{{food.price}}</span>
											<span><CarButton :food="food"></CarButton></span>
										</div>
									</li>
								</ul>
						</div>
				</div>
     </div>
    </transition>
	 </div>
</template>

<script>
		import CarButton from '../CarButton/CarButton'
		import BScroll from 'better-scroll'

	 export default {
		 name:'ShopCar',
		 props:{
			selectFoods:{
				type:Array
			}
		 },
		 data(){
			 return{
				flod:true, //是否显示购物车列表
			 }
		 },
		 computed:{
       //计算支付价格及样式
			 	payDesc () {
					 if (this.totalCount  === 0) {
						 	return `￥${this.$store.state.minPrice} 起送`
					 } else  if (this.totalPrice < this.minPrice){
							 let diff = this.minPrice - this.totalPrice
							 return `还差￥${diff}元起送`
					 }else {
						 return `去结算`
					 }
			},
      //是否显示去结算
			isPay() {
				if (this.totalPrice >= this.$store.state.minPrice) {
					return true
				}else {
					return false
				}
			},
      //计算是否显示购物车列表
			islistShow() {
					let count = this.totalCount
					if(!count) {
						this.flod = true
						return false
					} 
					let show = !this.flod
					return show
			},
			 //总价格
				totalPrice() {
					var total = 0
					this.selectFoods.forEach((food) => {
								total += food.price * food.count
					})
							return total
				},
				  //总个数
				totalCount() {
					let total = 0
					this.selectFoods.forEach((food) => {
						total += food.count
					})
					return total
				},
		 },
		 methods:{
			 //点击购物车隐藏/显示购物车列表
			 	toggleShow() {
						 let count = this.totalCount
				  	if (!count) return
							this.flod = !this.flod
							this.$nextTick(()=> {
									if (!this.foodsScroll) {
											this.foodsScroll  =  new BScroll( this.$refs.content_wrapper,{
													 click:true
					 						})
									}
								})
					 }

				
		 },
		 created(){
		
		 },
		 components:{
			 CarButton
		 }
	 }
</script>

<style lang="stylus" scoped>
  .shopcar
    position:fixed
    left:0
    bottom:0
    z-index:999
    width:100%
    background-color:#141D27
    height:48px
    color:rgba(255, 255, 255, 0.4)
		.content
			display:flex
			height :100%
			.content_left
				flex:1
				display:flex
				font-size:0
        position:relative
				z-index :99
				.logo_wrap
					width:56px
					height :56px
					box-sizing:border-box
					border-radius: 50%
					background-color:#141D27
					position:relative
					top:-10px
					margin: 0 9px 0 18px
					font-size:24px
					text-align:center
					line-height :44px
					padding:6px
					.logo
						background-color:#333
						border-radius:50%
						.icon-shopping_cart
							padding: 0 11px
						&.lineheight 
								background:rgb(0,160,220)
								.icon-shopping_cart
									color:#fff
				.num
					position:absolute
					top:-15px
					left:50px
					text-align:center
					padding: 3px 6px
					background-color:rgb(240,20,20)
					font-size:18px
					width:24px
					line-height :16px
					border-radius:12px
					color:rgb(255, 255, 255)
					box-shadow :0 4px 8px 0 rgb(0,0,0,0.4)
				.price
					font-size:16px
					font-weight:700
					border-right: 1px solid rgba(255, 255, 255, .1)
					padding-right:12px
					margin:12px 0
					line-height :25px
					&.lineheight
							color:#fff
				.desc
					margin:12px 
					line-height :25px
					font-size:12px
			.content_right
				flex: 0 0 105px
				background-color:#2B333B
				.pay
						text-align:center
						line-height :48px
						font-weight:700
						font-size:12px
						&.gotoPay
							background-color:#00b43c
							color:#fff
		.shopcart_list
			position:fixed
			width:100%
			height:100%
			background:rgba(0,0,0,.6)
			bottom:48px
			left :0
			&.shopCart-enter-active, &.shopCart-leave-active
        	transition: opacity   .5s
    	&.shopCart-enter, &.shopCart-leave-to
					opacity:0
			.shopcart_wraper
				max-height:305px
				width:100%
				position :absolute
				bottom:0
				left: 0
				overflow :hidden
				.header
					width:100%
					line-height:40px
					background-color:#f3f5f7
					font-size:14px
					color:rgb(7, 17, 27)
					display :flex
					justify-content :space-between
					border-1px(rgba(7,17,27, .1))
					.cart
						margin-left :18px
						font-weight:200
					.empty
						margin-right :18px
						color:rgb(0,160,220)
				.content
					background-color:#fff
					color:rgb(7,17,27)
					padding:0 18px
					overflow: hidden
					max-height:218px
					ul
						height:100%
						width:100%
						.content_item
							display:flex
							justify-content :space-between
							line-height:24px
							font-size:14px
							box-sizing :border-box
							.content_item_left
								padding: 12px 0
							.content_item_right
								padding: 12px 0 12px 54px
								.price
									vertical-align :top
									padding-right:12px
									padding-left:18px
									font-weight:700
									color:rgb(240,20,20)
</style>

