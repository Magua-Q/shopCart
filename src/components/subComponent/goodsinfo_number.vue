<template>
	<div class="mui-numbox" data-numbox-min='1' >
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
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
			countChanged(){
				console.log(this.$refs.numbox.value);
				// 通过change来监视数量的变化,一旦数据发生变化,则调用此方法
				this.$emit("getCount",parseInt(this.$refs.numbox.value));
			}
		},
		watch:{
			// 属性监听
			max:function(newVal,oldVal){
				mui(".mui-numbox").numbox().setOption('max',newVal)
			}
		}
	}
</script>
<style lang="less" scoped>
	
</style>