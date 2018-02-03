
<template>
	<div class="shopcar-container">
		<div class="goods-list">
		<!-- 商品列表项区域 -->
			<div class="mui-card" v-for="item in goodsList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
						@change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
						<img :src="item.thumb_path" alt="">
						<div class="info">
							<h1>{{item.title}}</h1>
							<p>
								<span class="price">￥{{item.sell_price}}</span>
								<shopcart :initcount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></shopcart>
								<!-- 问题:如何从购物车中获取商品数量 -->
								<!-- 创建一个空的对象,然后循环购物车里面的每一项,
								把当前循环的这条商品的id,作为 对象 的属性名,count值作为 对象的属性值,这样,把所有的商品循环一遍,就会得到一个对象:{id:count} -->
								<a @click="remove">删除</a>
							</p>
						</div>
					</div>
				</div> 
			</div>
			<!-- 商品结算区域 -->
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
							<p>总计(不含运费)</p>
							<p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件,总价:<span class="red">${{$store.getters.getGoodsCountAndAmount.amount}}</span> </p>
						</div>
						<mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
		</div>
	</div>	
</template>
<script>
	import shopcart from "../subComponent/shopCartComponent.vue"
	export default {
		data(){  //来挂载组件私有数据
			return {
				goodsList:[]
			}
		},
		created(){
			this.getGoodsList()  
		},
		methods:{ // 获取购物车商品列表数据
			getGoodsList(){
				// 1. 获取到store中所有的商品的id,然后拼接出一个 用逗号分隔的 字符串
				var idArr = []

				// 遍历car里面的每一项,然后将car里面的id添加到idArr中

				this.$store.state.car.forEach(item=>idArr.push(item.id))

				//判断遍历后idArr里面是否有没有数据 ,换句话说,如果购物车中没有商品,就不用请求数据了
				if(idArr.length<=0){
					return;
				}
				this.$http.get("api/goods/getshopcarlist/"+idArr.join(",")).then(result=>{
					if(result.body.status===0){
						console.log(result.body.message)
						this.goodsList=result.body.message
					}
				})
			},
			remove(id,index){
				// 点击删除,把商品从store中根据的 传递的id进行删除,当前组件中的商品按照索引来删除index
				this.goodsList.splice(index,1)
				this.$store.commit("removeFormCar",id)
			},
			selectedChanged(id,val){
				// 每当点击开关,把最新的 开关状态,同步到 store中
				this.$store.commit("updateGoodsSelected",{id:id,selected:val})
			}
		},
		components:{
			shopcart
		}
	}
</script>
<style lang="less" scoped>
	.shopcar-container {
		background-color: #eee;
		overflow: hidden;
		.goods-list {
			.mui-card-content-inner {
				display: flex;
				align-items: center;
			}
			img {
				width: 60px;
			}
			.info {
				display:flex;
				flex-direction: column;
				justify-content: space-between;
				h1 {
					font-size: 13px;
				}
				.price {
					color: red;
					font-weight: bold;
				}
			}
		}
		.jiesuan {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.red{
				color: red;
				font-size: 16px;
				font-weight: bold;
			}
		}
	}
</style> 	 	