import request from "@/utils/request";
const api_name = "/admin/edu/video";

export default {
  //添加课时基本信息
  saveVideoInfo(videoInfo) {
    return request({
      method: "POST",
      url: `${api_name}`,
      data: videoInfo
    });
  },
  //删除课时
  deleteVideoInfoById(id) {
    return request({
      method: "DELETE",
      url: `${api_name}/${id}`
    });
  },
  //更新课时
  updateVideoInfoById(videoInfo) {
    return request({
      method: "PUT",
      url: `${api_name}/${videoInfo.id}`,
      data: videoInfo
    });
  },
  //根据id获取课时
  getVideoInfoById(id) {
    return request({
      method: "GET",
      url: `${api_name}/${id}`
    });
  }
};
