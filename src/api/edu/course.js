import request from "@/utils/request";
const api_name = "/admin/edu/course";

export default {
  saveCourseInfo(courseInfo) {
    return request({
      method: "POST",
      url: `${api_name}/save-course-info`,
      data: courseInfo
    });
  },
  //根据id查询课程
  getCourseInfoById(id) {
    return request({
      method: "GET",
      url: `${api_name}/${id}`
    });
  },
  //更新课程
  updateCourseInfoById(courseInfo) {
    return request({
      method: "PUT",
      url: `${api_name}/updateCourseInfo/${courseInfo.id}`,
      data: courseInfo
    });
  },
  getPageList(page, rows, searchObj) {
    return request({
      method: "GET",
      url: `${api_name}/${page}/${rows}`,
      params: searchObj
    });
  },
  deleteCourseInfoById(id) {
    return request({
      method: "DELETE",
      url: `${api_name}/${id}`
    });
  }
};
