import request from "@/utils/request";
const api_name = "/admin/edu/subject";

export default {
  getNestedTreeList() {
    return request({
      method: "GET",
      url: `${api_name}`
    });
  }
};
