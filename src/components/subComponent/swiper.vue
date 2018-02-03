<template>
	<div>
		<mt-swipe :auto="2000">
	  		<mt-swipe-item v-for="item in lunboList" :key="item.url">
	  			<img :src="item.img" :class="{'full':isfull}">
	  		</mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script>
	export default {
		props:["lunboList","isfull"]
	}
</script>
<style lang="scss" scoped> 
	.mint-swipe {
		height:50vw;
		.mint-swipe-item {
			text-align: center;
			img {
				height:100%;
			}
		}
		.full {
			width:100%;
		}
	}
</style>