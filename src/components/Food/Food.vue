<template>
		<transition name="foodDetail">
		<div class="food" v-show="showFlag">
				<div class="wrapper">
								<!-- 头部信息 -->
							<div class="img">
						   <span @click="closeFood" style="position:fixed;top:10px;left:10px;">关闭</span>
									<img :src="food.image" alt="">
							</div>
			
							<div class="header">
								<div class="food_brief">
								<span class="name">{{food.name}}</span>
								<div class="sell">
										<span class="sell_count">月售{{food.sellCount}}份</span>
										<span class="good_percent">好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<div class="price_left">
												<span class="new_price">￥{{food.price}}</span>
												<span class="old_price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
										</div>
										<div class="price_right">
											<span v-show="!food.count || food.count === 0" class="add_first" @click="addFirst($event)">加入购物车</span>
                      <CartButton :food="food" v-show="food.count" ref="shopcart" ></CartButton>
										</div>
									</div>
								</div>
						</div>
			
				  	<Split></Split>
			
			<!-- 食物信息 -->
						<div class="food_info">
							<div class="about">
								商品介绍
							</div>
										<p>{{food.info}}</p>
								</div>
					<Split></Split>
			<!-- 评价 -->
          <div class="food_assessment">
							商品评价
						</div>
            <RatingSelect  :select-type="selectType" :only-content="onlyContent" :desc="desc" 
            :ratings="food.ratings" 
           v-on:content-toggle ="contToggle"></RatingSelect> 
            <div class="ratings_wrapper">
              <ul v-show="food.ratings && food.ratings.length " v-if="food.ratings">
							<li v-for="(item, i) in food.ratings" :key="i" v-show="showNeed(item.rateType, item.text)">
								<div class="ratings_content" >
									<div class="content_left">
										<div class="date">
											<span class="date_left">{{ item.rateTime | getDate(item.rateTime)}}</span>
										</div>
										<div class="text">
											<span class="icon-thumb_up" :class="{good:item.rateType === 0}" v-if="item.rateType === 0"></span>
                      	<span class="icon-thumb_down"  v-else></span>
										  <span class="retings_content_text">{{item.text}}</span>
										</div>
									</div>
									<div class="content_right">
											<span class="user_name">{{item.username}}</span>
											<span class="user_avatar">
												<img :src="item.avatar" alt="">
											</span>
									</div>
								</div>
						  	</li>
						  </ul>
            <div class="no_ratings" v-show="!food.ratings || !food.ratings.length " v-if="food.ratings" >
              暂无评论
            </div>
            </div>
				</div>
		</div>
		</transition>
</template>

<script>
import BScroll from "better-scroll";
import Split from '../Split/Split'
import CartButton from '../CarButton/CarButton'
import RatingSelect from '../RatingSelect/RatingSelect'

const POSITIVE = 0  //肯定评价
const NEGATIVE = 1 //否定评价
const ALL = 2 //所有评价
export default {
  name: "food",
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false, //是否显示食物详细页
      selectType:ALL, //所有评价
      onlyContent:true, //是否只显示只有评论的内容
      desc: {
        all: '全部',
        positive:'推荐',
        negative:'吐槽'
      }
    }
  },
  filters:{
       //转换后台传来 的毫秒数
    getDate:function (d) {
        let time = new Date(d)
        let date = {
          year:time.getFullYear(),
          month:time.getMonth() + 1,
          date:time.getDate(),
          hour:time.getHours(),
          minutes:time.getMinutes(),
          seconds:time.getSeconds()
        }
        let allTime = `${date.year}-${date.month}-${date.date}  ${date.hour}:${date.minutes}:${date.seconds}`
        return allTime
    }
	},
  methods: {
    //控制显示/隐藏食物详细页
    show() {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent  = true
      this.$nextTick(() => {
        if(!this.foodScrooll) {
        this.foodScrooll = new BScroll(".food", {
          click: true
        })
        } else {
          this.foodScrooll.refresh()
        }
      })
    },
    //关闭食物详细页
    closeFood(event) {
      if (!event._constructed) return;
      this.showFlag = false;
    },
    //食物详细页加入购物车
    addFirst() {
      this.$refs.shopcart.add(event)
    },
    //父组件方法，当ratingsSelect组件的 select 方法执行，会执行这个方法
    contToggle(event,type) {
      this.onlyContent = event
      this.selectType = type
    },
    //筛选要显示评论的内容
    showNeed(type, text) {
      if (this.onlyContent && !text) { return false}
      if (this.selectType ===ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  created(){
     
  },
  components:{
    Split,
    CartButton,
    RatingSelect
  }
};
</script>

<style lang="css" scoped>
.food {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  width: 100%;
  background-color: #fff;
}
/*组件动画*/
.food.foodDetail-enter-active,
.food.foodDetail-leave-active {
  transition: all 0.1s;
}
.food.foodDetail-enter,
.food.foodDetail-leave-to {
  transform: scale(0);
}

/*头部信息*/
.header {
  padding: 18px;
}
.img {
  width: 100%;
  height: 100%;
}
.img img {
  width: 100%;
  height: 100%;
}
/*食物信息*/
.header .food_info {
}
.food_brief .name {
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: rgb(7, 17, 27);
}
.food_brief .sell {
  font-size: 0;
  margin-bottom: 18px;
  margin-top: 8px;
  color: rgb(147, 153, 159);
  line-height: 10px;
}
.food_brief .sell .sell_count {
  font-size: 10px;
  padding-right: 12px;
}
.food_brief .sell .good_percent {
  font-size: 10px;
}

.food_brief .price {
  display: flex;
  justify-content: space-between;
}
.food_brief .price .price_left {
  font-size: 0;
  line-height: 24px;
  font-weight: 700;
}
.price .price_left .new_price {
  font-size: 14px;
  color: rgb(240, 20, 20);
  padding-right: 12px;
}
.price .price_left .old_price {
  font-size: 10px;
  color: rgb(147, 153, 159);
  text-decoration: line-through;
}
.food_brief .price .price_right {
  width: 80px;
  height: 26px;
  border-radius: 10px;
}
.food_brief .price .price_right .add_first{
  background-color: #00a0dc;
  display: inline-block;
  text-align: center;
  height: 100%;
  width: 100%;
  color: #fff;
  font-size: 10px;
  line-height: 26px;
  border-radius: 13px;
}

/*商品介绍*/
.food_info {
  padding: 18px;
}
.food_info .about {
  font-size: 14px;
  color: rgb(7, 17, 27);
  font-weight: 700;
  margin-bottom: 6px;
}
.food_info p {
  font-size: 12px;
  font-weight: 200;
  color: rgb(77, 85, 93);
  line-height: 24px;
  padding-left: 8px;
}

 .food_assessment {
   padding:18px 18px 6px 18px;
	 font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: rgb(7, 17, 27);
}

/*评价列表*/
.ratings_wrapper {
  padding:0 18px;
}
.ratings_wrapper .ratings_content {
	display:flex;
	justify-content: space-between;
}
.ratings_wrapper .ratings_content .content_left{
	color:rgb(147,153,159);
	margin-top:4px;
	line-height:24px;
	font-size:0;
}
.ratings_content .content_left .date {
	font-size: 12px;
}
.ratings_content .content_left .text {
	font-size: 12px;
}
.content_left .text .icon-thumb_up.good {
	color:rgb(0,160,220);
}
.content_left .text .retings_content_text {
  color:black;
}
.ratings_wrapper .ratings_content .content_right{
	display:flex;
}
.ratings_wrapper .ratings_content .content_right .user_name{
	font-size:10px;
	color:#93999F;
	margin-right: 6px;
	line-height: 24px;
}
.ratings_wrapper .ratings_content .content_right .user_avatar{
	width:24px;
	height:24px;
}

.content_right .user_avatar img{
	width:100%;
	height:100%;
	border-radius:50%;
}

</style>
