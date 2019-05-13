<template>
    	<div class="ratings">
						<ul class="ratings_select">
							<li class="all" :class="{'active': selectedType === 2}" @click="select($event,2)">{{desc.all}} {{ratings.length}} </li>
							<li class="good"  :class="{'active': selectedType === 0}" @click="select($event,0)">{{desc.positive}} {{good.length}}
						</li>
							<li class="bed"  :class="{'active': selectedType === 1}" @click="select($event,1)">{{desc.negative}} 
								{{bed.length}}</li>
						</ul>
						<div class="switch_tatings"  :class="{'active':onlyContent}"  @click="toogleContent($event)">
							<span class="icon-check_circle"></span>
							<span class="text">只看有内容的评价</span>
						</div>
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
    computed:{
      good() {
        return this.ratings.filter((rating) => {
            return rating.rateType == POSITIVE
        })
			},
			bed() {
				return this.ratings.filter((rating) => {
					return rating.rateType == NEGATIVE
				})
			}
    },
  methods:{
    select(event, type) {
      if (!event._constructed) return
      this.selectedType = type
      this.$emit('content-toggle',this.onlyContent,this.selectedType)
},

      toogleContent(event) {
          if (!event._constructed) return
          this.$emit('content-toggle', !this.onlyContent,this.selectedType)
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
	font-size:16px;
	line-height:24px;
}
.ratings .switch_tatings.active .icon-check_circle{
  color:rgb(0,160,220);
}
.ratings .switch_tatings .text{
	font-size:14px;
	line-height:24px;
}
</style>

