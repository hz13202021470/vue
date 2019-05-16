<template>
 <div class="seller_wrapper" ref="seller_wrapper">
	 	<div class="seller_content" >
			 <div class="name_wrapper">
				 <div class="name_left">
					 	<h1 class="name">粥品s</h1>
					 	<div class="star_wrapper">
							 <div class="start">
							 <span class="start_item on"></span>
							 <span class="start_item on"></span>
							 <span class="start_item on"></span>
							 <span class="start_item on"></span>
							 <span class="start_item on"></span>
						 </div>
						 <div class="count">
							 <div class="rating_count">24</div>
							 <div class="sell_count">91</div>
						 </div>
						 </div>
				 </div>
				 <div class="name_right">
					 <span class="icon-favorite"></span>
					 <span class="text">收藏</span>
				 </div>
			 </div>
       <div class="time_wrapper">
         <div class="time_left">
					 	<p>起送价</p>
						 <h1>20
						 <span>元</span>
						 </h1>
				 </div>
         <div class="time_main">
					 <p>商家配送</p>
					 <h1>4
					 <span>元</span>
					 </h1>
				 </div>
         <div class="time_right">
					 <p>平均配送时间</p>
					 <h1>44
					 <span>分钟</span>
					 </h1>
				 </div>
       </div>
			 <Split></Split>
			 <div class="notice_wrapper">
				 <h1 class="title">公告与活动</h1>
				 <p class="text">
					 我是公告公告我是公告公告我是公告公告我是公告公告我是公告公告我是公告公告
					 我是公告公告我是公告公告我是公告公告我是公告公告我是公告公告我是公告公告
				 </p>
				 <ul>
					 <li class="notice_item">
						 <span class="notice_icon decrease"></span>
						 <span class="notice_text">啦啦</span>
					 </li>
					  <li class="notice_item">
						 <span class="notice_icon decrease"></span>
						 <span class="notice_text">啦啦</span>
					 </li> 
					 <li class="notice_item">
						 <span class="notice_icon decrease"></span>
						 <span class="notice_text">啦啦</span>
					 </li> 
					 <li class="notice_item">
						 <span class="notice_icon decrease"></span>
						 <span class="notice_text">啦啦</span>
					 </li> 
					 	<li class="notice_item">
						 <span class="notice_icon decrease"></span>
						 <span class="notice_text">啦啦</span>
					 </li>
					 	<li class="notice_item">
						 <span class="notice_icon decrease"></span>
						 <span class="notice_text">啦啦</span>
					 </li>
					 					 	<li class="notice_item">
						 <span class="notice_icon decrease"></span>
						 <span class="notice_text">啦啦</span>
					 </li>
					 					 	<li class="notice_item">
						 <span class="notice_icon decrease"></span>
						 <span class="notice_text">啦啦</span>
					 </li>
					 		<li class="notice_item">
						 <span class="notice_icon decrease"></span>
						 <span class="notice_text">啦啦</span>
					 </li>
				 </ul>
			 </div>
			 <Split></Split>
			 <div class="condition_wrapper">
				 <h1 class="title">商家实景</h1>
				 <ul class="condition_pice">
					 <li class="pice_item">
						 <img src="http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180" alt="" class="pice">
					 </li>
					 	 <li class="pice_item">
						 <img src="http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180" alt="" class="pice">
					 </li>
					 	 <li class="pice_item">
						 <img src="http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180" alt="" class="pice">
					 </li>
				 </ul>
			 </div>
			 <Split></Split>
			 <div class="message_wrapper">
				 <h1 class="title">商家信息</h1>
				 <ul>
					 <li class="message_item">我是商家信息</li>
					 <li class="message_item">我是商家信息</li>
					 <li class="message_item">我是商家信息</li>
					 <li class="message_item">我是商家信息</li>
					 <li class="message_item">我是商家信息</li>
					 <li class="message_item">我是商家信息</li>
					 <li class="message_item">我是商家信息</li>
				 </ul>
			 </div>
		 </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll'
import Split from '../Split/Split'

let decrease = 0
let discount =1
let special =2
let invoice =3
let guarantee =4
	export default {
		data() {
			return {}
		},
		methods:{
			_initSellerScroll() {
				this.sellerScroll = new BScroll(this.$refs.seller_wrapper, {
					click:true
				})
			}
		},
		mounted() {
			this._initSellerScroll()
		},
		components:{
			Split
		}
	}

</script>

<style lang='stylus' scoped>
		.seller_wrapper
			position:absolute
			top:174px
			bottom:0
			overflow:hidden
			.seller_content
				.name_wrapper
					display :flex
					justify-content: space-between
					padding:18px 18px 0 18px
					border-1px(rgba(7,17,27,0.1))
					.name_left
						.name
							font-size:14px
							color:rgb(7,17,27)
							line-height:14px
						.star_wrapper
								padding:8px 0 18px 0
								display:flex
							.start
								padding-right:8px
								.start_item
									display:inline-block
									width:15px
									height :15px
									background-size:15px 15px
									&.on
										bg-image("star36_on")
									&.off
										bg-image("star36_off")
							.count
								display:flex
								.rating_count
									padding-right:12px
					.name_right
						font-size:0px
						.icon-favorite
							font-size:24px
							line-height:24px
							color:#ccc
						.text
							display:block
							font-size:10px
							line-height :10px
							color:rgb(7,85,93)
							padding-top:4px
				.time_wrapper
					padding:18px 
					display:flex
					justify-content:space-between
					color:rgb(147,153,159)
					line-height :10px
					font-size:10px
					.time_left
						p
							margin-bottom:4px
						h1
							font-size:24px
							line-height :24px
							color:rgb(7,17,27)
							font-weight :200
							span 
								font-size:14px
					.time_main
						p
							margin-bottom:4px
						h1
							font-size:24px
							line-height :24px
							color:rgb(7,17,27)
							font-weight :200
							span 
								font-size:14px
					.time_right
						p
							margin-bottom:4px
						h1
							font-size:24px
							line-height :24px
							color:rgb(7,17,27)
							font-weight :200
							span 
								font-size:14px
				.notice_wrapper
					margin:18px 18px 0 18px
					.title
						font-size:14px
						color:rgb(7,17,27)
						line-height:14px
						margin-bottom:8px
					.text
						font-size:12px
						font-weight :200
						color:rgb(240,20,20)
						line-height:24px
						padding:0 12px
						padding-bottom:16px
					.notice_item
						padding:16px 12px
						border-1pxT(rgba(7,17,27,0.1))
						font-size:0
						.notice_icon
							display:inline-block
							width:16px 
							height:16px
							font-size:16px
							background-size:16px 16px
							vertical-align :bottom
							&.decrease
										bg-image("decrease_3")
							&.discount
										bg-image("discount_3")
							&.special
										bg-image("special_3")
							&.invoice
										bg-image("invoice_3")
							&.guarantee
										bg-image("guarantee_3")
						.notice_text
							font-size:12px
							margin-left:6px
				.condition_wrapper
					padding:18px 0 18px 12px
					.title
						font-size:14px
						color:rgb(7,17,27)
						line-height:14px
					.condition_pice
						margin-top:12px
						display:flex
						.pice_item
							margin-left:6px
							.pice
								width:120px
								height :90px
				.message_wrapper
					margin:18px 0 18px 18px
					.title
						font-size:14px
						color:rgb(7,17,27)
						line-height:14px
						margin-bottom:8px
					.message_item
						font-size:12px
						font-weight:200
						border-1pxT(rgba(7,17,27,0.1))
						color:rgb(7,17,27)
						line-height:16px
						padding:16px 12px
					
</style>
