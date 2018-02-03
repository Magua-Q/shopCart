<template>
	<div class="photoinfo-container">
		<h3>{{photoinfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间:{{photoinfo.add_time | dataFormat}}</span>
			<span>点击:{{photoinfo.click}}次</span>
		</p>
		<hr>
		<!-- 缩略图区域 -->
		<div class="thumbs">
			<img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)">
		</div>

		<!-- 放置一个现成的评论子组件 -->
		<commonComponent :id="id"></commonComponent>
	</div>

</template>
<script>	
// 导入评论子组件
import commonComponent from "../subComponent/commonComponent.vue"
	export default {
	    data () {
	      return {
	      	id:this.$route.params.id,  // 从路由中获取图片的id
	        list: [],  // 缩略图的数组
	        photoinfo:{},
	      }
	    },
	    created(){
	    	this.getPhotoInfo();
	    	this.getThumbs();
	    },
	    methods:{
	    	getThumbs(){
	    		this.$http.get("api/getthumimages/"+this.id).then(result=>{
	    			if(result.body.status==0){
	    				result.body.message.forEach(item=>{
	    					item.w=600;
	    					item.h=400;
	    				});
	    				this.list=result.body.message;
	    			}
	    		})
	    	},
	    	getPhotoInfo(){
	    		this.$http.get("api/getimageInfo/"+this.id).then(result=>{
	    			if(result.body.status===0){
	    				this.photoinfo=result.body.message[0]
	    			}
	    		})
	    	},
	    },
	   	components:{
	   		commonComponent
	   	}
  }
</script>
<style lang="scss" scoped>
	.photoinfo-container {
		padding: 3px;
		h3{
			color: #26a2ff;
			font-size: 15px;
			text-align: center;
			margin: 15px 0;
		}
		.subtitle{
			display: flex;
			justify-content:space-between;
			font-size: 13px;

		}
		.thumbs{
			img {
				margin: 10px;
				box-shadow: 0 0 8px #999
			}
		}
	}
</style>