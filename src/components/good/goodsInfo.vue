<template>
	<div class="goodsInfo-container">
		<!-- 小球动画 -->
		<transition
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter">
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>


		<!-- 商品轮播区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunboList="lunbotu" :isfull="false"></swiper>
				</div>
			</div>
		</div>	
		<!--商品购买区域  -->
		<div class="mui-card">
			<div class="mui-card-header">{{goodsInfo.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						<del class="old_price">市场价:${{goodsInfo.market_price}}</del> 
						<span class="now_price">销售价:${{goodsInfo.sell_price}}</span>
					</p>
					<p>购买数量:<numbox @getCount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox></p>
					<mt-button type="primary" size="small">立即购买</mt-button>
					<mt-button type="danger" size="small" @click="addShopCart">加入购物车</mt-button>
				</div>
				
			</div>
			
		</div>
		<!-- 商品参数区域 -->
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号:{{ goodsInfo.goods_no }}</p>
					<p>库存情况:{{ goodsInfo.stock_quantity }}</p>
					<p>上架时间:{{ goodsInfo.add_time }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click="goDecs(id)">图文介绍 </mt-button>
				<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
			</div>
			
		</div>
		
		
		
	</div>
</template>
<script>
	//导入轮播图组件
	import swiper from "../subComponent/swiper.vue"
	import numbox from "../subComponent/goodsInfo_number.vue"
	export default {
		data(){
			return {
				id:this.$route.params.id,
				lunbotu:[],
				goodsInfo:{},
				ballFlag:false,  //控制小球的显示与隐藏
				select:1  //默认选中小球的数量为1
			}
		},
		created(){
			this.getLunbotu();
			this.getGoodsInfo()
		},
		methods:{
			getLunbotu(){
				this.$http.get("api/getthumimages/"+this.id).then(result=>{
					if(result.body.status==0){
						result.body.message.forEach(item=>{
							item.img=item.src;
						});
						this.lunbotu=result.body.message;
					}
				})
			},
			getGoodsInfo(){
				this.$http.get("api/goods/getinfo/"+this.id).then(result=>{
					// console.log(result.body.message)
					this.goodsInfo=result.body.message[0];
				})
			},
			goDecs(id){
				// 通过编程式导航跳转到图文介绍页面
				this.$router.push({name:"goodsdesc",params:{id}})
			},
			goComment(id){
				this.$router.push({name:"goodscomment",params:{id}})
			},
			// 加入购物车  
			addShopCart(){
				this.ballFlag=!this.ballFlag;
				// [id:商品的id,price:商品的价格,selected:商品的选中状态,count:要购买的数量]
				// 拼接出一个 要保存到store 中的car 数组里面的商品信息对象
				var goodsinfo= {
					id:this.id,
					selected:true,
					count:this.select,
					price:this.goodsInfo.sell_price
				}
				// 点击 添加购物车时,调用mutations方法 ,来讲商品加入购物车
				this.$store.commit("addToCar",goodsinfo)
			},
			beforeEnter(el){
				el.style.transform="translate(0,0)"
			},
			enter(el,done){
				el.offsetWidth;
				// 获取小球的位置信息
				const ballPosition=this.$refs.ball.getBoundingClientRect();
				// console.log(ballPosition)
				// 获取徽标的位置
				const badgePosition=document.getElementById("badge").getBoundingClientRect();
				// console.log(ballPosition)
				const xDist=badgePosition.left-ballPosition.left;
				const yDist=badgePosition.top-ballPosition.top;
					// console.log(xDist)
					// console.log(yDist)
				el.style.transform=`translate(${xDist}px,${yDist}px)`;
				el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)";
				done();
			},
			afterEnter(el){
				this.ballFlag=!this.ballFlag;
			},
			getSelectedCount(count){
				//当子组件把选中的数量传递给父组件的时候,把选中的数量保存到data上
				this.select=count
			},

		},
		components:{
			swiper,
			numbox
		}
	}
</script>
<style lang="scss" scoped>
	.goodsInfo-container {
		background-color: #eee;
		overflow: hidden;
		.old_price {

		}
		.now_price {
			color:red;
			font-size: 16px;
			font-weight: bold;
		}
		.mui-card-footer {
			display: block;	
		}
		.mint-button--primary.is-plain {
			margin-bottom: 10px;
		}

		.ball {
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background-color: red;
			position: absolute;
			z-index: 99;
			top: 430px;
			left:140px;

		}

	}
</style>
