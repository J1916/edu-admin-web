import request from "@/utils/request";
const cros_url = "/api"; //匹配跨域开头的url
const api_name = "admin/edu/teacher";
export default {
  getPageList(page, rows, searchObj) {
    return request({
      method: "GET",
      url: `${api_name}/${page}/${rows}`,
      params: searchObj
    });
  },
  deleteById(id) {
    return request({
      method: "DELETE",
      url: `${api_name}/${id}`
    });
  },
  getTeacherById(id) {
    return request({
      method: "GET",
      url: `${api_name}/${id}`
    });
  },
  addTeacher(teacher) {
    return request({
      method: "POST",
      url: `${api_name}`,
      data: teacher
    });
  },
  updateTeacher(teacher) {
    console.log(teacher);
    return request({
      method: "PUT",
      url: `${api_name}/${teacher.id}`,
      data: teacher
    });
  },
  getList() {
    return request({
      url: api_name,
      method: "get"
    });
  }
};
