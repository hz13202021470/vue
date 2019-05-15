<template>
<div class="header">
	<!-- 商家信息 -->
  <div class="content_wrapper">
    <img :src="shopInfo.avatar" alt="" class="content_img">
    <div class="content">
			<p class="name">
				<span class="brand"></span>
				<span>{{shopInfo.name}}</span>
			</p>
    	<p class="time">{{shopInfo.description}} / {{shopInfo.deliveryTime}}分钟送达</p>
			<p class="concessional">
				<span class="icon" v-if="shopInfo.supports" :class="classMap[shopInfo.supports[0].type]"></span>
				<span class="text" v-if="shopInfo.supports">{{ shopInfo.supports[0].description }}</span>
			</p>
		</div>
   <div class="more">
		  <span class="" v-if="shopInfo.supports" @click="showDetail">{{shopInfo.supports.length}}个</span>
			<span class="icon-keyboard_arrow_right"></span>
	 </div>
  </div>
	<!-- 公告 -->
  <div class="bulletin">
		<img src="../../../resource/img/bulletin@2x.png" alt="">
		<span class="bulletin_text">{{shopInfo.bulletin}}</span>
		<i class="icon-keyboard_arrow_right"></i>
  </div>
	<!-- 背景模糊图 -->
  <div class="background">
    <img :src="shopInfo.avatar" width="100%" height="100%" alt="">
  </div>
	<!-- 详细页 -->
<transition name="detailFade">
  <div class="detail" v-show="isDetail" >
		<div class="detaul_main">
        <div class="detail_header">
					 <h1 class="name">粥品香坊（大运村）</h1>
						<!-- 五星 -->
					<div class="star">
						<span class="start_item on"></span>
						<span class="start_item on"></span>
						<span class="start_item on"></span>
						<span class="start_item on"></span>
						<span class="start_item off"></span>
					</div>
				</div>
				<!-- 优惠信息 -->
				<div class="title">
						<div class="title_header">
						<span class="line"></span>
						<span class="main">优惠信息</span>
						<span class="line"></span>
						</div>
						<!-- 优惠项目 -->
								<ul class="supports">
									<li class="supports_item" v-for="(item,index) in shopInfo.supports" :key="index">
										<span class="supports_ico" :class="discountClass[index]"></span>
										<span class="supports_text">{{item.description}}</span>
									</li>
								</ul>
				</div>
				<div class="notice">
						<div class="title_header">
							<span class="line"></span>
							<span class="main">商家公告</span>
							<span class="line"></span>
						</div>
						<div class="text">
             {{shopInfo.bulletin}}
						</div>
				</div>

		</div>
		<div class="detail_close">
				 <span class="icon-close" @click="closeDetail"></span>
		</div>
	</div>
</transition>
</div>
</template>

<script>
 export default {
	data() {
		return {
			shopInfo: {},
			isDetail: false, //公告
			discountInfo:[],//折扣信息
			discountClass:[] //折扣图标
		}
	},
	methods: {
		//获取商品信息
		getShopInfo() {
			this.$http('/api/seller')
			.then((res) => {
				let data = res.data
				if (data.errno === 0) {
					this.shopInfo = data.seller
          this.discountInfo = data.seller.supports
          this.$store.state.shopInfo = data.seller //把请求获取到的数据放在vuex里面，其他页面也要用

          localStorage.setItem('minPrice',data.seller.minPrice)
          localStorage.setItem('deliveryPrice',data.seller.deliveryPrice)
				}
			}).catch((err) => {
				console.log(err)
			})
		},

		// 弹出详细页
		showDetail(){
			this.isDetail = true
			
		// 获取折扣图标
		this.getClass()
		},
		getClass() {
			// this.getDiscount()
			 let  discountIcon = this.discountInfo
			 for	(let i =0; i < discountIcon.length;  i++) {
					let  iconNum = discountIcon[i].type
					 	 switch(iconNum)
				 				{
									 case 0:
									 this.discountClass .push('decrease') 
									 break
									 case 1:
									 this.discountClass .push('discount') 
									 break
									 case 2:
									 this.discountClass .push('special') 
									 break
									 case 3:
									 this.discountClass .push('invoice') 
									 break
									 case 4:
									 this.discountClass .push('guarantee') 
									 break
								 }
		}
		},
		//关闭详细页
		closeDetail() {
			this.isDetail = false
		}
	},
	created() {
		this.getShopInfo()
		this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
	},
	mounted() {
	}
 }
</script>

<style lang="stylus" scoped>
	// 动画


		// background-color: rgba(7, 17, 27, 0)

// 公共信息公共样式
	.title_header
		display: flex
		align-items:center 
		justify-content :space-around
		.line
			height: 2px
			background-color: rgba(255, 255, 255, .2)
			flex:1
		.main
			padding: 0 12px
			font-weight: 700
			font-size: 14px
	// 头部主体
	.header
		position: relative
		background-color: rgba(7, 17, 27, .5)
		color: rgb(255, 255, 255)
		overflow: hidden
		// 商家信息
		.content_wrapper
			font-size: 0
			padding-top: 24px
			padding-left: 24px
			padding-bottom: 18px
			display: flex
			justify-content: space-around
			.content_img
				width: 64px
				height: 64px
			.content
				margin-top: 2px
				.name
					margin-bottom: 8px
					span
						font-size: 16px
						font-weight:bold
						line-height: 18px
					.brand
						display:inline-block
						width: 30px
						height: 18px
						padding-top: 2px
						padding-right: 6px
						margin-bottom: -3px
						bg-image("brand")
						background-size: 30px 18px
						background-repeat: no-repeat
						vertical-align: top
				.time
					font-size: 12px
					font-weight: 200
					line-height: 12px
					margin-bottom: 10px
				.concessional
					margin-bottom: 2px
					.icon
						vertical-align: top
						display: inline-block
						width: 12px
						height: 12px
						margin-right: 4px
						background-size: 12px 12px
						background-repeat: no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
					.text
						font-size: 10px
						font-weight: 200
						line-height: 12px
			.more
				position: relative
				height: 24px
				padding: 0 20px
				text-align: center
				line-height: 25px
				font-size: 10px
				background-color: rgba(0, 0, 0, .2)
				border-radius: 14px
				align-self: flex-end
				margin-right: 6px
				margin-bottom: -4px
				.icon-keyboard_arrow_right
						position: absolute 
						top: 5px
						right : 4px
						font-size: 15px
		// 公告
		.bulletin
			height: 28px
			line-height: 29px
			background-color: rgba(7, 17, 27, .2)
			position: relative
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding: 0 16px
			img
				display: inline-block
				width: 22px
				height: 12px
			.bulletin_text
				font-size: 10px
				vertical-align: top
				font-weight: 100
			.icon-keyboard_arrow_right
				position: absolute
				right: 5px
				top: 7px
		// 背景模糊图
    .background
			width :	100%
			height : 100%
			position: absolute 
			top: 0
			left: 0
			z-index : -1
			filter : blur(10px)
		// 详细信息
		.detail
			position: fixed
			top: 0
			left : 0
			width : 100%
			height : 100%
			background-color : rgba(7, 17, 27,  .8)
			z-index: 1000
			opacity :1
			overflow: auto
			&.detailFade-enter-active, &.detailFade-leave-active
					transition: all 0.5s	
			&.detailFade-enter, &.detailFade-leave-to
					opacity: 0
			.detaul_main
				margin: 64px 36px 32px 36px
				color: rgb(255, 255, 255)
				.detail_header
					.name
						font-size: 16px
						font-weight : 700
						line-height : 15px
						text-align:center
					.star
						margin-top: 16px
						display: flex
						justify-content : center
						padding: 2px 0
						.start_item
							display:inline-block
							width:20px
							height: 20px
							background-size: 20px 20px
							background-repeat: no-repeat
							margin-right: 21px
							&.on
									bg-image("star48_on")
							&.off
								bg-image("star48_off")
				.title
					margin-top: 28px
					font-size: 14px
					.supports
						margin-top:24px
						margin-left : 12px
						.supports_item
							margin:12px 0
							font-size:0
							.supports_ico
								display : inline-block
								width:16px
								height : 16px
								background-size:16px 16px
								background-repeat: no-repeat
								vertical-align:bottom
								&.decrease
									bg-image("decrease_2")
								&.discount
									bg-image('discount_2')
								&.guarantee
									bg-image('guarantee_2')
								&.invoice
									bg-image('invoice_2')
								&.special
									bg-image('special_2')
							.supports_text
								font-size: 12px
								font-weight: 200
								line-height : 14px
								margin-left: 6px
				.notice
					margin-top: 28px
					.text
						margin: 24px 12px 0 12px
						font-size: 12px
						font-weight: 200
						line-height : 24px
		// 关闭按钮
		.detail_close
			font-size: 32px
			color:rgba(255, 255, 255, .5)
			margin-top:70px
		  .icon-close
				display: block
				width:80px
				height: 80px
				margin: 0 auto
				text-align:center
</style>
