import { useEffect } from "react";
import { toast } from "react-hot-toast";


export const userError = (errors=[])=>{
    useEffect(() => {
        errors.forEach(({isError, error, fallback})=>{
            if(isError){
                if(fallback) fallback();
                else toast.error(error?.response?.data?.message || "Something went wrong");
            }
        })
    }, [errors]);
    
}