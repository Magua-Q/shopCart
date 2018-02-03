import VueRouter from 'vue-router'

import homeComponent from "./components/tabbar/homeComponent.vue"
import memberComponent from "./components/tabbar/memberComponent.vue"
import shopcartComponent from "./components/tabbar/shopcartComponent.vue"
import searchComponent from "./components/tabbar/searchComponent.vue"
import newsListComponent from "./components/news/newsListComponent.vue"
import newsInfo   from  "./components/news/newsInfo.vue"
import photoList from "./components/photo/photoList.vue"
import photoInfo from "./components/photo/photoInfo.vue"
import goodsList  from  "./components/good/goodLists.vue"
import goodsInfo from "./components/good/goodsInfo.vue"
import goodsDesc from "./components/good/goodsDesc.vue"
import goodsComment from "./components/good/goodsComment.vue"

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
  	{path:"/",redirect:"/home"},
  	{path: "/home",component:homeComponent},
  	{path: "/member",component:memberComponent},
  	{path: "/shopcart",component:shopcartComponent},
  	{path: "/search",component:searchComponent},
  	{path:"/home/newsList",component:newsListComponent},
  	{path:"/newsList/newsInfo/:id",component:newsInfo},
  	{path:"/home/photoList",component:photoList},
  	{path:"/home/photoinfo/:id",component:photoInfo},

  	{path:"/good/goodLists",component:goodsList},
  	{path:"/home/goodsinfo/:id",component:goodsInfo},
    {path:"/home/goodsdesc/:id",component:goodsDesc,name:"goodsdesc"},
    {path:"/home/goodscomment/:id",component:goodsComment,name:"goodscomment"}
  ],
  linkActiveClass:"mui-active"	
})

// 把路由对象暴露出去
export default router