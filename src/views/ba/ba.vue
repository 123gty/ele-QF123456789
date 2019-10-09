<template>
	<div>
		<H1>fasdfasdf</H1>
	</div>
</template>
<script>
	let Base64 = require("js-base64").Base64;
	export default {
		data(){
			return {
				
			}
		},
		created() {
			console.log(Base64.encode("你好"))
			
		}
	}
</script>
