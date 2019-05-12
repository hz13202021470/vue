<template>
 <div class="goods">
	 	<div class="menu_wrapper" ref="menu_wrapper">
			 <ul class="menu_ul">
				 <li class="menu_li" v-for= "(item, index) in goods" :key="index" :class="{'current': currentIndex == index}" @click = 'selectMenu(index)'>
					 <i v-show="item.type>0" class="icon" :class="classMap[goods[index].type]"></i>
					 <span class="text">{{item.name}}</span>
					 </li>
			 </ul>
		 </div>
		<div class="good_wrapper" ref="good_wrapper">
			 		<ul>
						 <li class="food_list food_list_hook" v-for="(item,index) in goods" :key="index">
							 <h1 class="title">{{item.name}}</h1>
							 <ul>
								 	<li class="food_item" v-for="(food,index) in item.foods" :key="index" @click="selectFood(food,$event)">
										 <div class="icon">
											 <img :src="food.icon" alt="">
										 </div>
										 <div class="content">
											 <h2 class="name">{{food.name}}</h2>
											 <p class="desc">
												{{food.description}}
											 </p>
											 <div class="extra">
												 <span>月售{{food.sellCount}}份</span>
												 <span>好评率{{food.rating}}%</span>
											 </div>
											 <div class="price">
												 <span class="nowprice">￥{{food.price}}</span>
												 <span class="oldprice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
											 </div>
											<div class="cart_button">
												 <CarButton :food="food"  ></CarButton>
											 </div>
										 </div>
									 </li>
							 </ul>
						 </li>
					 </ul>
		 </div>
		<ShopCar :selectFoods="selectFoods" ></ShopCar>
 		<Food :food="selectedFood" ref="food"></Food>
 </div>
</template>

<script>
		import BScroll from 'better-scroll'
		import ShopCar from '../ShopCart/ShopCart'
		import CarButton from '../CarButton/CarButton'
		import Food from '../Food/Food'
		export default {
				data() {
					return	{
						goods:[],
						classMap:['decrease', 'discount', 'guarantee', 'invoice', 'special'],
						listHeight :[],   //右侧食物列表高度数组
						scrollY: 0 ,    //左侧菜单索引
						selectedFood:{}, //已选择的食物对象
					}
				},
				computed: {
					//往购物车添加的食物列表
       		selectFoods() {
						let foods = []
						this.goods.forEach((good) => {
							good.foods.forEach((food) => {
								if (food.count) {
                  foods.push(food)
								}
							})
            })
						return foods
					},
					//当右侧滑动到一定高度，左侧菜单会添加相应的样式
					currentIndex () {
						for (let i = 0; i < this.listHeight.length; i++) {
							let height1 = this.listHeight[i]
							let height2 = this.listHeight[i+1]

							if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
								    	return i
							    }
							 }
							 	return 0
					}
				},
				methods:{
					//点击某一项食物，跳转到详细页
					selectFood(food,event) {
							if (!event._constructed) return
							this.selectedFood = food

							this.$refs.food.show()
					},
					//选择菜单
					selectMenu(index) {
					 let foodsList = this.$refs.good_wrapper.getElementsByClassName('food_list_hook')
					 let el = foodsList[index]
					 this.goodsScrooll.scrollToElement(el, 300)
          },
					getGoods() {
						this.$http('api/goods').then((res) => {
								let  data = res.data
								if (data.errno === 0) {
									this.goods = data.goods
									this.$nextTick(() => {
											this._initScroll()
											this._calculateHeight()
                  })
								}
						}).catch((err) => {
								console.log(err)
						})
					},
					// 初始化better-scroll
					_initScroll() {
						this.menuScroll = new BScroll(this.$refs.menu_wrapper, {
							click:true
						})

						this.goodsScrooll= new BScroll('.good_wrapper', {
							probeType: 3,
							click:true
						})

						this.goodsScrooll.on('scroll', (pos) => {
								this.scrollY = Math.abs(Math.round(pos.y))
						})
					},
					//计算右侧高度
					_calculateHeight() {
						let foodsList = this.$refs.good_wrapper.getElementsByClassName('food_list_hook')
						let height = 0;
						this.listHeight.push(height)
						for (let i = 0; i < foodsList.length; i++) {
								let item = foodsList[i]
								height += item.clientHeight
								this.listHeight.push(height)
						}
					},
					//父组件的自定义方法，用来展开已点击 的食物项

				},
				created(){
					this.getGoods()
				},
				components:{
					ShopCar,
          CarButton,
          Food
				}
		}
</script>

<style lang='stylus'>
		.goods
			width: 100%
			display :flex
			position:absolute
			top:174px
			bottom: 46px
			overflow :hidden
			.menu_wrapper
				flex: 0 0  80px
				height: 100%
				.menu_ul
					width:100%
					background-color: #f3f5f7
				  .menu_li
						font-size: 0
						font-weight: 200
						height: 59px
						margin: 0 auto
						padding-top:16px
						line-height : 14px
						text-align: center
						box-sizing: border-box
						border-bottom:rgba(7, 17, 27, 0.1) solid 1px
						&.current
							font-weight:700
							background:#fff
							line-height :14px
							border:none				
						.icon
							display : inline-block
							width:12px
							height : 12px
							background-size:12px 12px
							background-repeat: no-repeat
							vertical-align :top
							&.decrease
								bg-image("decrease_3")
							&.discount
								bg-image('discount_3')
							&.guarantee
								bg-image('guarantee_3')
							&.invoice
								bg-image('invoice_3')
							&.special
								bg-image('special_3')
						.text 
							flex :1
							font-size:12px
			.good_wrapper
					height : 100%
					width :100%
					.food_list
						font-size:12px
						width:100%
						.title
							background-color:#f3f5f7
							color:rgb(147, 153, 159)
							line-height :26px
							height : 26px
							border-left:1px solid #d9dde1
							padding-left:14px
						.food_item
							position:relative 
							margin: 18px 18px 0 18px
							padding-bottom : 18px
							display :flex
							display: -webkit-box
							border-bottom: 1px solid rgba(7, 17, 27, .1)
							color:rgb(7, 17, 27)
							.icon
								 img 
									width:56px
									height :56px
							.content
								display:inline-block
								margin-left: 10px
								.name
									font-size: 14px
									color:#07111b
									line-height :14px
									margin-top:2px
								.desc
									margin-top: 2px
									padding-right:50px
									font-size 10px
									line-height : 15px
									color:rgb(147, 153, 159)
									word-break:normal
								.extra
									margin-top:8px
									font-size:0
									color:rgb(147, 153, 159)
									span
										font-size:10px
										&:first-child
												margin-right:12px
								.price
									margin-top:8px
									font-size:0
									font-weight:700
									.nowprice
										color:#F24B4B
										line-height :24px
										font-size 14px
										margin-right :8px
									.oldprice
										color:rgb(127,153,159)
										line-height :24px
										font-size:10px
										text-decoration :line-through
								.cart_button
									position:absolute
									bottom:12px
									right:0
</style>
