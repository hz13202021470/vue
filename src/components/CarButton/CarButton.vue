<template>
  <div class="carbutton">
		<transition name="fade">
		<div class="wrap" v-show="this.food.count">
			<div class="cart_decrease icon-remove_circle_outline"  @click.stop="decrease($event)"></div>
		  <div class="cart_count" >{{this.food.count}}</div>
		</div>
		</transition>
		<div class="cart_add icon-add_circle" @click.stop="add($event)"></div>
	</div>
</template>

<script>
	export default {
		name:'CarButton',
		props:{
				food:{
					type:Object
				},
				goods:{
					type:Object
				}
		},
		data() {
			return {
					count:0
			}
		},
		computed:{

		},
		methods:{
				add(event) {
					if (!event._constructed) return
					if (!this.food.count) {
								this.$set(this.food,'count', 1)
					} else {
              this.food.count++
              console.log(this.food.count)              
					}
				},
				decrease(event) {
						if (!event._constructed) {return}
							if (this.food.count) {
                  this.food.count--
                  console.log(this.food.count)
							 }
							}
				},
		created() {
		},
		watch:{

		}
	}
</script>

<style lang="stylus" scoped>
		.carbutton
			display:inline-block
			font-size:0
			.cart_decrease, .cart_count, .cart_add
				display:inline-block
				line-height :24px
			.wrap
				display:inline-block
				&.fade-enter-active, &.fade-leave-active {
							transition: all .5s
						}
				&.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
								transform :translateX(40px)
								opacity:0
							}
				.cart_decrease
					font-size:22px
					color:rgb(0,160,220)
					padding-right:6px
				.cart_count
					font-size:16px
					vertical-align :top
					color:rgb(147,153,159)
			.cart_add
				font-size:22px
				color:rgb(0,160,220)
				padding-left:6px
</style>
