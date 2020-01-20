import Layout from "../views/layout/Lyout";

// 课程管理
export default {
  path: "/edu/course",
  component: Layout,
  redirect: "/edu/course/list",
  name: "Course",
  meta: { title: "课程管理", icon: "form" },
  children: [
    {
      path: "list",
      name: "EduCourseList",
      component: () => import("@/views/edu/course/list"),
      meta: { title: "课程列表" }
    },
    {
      path: "info",
      name: "EduCourseInfo",
      component: () => import("@/views/edu/course/info"),
      meta: { title: "发布课程" }
    },
    {
      path: "info/:id",
      name: "EduCourseInfoEdit",
      component: () => import("@/views/edu/course/info"),
      meta: { title: "编辑课程基本信息", noCache: true },
      hidden: true
    },
    {
      path: "chapter/:id",
      name: "EduCourseChapterEdit",
      component: () => import("@/views/edu/course/chapter"),
      meta: { title: "编辑课程大纲", noCache: true },
      hidden: true
    },
    {
      path: "publish/:id",
      name: "EduCoursePublishEdit",
      component: () => import("@/views/edu/course/publish"),
      meta: { title: "发布课程", noCache: true },
      hidden: true
    }
  ]
};
