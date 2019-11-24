<template>
  <div>
   
    <div class="content">
      <detail-list :list="list"></detail-list>
    </div>
  </div>
</template>

<script>

  import DetailList from '@/views/bbb/myTree.vue'
  export default{
    name: 'Detail',
    components: {
      DetailList
    },
    data(){
      return {
        list: [{
          title: '成人票',
          children: [{
            title: '成人3馆联票',
            children: [
				{title: '成人1馆联票-成都'}, 
				{title: '成人2馆联票-上海'}, 
				{title: '成人3馆联票-北京'}, 
				{title: '成人4馆联票-河南'},]
          }, 
				  {title: '成人4馆联票',
		children:[{title:"123123123123123123"}]
				  }, {title: '成人5馆联票'}, { title: '成人6馆联票'}]
        },
				{ title: '学生票'}, 
				{ title: '儿童票'}, 
				{title: '特惠票'}]
      }
    }
  }
</script>