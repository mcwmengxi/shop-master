import axios from 'axios'
export default function req(url,data={},type="GET"){
    return new Promise((resolve,reject)=>{
        let promise;
        if(type==='GET'){
            let newstr=''
            Object.keys(data).forEach(key => {
                newstr+=key+'='+data[key]+ '&'
            })
            if(newstr!==""){
                newstr=newstr.substring(0,newstr.lastIndexOf('&'));
                url=url+'?'+newstr;
            }
            promise=axios.get(url)
        }else{
            promise = axios.post(url,data)
        }
        promise.then(response=>{
            resolve(response.data)
        },error=>{
            reject(error)
        })
    })
}