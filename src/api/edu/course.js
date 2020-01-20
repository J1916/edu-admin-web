import request from "@/utils/request";
const api_name = "/admin/edu/course";

export default {
  saveCourseInfo(courseInfo) {
    return request({
      method: "POST",
      url: `${api_name}/save-course-info`,
      data: courseInfo
    });
  }
};
