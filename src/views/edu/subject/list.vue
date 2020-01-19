<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="subjectTree"
      :data="subjectList"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all/>
  </div>
</template>
<script>
import subject from "@/api/edu/subject"
export default {
    data() {
        return {
        filterText: '', // 过滤文本
        subjectList: [], // 数据列表
        defaultProps: {// 属性列表数据属性的key
        children: 'children',
        label: 'title'
      }     
    }
    },
     // 监听 filterText的变化
  watch: {
    filterText(val) {
      this.$refs.subjectTree.filter(val)// 调用tree的filter方法
    }
  },
    created(){
        this.getNodeList();
    },
    methods: {
        getNodeList(){
            //获取树形分类信息
            subject.getNodeList().then(res=>{
                if(res.success == true)
                this.subjectList=res.data;

                console.log(res.data);
            });
        },
        //过滤节点信息
        filterNode(val,data){
            if(!val)
            return true;

            return data.title.indexOf(val.toLowerCase()) !== -1 //忽略大小写
        }

    }
}
</script>
