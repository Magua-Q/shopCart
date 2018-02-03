<template>
	<div>
		<!-- 区域滑动组件 -->
		<div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in photoList" :key="item.id" @tap="getPhotoCategoryById(item.id)">
							{{item.title}}
						</a>
						
					</div>
				</div>
		</div>
		<!-- 图片加载区域 -->
		<ul class="photo-list">
			<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
			   <img v-lazy="item.img_url">
			   <div class="info">
			   		<h4 class="info-title">{{item.title}}</h4>
			   		<div class="info-body">{{item.zhaiyao}}</div>
			   </div>
			</router-link>
		</ul>

	</div>
</template>
<script>
	import mui from "../../../lib/mui/js/mui.min.js"
	export default {
		data(){
			return {
				photoList:[],
				list:[]   //图片详细信息
			}
		},
		mounted(){
			// 需要在组件的 mounted 事件钩子中，注册 mui 的 scroll 滚动事件
	        mui('.mui-scroll-wrapper').scroll({
	          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	        });
		},
		created(){
			this.getPhotoCategory(),
			this.getPhotoCategoryById(0)
		},
		methods:{
			getPhotoCategory(){
				this.$http.get("api/getimgcategory").then(result=>{
					console.log(result.body)
					this.photoList=result.body.message
				})
			},
			getPhotoCategoryById(cateid){
				this.$http.get("api/getimages/"+cateid).then(result=>{
					console.log(result.body)
					this.list=result.body.message
				})
			}
		}
	}
</script>
<style>
	* {
		touch-action:pan-y;
	}
	.photo-list {
		list-style:none;
		margin:0;
		padding-bottom:0;
		padding: 0;
	}
	li {
		background-color:#ccc;
		text-align:center;
		margin-bottom:10px;
		box-shadow:0 0 9px #999;
		position: relative;
	}
	img {
		width:100%;
		vertical-align:middle;
	}
	img[lazy=loading] {
	  width: 40px;
	  height: 300px;
	  margin: auto;
	}
	.info {
        color: white;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        max-height: 84px;
	}
    .info-title {
        font-size: 14px;
    }
    .info-body {
        font-size: 13px;
    }
    

	
</style>