<template>
    	<div class="ratings">
						<ul class="ratings_select">
							<li class="all" :class="{'active': selectedType === 2}" @click="select($event,2)">{{desc.all}}</li>
							<li class="good"  :class="{'active': selectedType === 0}" @click="select($event,0)">{{desc.positive}}</li>
							<li class="bed"  :class="{'active': selectedType === 1}" @click="select($event,1)">{{desc.negative}}</li>
						</ul>
						<div class="switch_tatings">
							<span class="icon-check_circle" :class="{'active':onlyContent}" @click="toogleContent($event)"></span>
							<span class="text">只看有内容的评价</span>
						</div>
						<ul >
							<li v-for="(item, i) in ratings" :key="i">
								<div class="ratings_content">
									<div class="content_left">
										<div class="date">
											<span class="date_left">{{ item.rateTime | getDate(item.rateTime)}}</span>
										</div>
										<div class="text">
											<span class="icon-thumb_up" :class="{good:item.rateType === 0}" v-if="item.rateType === 0"></span>
                      			<span class="icon-thumb_down" :class="{good:item.rateType === 0}" v-else></span>
										  <span class="retings_content_text">{{item.text}}</span>
										</div>
									</div>
									<div class="content_right">
											<span class="user_id">123445</span>
											<span class="user_avatar">
												<img :src="item.avatar" alt="">
											</span>
									</div>
								</div>
							</li>
						</ul>
			</div>
</template>

<script>
  const POSITIVE = 0  //肯定评价
  const NEGATIVE = 1 //否定评价
  const ALL = 2 //所有评价
  export default {
    name:"ratingselect",
    data() {
        return {
            selectedType:this.selectType //定义这个变量，接收父组件的selectType,这样就可以不同修改父组件的值了
        }
    },
    props:{
      //评论数组
      ratings:{
        type:Array,
        default() {
          return []
        }
      },
      //选择类型
      selectType:{
          type:Number,
          default:ALL
      },
      //只读内容
      onlyContent:{
          type:Boolean,
          default:false
      },
      desc:{
          type:Object,
          default () {
            return {
              all: '全部',
              positive: '满意',
              negative:'不满意'
            }
          }
      },
      food:{
        type:Object,
        default(){
          return { }
        }
      }
    },
  filters:{
       //转换后台传来 的毫秒数
    getDate:function (d) {
        let time = new Date(d)
        let date = {
          year:time.getFullYear(),
          month:time.getMonth(),
          date:time.getDate(),
          hour:time.getHours(),
          minutes:time.getMinutes(),
          seconds:time.getSeconds()
        }
        let allTime = `${date.year}-${date.month}-${date.date}  ${date.hour}:${date.minutes}:${date.seconds}`
        return allTime
    }
  },
  methods:{
    select(event, type) {
      if (!event._constructed) return
      this.selectedType = type
},

      toogleContent(event) {
          if (!event._constructed) return
          this.$emit('content-toggle', !this.onlyContent)
          // this.$emit('update:onlyContent',!this.onlyContent)
      }
  }
  }
</script>

<style lang="css" scoped>
    /*评价*/
.ratings {
	padding:18px;
}

.ratings .ratings_select{
	display:flex;
	box-sizing:border-box;
	margin-top:12px;
	font-size:12px;
	border-bottom:1px solid rgba(7,17,27,0.1);
	padding-bottom:18px;
}
.ratings .ratings_select .all,
.ratings .ratings_select .good, 
.ratings .ratings_select .bed{
	line-height: 16px;
	text-align:center;
	padding:8px 12px;
}
.ratings .ratings_select .all{
	color:black;
	background-color:#CCECF8;
}
.ratings .ratings_select .all.active,
.ratings .ratings_select .good.active
{
	color:#fff;
	background-color:rgb(0,160,220);
}
.ratings .ratings_select .good{
  color:black;
	background-color:#CCECF8;
	 margin: 0 8px;
}
.ratings .ratings_select .bed{
  color:black;
	background-color:#E9EBEC;
}
.ratings .ratings_select .bed.active{
  color:#fff;
	background-color:#666;
}

.ratings .switch_tatings{
	margin-top:12px;
	font-size:0;
	color:rgb(147,153,159)
}
.ratings .switch_tatings .icon-check_circle {
  padding-right:4px;
	font-size:14px;
	line-height:24px;
}
.ratings .switch_tatings .icon-check_circle.active {
  color:rgb(0,160,220);
}
.ratings .switch_tatings .text{
	font-size:14px;
	line-height:24px;
}

.ratings .ratings_content {
	display:flex;
	justify-content: space-between;
}
.ratings .ratings_content .content_left{
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
.ratings .ratings_content .content_right{
	display:flex;
}
.ratings .ratings_content .content_right .user_id{
	font-size:10px;
	color:#93999F;
	margin-right: 6px;
	line-height: 24px;
}
.ratings .ratings_content .content_right .user_avatar{
	width:24px;
	height:24px;
}

.content_right .user_avatar img{
	width:100%;
	height:100%;
	border-radius:50%;
}
</style>

