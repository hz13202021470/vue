<template>
 <div class="rating" ref="ratings">
	 	<div class="rating_wrapper">
				<div class="rating_hreader">
					<div class="header_left">
						<h1 class="title">3.9</h1>
						<h2 class="score">综合评分</h2>
						<p class="rankRate">高于周边商家69.2%</p>
					</div>
					<div class="header_right">
						<div class="serviceScore_wrapper">
							<span class="title">服务态度</span>
							<div class="star">
								<span class="star_item on"></span>
								<span class="star_item on"></span>
								<span class="star_item on"></span>
								<span class="star_item on"></span>
								<span class="star_item off"></span>
							</div>
							<span class="score">4.1</span>
						</div>
						<div class="foodScore_wrapper">
							<span class="title">食物评价</span>
							<div class="star">
								<span class="star_item on"></span>
								<span class="star_item on"></span>
								<span class="star_item on"></span>
								<span class="star_item on"></span>
								<span class="star_item off"></span>
							</div>
							<span class="score">4.2</span>
						</div>
						<div class="deliveryTime_wrapper">
							<span class="title">送达时间</span>
							<span class="delivery"> 30分钟</span>
						</div>
					</div>
				</div>
				<Split></Split>
				<RatingSelect :select-type="selectType" :only-content="onlyContent" :ratings="ratingArr" v-on:content-toggle ="contToggle"></RatingSelect>
				<div class="rating_list" >
						<div class="rating_item" v-for="(rating,i) in ratingArr" :key="i" v-show="showNeed(rating.rateType, rating.text)">
									<div class="header">
										<div class="avatar">
										<img :src="rating.avatar" alt="">
										</div>
										<div class="content">
											<div class="name">
												<h1>{{rating.username}}</h1>
												<div class="star_wrapper">
													<div class="star">
														<span class="star_item on" v-for="(item,i) in Math.round(rating.score)" :key="i"></span>
														<span v-for="(item,index) in (5-rating.score)" :key="index + '1'" class="star_item off"></span>
													</div>
													<span class="arrival_time" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
														<span class="date" >
													{{rating.rateTime}}
													</span>
												</div>
											</div>
											<div class="text">{{rating.text}}</div>
											<div class="recommend">
														<span class="icon " :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
														<span  class="recommend_item" v-if="rating.recommend && rating.recommend.length" v-for="(recon,i) in rating.recommend" :key="i">{{recon}}</span>
												</div>
									  </div>
									</div>
					</div>
			</div>
		 </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll'
import Split from '../Split/Split'
import RatingSelect from '../RatingSelect/RatingSelect'
const POSITIVE = 0  //肯定评价
const NEGATIVE = 1 //否定评价
const ALL = 2 //所有评价
export default {
				data () {
					return {
						ratingArr:[],//评论对象
						selectType:ALL, //所有评价
						onlyContent:false, //是否只显示只有评论的内容
					}
				},
				computed:{

				},
				methods:{
					  //父组件方法，当ratingsSelect组件的 select 方法执行，会执行这个方法
					contToggle(event,type) {
						this.onlyContent = event
						this.selectType = type
					},
					getRatings() {
						this.$http('/api/ratings').then((res) => {
							let data = res.data
							if (data.errno === 0) {
								this.ratingArr = data.ratings;
								this.$nextTick(() => {
									if(!this.ratingsScroll) {
                          this.ratingsScroll = new BScroll(this.$refs.ratings, {
                            click:true
                        })
										}else {
												  this.ratingsScroll.refresh()
										}
								})
							}
						})
					},
					showNeed(type,text) {
						if (this.onlyContent && !text) { return false}
						if(this.selectType === ALL) {
							return true
							} else {
								return type === this.selectType
							}		
					}
				},
				mounted(){
						this.getRatings()
				},
				components:{
					Split,
					RatingSelect
				}
}
</script>

<style lang='stylus' scoped>
		.rating
			width:100%
			overflow:hidden
			position:absolute
			top:174px
			bottom:0
			.rating_wrapper
				width:100%
				.rating_hreader
					padding:18px 0
					display :flex
					justify-content: center
					.header_left
						text-align :center
						border-right:1px solid  #B7BBBF
						padding-right:25px
						.title
							font-size:24px
							color:rgb(255,153,0)
							line-height:28px
							margin-bottom:6px
						.score
							font-size:12px
							color:#2C3238
							line-height :12px
							margin-bottom:8px
						.rankRate
							font-size :10px
							line-height:10px
							color:#B7BBBF
					.header_right
						padding-left:24px
						font-size :12px
						color:rgb(7,17,27)
						line-height :18px
						.serviceScore_wrapper
								display :flex
							.title
								margin-bottom:8px
							.star
								margin: 0 4px 0 5px;
								display :flex
								.star_item
									background-size:15px 15px
									width:15px
									height :15px
									background-repeat :no-repeat
									padding-right:5px
									&.on
										bg-image("star36_on")
									&.off
										bg-image("star36_off")
										padding-right:0
							.score
									font-size:12px
									color:rgb(255,153,0)
									line-height:18px
						.foodScore_wrapper
							font-size :12px
							color:rgb(7,17,27)
							line-height :18px
							display :flex
							.title
								margin-bottom:8px
							.star
								margin: 0 4px 0 5px;
								display :flex
								.star_item
									background-size:15px 15px
									width:15px
									height :15px
									background-repeat :no-repeat
									padding-right:5px
									&.on
										bg-image("star36_on")
									&.off
										bg-image("star36_off")
										padding-right:0
						.deliveryTime_wrapper
							font-size:0
							.title
								font-size:12px
							.delivery					
								font-size:12px
								color:rgb(147,153,159)
								margin-left:5px
				.rating_list
					padding:0 18px 0 18px
					.rating_item
						padding-top:18px
						.header
							display:flex
							justify-content: space-between
							.avatar
								width:28px
								height:28px
								img 
										height:100%
										border-radius:50%
							.content
									margin-left:12px
									width:100%
									.name
										font-size:10px
										line-height:12px
										color:rgb(7,17,27)
										position:relative
										.star_wrapper
											display:flex
											.star
												margin: 4px 6px 0 0
												display :flex
												.star_item
													background-size:10px 10px
													width:10px
													height :10px
													background-repeat :no-repeat
													padding-right:3px
													&.on
														bg-image("star24_on")
													&.off
														bg-image("star24_off")
														padding-right:0
											.arrival_time
														font-size:10px
														font-weight:200
														color:rgb(147,153,159)
														line-height :18px
											.date
												position:absolute
												right:0
												top:0
												font-size:12px
												color:#C3C6C9
									.text
										font-size:12px
										margin-top:6px
										margin-bottom:6px
										color:rgb(7,17,27)
										line-height:18px
										width:100%
									.recommend
										font-size:0
										.icon
											font-size:13px
											line-height :16px
											vertical-align: sub
											&.icon-thumb_up
													color:rgb(0,160,220)
											&.icon-thumb_down
													color:rgb(147,153,159)
										.recommend_item
											display:inline-block
											text-align :center
											padding:0 6px
											border:1px solid #A4A9AE
											border-radius:2px
											font-size:9px
											color:rgb(147,153,159)
											line-height:16px
											margin: 2px 8px
</style>
