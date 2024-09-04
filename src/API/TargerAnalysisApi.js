import axios from "axios"

 let rootUrl = "http://172.20.102.64:8000/"  

function get_Case(year, month){
    if(year!==0 && month!==0){
        return 'by_day'
    }else if(year!==0 && month===0){
        return 'by_month'
    }else{
        return 'by_year'
    }
}

export async function get_Target_Data_Api(payload){
    
    const user_name = payload.user_name;
    const year = payload.year;
    const month = payload.month;
    var cases = get_Case(year,month);
    const platform = payload.platform;
    
    console.log(`${rootUrl}api/analysis/growth/?case=${cases}&platform=${platform}&username=${user_name}&year=${year}&month=${month}`)
    var response = axios({
        method: 'get',
        url: `${rootUrl}api/analysis/growth/?case=${cases}&platform=${platform}&username=${user_name}&year=${year}&month=${month}`,
        headers: {
            // 'Authorization': `Bearer ${payload.access_token}`,
            'Content-Type': 'application/json'
        },
    }).then((data)=>{
        // console.log(data.data)
        return ["SEC_REQUEST_SUCCESS", data.data];
    }).catch((error)=>{
        return ["ERR_REQUEST_SUCCESS", error];
    })
    return response;
}