<template>
	<div class="newsInfo-container">
		<h3 class="title">{{newsInfo.title}} </h3>
		<p class="subtitle"><span>发表时间:{{newsInfo.add_time | dataFormat}}</span><span>点击 {{newsInfo.click}}次</span></p>
		<hr>
		<div class="content" v-html="newsInfo.content">
			
		</div>
		<!-- 评论子组件区域 -->
		<commonComponent :id="this.id"></commonComponent>	
	</div>
</template>
<script>
	import commonComponent  from  "../subComponent/commonComponent.vue"
	export default {
		data(){
			return {
				id:this.$route.params.id,
				newsInfo:[]
			}
		},
		components:{
			commonComponent
		},
		created(){
			this.getNewsInfo()
		},
		methods:{
			getNewsInfo(){
				this.$http.get("api/getnew/"+this.id).then(result=>{
					if (result.body.status===0) {
						this.newsInfo=result.body.message[0];
					}
				})
			}
		}
	}
</script>
<style lang="less">
	.newsInfo-container{
		padding:0 5px;
		.title{
			font-size: 16px;
			color:red;
			text-align: center;
			margin:10px 0 ;
		};
		.subtitle{
			display:flex;
			justify-content:space-between;
			color:blue;
			font-size:13px
		}

		.content {
			img {
				width:100%;
				height:100%;
			}
		}
	}
</style>