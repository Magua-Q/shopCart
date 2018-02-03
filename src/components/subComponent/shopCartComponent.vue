<template>
	<div class="mui-numbox" data-numbox-min='1' >
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="initcount" 
		@change="countChange" ref="numbox" readonly />
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>
<script>
import mui from "../../../lib/mui/js/mui.min.js"
	export default {
		data(){
			return{}
		},
		mounted(){
			mui(".mui-numbox").numbox()
		},
		methods:{
			countChange(){
				// 改变数量
				// console.log(this.$refs.numbox.value)
				// 每当数量值改变,则立即把最新的数量同步到 购物车的 store中,覆盖之前的数量值
				// console.log(this.$refs.numbox.value);
				this.$store.commit("updateGoodsInfo",{
					id:this.goodsId,
					count:this.$refs.numbox.value
				})
			}
		},
		// 父组件向在组件传值
		props:["initcount","goodsId"]
	}
</script>
<style lang="less" scoped>
	
</style>