<template>
  <div>
    <div class="item" v-for="(item,index) of list" :key="index">
 
      <div class="margin">
        <span class="item-title-icon" > {{item.title}}</span>
		<el-button size="small" type="primary" @click="del(index)">del</el-button>
      </div>
      <!--递归组件：my-tree调用自身-->
      <div v-if="item.children" class="item-children">
        <my-tree :list="item.children" ></my-tree>
      </div>
 
    </div>
  </div>
</template>
<script>
	export default {
		name:"my-tree",
		 props: {
		    list: {
		        type: Array,
		        required: true
		    }
		},
		data(){
			return {
				
			}
		},
		methods:{
			del(index){
				console.log(index)
				    this.list.splice(index, 1)
		
			}
		}
	}
</script>

<style  scoped>
	.margin{
			padding: 5px;
	}
</style>