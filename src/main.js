

import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
import router from "./router.js"
import App  from "./App.vue"
import MintUi from "mint-ui"
Vue.use(MintUi)

import Vuex from "vuex"
Vue.use(Vuex)

import VueResource from "vue-resource"
Vue.use(VueResource)
Vue.http.options.root = 'http://vue.studyit.io';
Vue.http.options.emulateJSON = true;

// 引入缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"

import moment from "moment"     // 通过momment.js处理一个日期格式

Vue.filter("dataFormat",(dataStr,pattern="YYYY-MM-DD hh-mm-ss")=>{
	return moment(dataStr).format(pattern)
})
// 每次刚进入网站,肯定会调用main.js在刚调用的时候,先从本地存储中,把购物车中的数据读出来,放到store中
var car = JSON.parse(localStorage.getItem("car") || "[]" )

const store = new Vuex.Store({
	state:{
		 //将购物车中的数据,用一个数据存储起来,在car 数组中,存储一些商品的对象 
		// [id:商品的id,price:商品的价格,selected:商品的选中状态,count:要购买的数量]
		car:car,
	},
	mutations:{	
		// 1. 通过mutations中的addToCar方法,将goodsInfo中拼接出来的goodsinfo添加到car数组里面
		addToCar(state,goodsinfo){
			// 分析:
			// 1. 如果购物车中,之前已经有这个商品数据了,那么只需要更新数据

				// 假设在开始时,在car 中没有找到相关的商品信息
				var flag=false
			state.car.some(item=>{
				if(item.id===goodsinfo.id){
					item.count += parseInt(goodsinfo.count)
					flag=true
					return true
				}	
			})
			// 2. 如果最终,循环完毕,得到的flag是true还是false,如果是false 则直接把商品数据,push到car中
			if(!flag){
				state.car.push(goodsinfo)
			}


			// 当更新car 之后,把car数组,存储到本地的localstorage中
			localStorage.setItem("car",JSON.stringify(state.car))
		},
		// 将numbox里面的数字更新到store中的car 里面
		updateGoodsInfo(state,goodsinfo){
			// 修改购物车中的数量值

			state.car.some(item=>{
				if(item.id==goodsinfo.id){
					item.count=parseInt(goodsinfo.count)
					console.log(item.count)
					return true
				}
			})
			localStorage.setItem("car",JSON.stringify(state.car))
		},
		// 根据id删除car 里面的id对应的商品
		removeFormCar(state,id){
			state.car.some((item,i)=>{
				if(item.id==id){
					state.car.splice(i,1)
					return true;
				}
			})
			// 删除完毕后的,最新的购物车数据,同步到本地存储中
			localStorage.setItem("car",JSON.stringify(state.car))
		},
		updateGoodsSelected(state,info){
			state.car.some(item=>{
				if (item.id==info.id) {
					item.selected = info.selected
					return true
				}
			})
			// 把最新的状态更新到localStorage中
			localStorage.setItem("car",JSON.stringify(state.car))
		}
	},
	getters:{  
		// 相当于 计算属性 ,也相当于 filters

		// 自动更新徽标
		getAllCount(state){
			var c=0;
			state.car.forEach(item=>{
				c += item.count
			})
			return c
		},
		// 删除后面的商品的数量
		getGoodsCount(state){
			var  o = {}
			state.car.forEach(item=>{
				// 给对象赋值
				o[item.id]=item.count;
			})
			console.log(o);
			return o
		},
		// 拼接一个id:true这样的一个对象,通过v-model来设置按钮的状态是选中或者是未选中
		getGoodsSelected(state){
			var o = {}
			state.car.forEach(item=>{
				//给空对象赋值
				o[item.id]=item.selected
			})
			console.log(o)
			return o 
		},
		getGoodsCountAndAmount(state){
			var o={
				count:0,
				amount:0
			}
			state.car.forEach(item=>{
				if (item.selected) {
					o.count += item.count;
					o.amount += item.count*item.price
				}
			})
			return o 
		}
	}
})



var vm = new Vue({
	el:"#app",
	render : c=>c(App),
	router,  //挂载到vm实例上
	store   //切记启用vuex
})

