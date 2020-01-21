import request from "@/utils/request";
const api_name = "/admin/edu/chapter";


export default {
    //添加章节
    saveChapter(chapter) {
        return request({
            method:'POST',
            url: `${api_name}`,
            data: chapter
        })
    },
    //删除章节
    deleteChapterById(id){
        return request({
            method:'DELETE',
            url: `${api_name}/${id}`
        })
    },
    //更新章节
    updateChapterById(chapter){
        return request({
            method:'PUT',
            url: `${api_name}/${chapter.id}`,
            data: chapter
        })
    },
    //根据id获取章节
    getChapterById(id){
        return request({
            method:'GET',
            url: `${api_name}/${id}`
        })
    },
    //根据课程id查询章节数据列表
    getChapterNodeList(courseId){
        return request({
            method:'GET',
            url: `${api_name}/chapterNodeList/${courseId}`
        })
    }
}