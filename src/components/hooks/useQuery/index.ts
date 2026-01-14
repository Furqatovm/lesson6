import { useQuery } from "@tanstack/react-query"
import { useAxios } from "../useAxios"

interface QueryType {
    pathname:string;
    url:string;
}

export const useQueryHandler =({pathname, url}:QueryType) =>{
    const axios =useAxios()
    return useQuery({
        queryKey:[pathname],
        queryFn:()=>axios({url, method:"GET"})
    })
}