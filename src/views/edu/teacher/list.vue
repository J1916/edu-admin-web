<template>
  <div class="app-container">
     <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="讲师名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="searchObj.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
     <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * size + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="size"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>

<script>
import teacher from '@/api/edu/teacher'
export default{
    data() {
      return { 
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      size: 10, // 每页记录数
      searchObj: {}// 查询条件
    }
    },
    created(){ //当页面加载结束后会调用created方法，当页面渲染结束后会调用mounted方法
        this.fetchData()
    },
    methods: {
        fetchData(page = 1){
          console.log('加载……');
        // 当点击分页组件的切换按钮的时候，会传输一个当前页码的参数page
        // 解决分页无效问题
          this.listLoading = true //开启加载列表动画
          this.page=page
            teacher.getPageList(this.page,this.size,this.searchObj).then(res=>{
                if(res.success == true){
                  this.list=res.data.rows //分页数据
                  this.total=res.data.total //总记录数
                }
                this.listLoading=false //关闭加载列表动画
            });
        },
        //重置数据
        resetData(){
            this.searchObj={};
            this.fetchData();
        },
        deleteDataById(id) {
        // debugger
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            return teacher.deleteById(id) //根据id删除教师
        }).then(() => { // 如果上一个then成功则执行此处的then回调
            this.fetchData() //删除成功后再查询教师列表
            this.$message({
                type: 'success',
                message: '删除成功!'
            })
        }).catch((response) => { // 失败
            if (response === 'cancel') {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            }
        })
    }
    }

}

</script>
<style>
</style>

