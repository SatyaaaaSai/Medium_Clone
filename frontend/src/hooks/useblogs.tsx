import { useEffect, useState } from "react"
import axios from "axios";
import { DATABASE_URL } from "../config";
export interface Blog {
    "content": string,
    "title": string,
    "id":string,
    "author": {
        "email": string
    }
}
export const useBlog=({ id }:{ id:string })=>{
    const [blog,setBlog]=useState<Blog>();
    const [loading,setLoading] =useState(true);

    useEffect(()=>{
      axios.get(`${DATABASE_URL}/api/v1/blog/${id}` , {
        headers:{
            Authorization:localStorage.getItem('token')
        }
      })
            .then(response=>{
                setBlog(response.data.blog)
                setLoading(false);
            })
    },[id]);

    return {
        loading,
        blog,
    }
}
export const useBlogs= () =>{
    const [loading,setLoading] =useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
      axios.get(`${DATABASE_URL}/api/v1/blog/bulk` , {
        headers:{
            Authorization:localStorage.getItem('token')
        }
      })
            .then(response=>{
                setBlogs(response.data.blogs)
                setLoading(false);
            })
    },[]);

    return {
        loading,
        blogs,
    }
}