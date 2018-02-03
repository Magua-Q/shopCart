<template>
	<div>	
		<comment :id="$route.params.id"></comment>
		
	</div>
</template>
<script>
	import comment from "../subComponent/commonComponent.vue"
	export default {
		components:{
			comment
		}

	}
</script>
<style>
	
</style>
