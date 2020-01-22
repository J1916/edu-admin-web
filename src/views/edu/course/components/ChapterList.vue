<!-- 章节列表组件-->
<template>
  <div>
    <!-- 添加章节按钮 -->
    <div>
      <el-button style="width:100%" @click="addChapter">添加章节</el-button>
    </div>

    <!-- 引用添加章节表单组件 -->
    <ChapterForm ref="chapterForm" :course-id="courseId" @onSaveSuccess="refreshList" />
    <!-- onSaveSuccess监听函数： 指定保存成功后回调的方法-->

    <!-- 章节列表 -->
    <ul class="chapterList">
      <li v-for="chapter in chapterNestedList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text">添加课时</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </span>
        </p>
        <!-- 视频 -->
        <ul class="chapterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-tag v-if="video.free" size="mini" type="success">{{ '免费观看' }}</el-tag>
                <el-button type="text" @click="updateChapterById(row.id)">编辑</el-button>
                <el-button type="text" @click="deleteChapterById(row.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import chapter from "@/api/edu/chapter";
// 引入章节表单组件
import ChapterForm from "@/views/edu/course/components/ChapterForm";

export default {
  // 父组件向子组件传值
  props: {
    courseId: {
      type: String,
      default: null
    }
  },
  components: { ChapterForm }, //注册添加章节组件
  data() {
    return {
      chapterNestedList: [] // 章节嵌套视频列表
    };
  },
  created() {
    //获取章节嵌套视频列表
    this.getChapterNodeList();
  },
  methods: {
    getChapterNodeList() {
      chapter.getChapterNodeList(this.courseId).then(res => {
        this.chapterNestedList = res.data;
      });
    },
    deleteChapterById(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return chapter.deleteChapterById(id);
        })
        .then(() => {
          this.getChapterNodeList(); //刷新列表
          this.$message.success("删除成功");
        })
        .catch(res => {
          if (res === "cancel") this.$message.info("已取消成功");
        });
    },
    updateChapterById(chapterId) {
      this.$refs.ChapterForm.open(chapterId); //打开添加章节表单组件窗口
    },
    addChapter() {
      this.$refs.ChapterForm.open(); //打开添加章节表单组件窗口
    },
    //监听方法
    refreshList() {
      this.getChapterNodeList();
    }
  }
};
</script>
<style scoped>
.chapterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chapterList li {
  position: relative;
}
.chapterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chapterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dashed #ddd;
}
</style>