import axios from "axios"

interface AxiosType{
    url:string;
    method:"POST"|"GET"|"PUT"|"DELETE";
    body?:object
}
export const useAxios =() =>{
    const request =({url, method ="GET", body}:AxiosType) =>{
      return axios({
        url:`${import.meta.env.VITE_BASE_URL}/${url}`,
        method,
        data:body,
        headers:{
            "Content-Type" :"application/json",
        },
      }).then((res) => res.data).catch((err) =>{
    console.log(err)
    })
    }

    return request
}