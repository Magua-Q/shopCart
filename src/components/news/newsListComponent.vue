<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
				<router-link :to="'/newsList/newsInfo/'+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						{{item.title}}
						<p class='mui-ellipsis'>
							<span>发表时间:{{item.add_time | dataFormat}}</span>
							<span>点击:{{item.click}}次</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	import { Toast } from "mint-ui"
	export default {
		data(){
			return {

				list:[],
			}
		},
		created(){
			this.getNewsList();
		},
		methods: {
			getNewsList(){
				this.$http.get("api/getnewslist").then(result=>{
					if (result.body.status===0) {
						this.list=result.body.message
					}else{
						Toast("数据请求失败")
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.mui-ellipsis {
		font-size:12px;
		color:#226aff;
		display:flex;
		justify-content:space-between
	}
</style>