import request from "@/utils/request";
const api_name = "/admin/edu/subject";

export default {
  // 获取分类列表
  getNestedTreeList() {
    return request({
      method: "GET",
      url: `${api_name}/`
    });
  }
};
