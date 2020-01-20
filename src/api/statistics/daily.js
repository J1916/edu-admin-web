import request from '@/utils/request'

const api_name = '/admin/statistics/daily'

export default {
    createStatistics(day){
        return request({
            method: 'GET',
            url: `${api_name}/${day}`
        });
    },
    getChartData(searchObj){
         return request({
             method: 'GET',
             url: `${api_name}/show-chart/${searchObj.begin}/${searchObj.end}/${searchObj.type}`
         });
    }
}