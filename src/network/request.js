//将网络封装一个单独的文件，避免每个组件都对axios有依赖，使得项目便于维护
import axios from "axios";
export function request(config){
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  // return instance1(config)
  //2、axios的拦截器
  //2.1、请求拦截的作用
  instance.interceptors.request.use(config=>{
    //1.比如config中的一些信息不符合服务器的要求

    //2.比如每次发送请求时，都希望在界面中出现旋转图标

    //3.某些网络请求（比如token），必须携带一些信息
    return config
  },err=>{
    //发送请求失败，一般不会来到这里
  })
  //2.2、响应拦截
    instance.interceptors.response.use(res=>{
      return res.data
    },error => {
      console.log(error);
    })
  //3、返回实例
  return instance(config)
}

