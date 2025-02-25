//定制请求的实例
import { useTokenStore } from '@/stores/token';
//导入axios  npm install axios
import axios from 'axios';
//定义一个变量,记录公共的前缀  ,  baseURL
import router from '@/router';
import { ElMessage } from 'element-plus';

const baseURL = '/api';
const instance = axios.create({baseURL})
instance.interceptors.request.use(
    (config) => {
        let tokenStore = useTokenStore()

        if(tokenStore.token){
            config.headers.Authorization=tokenStore.token
        }

        return config
    },
    (err) => {
        Promise.reject(err)
    }

)

//添加响应拦截器
instance.interceptors.response.use(
    
    result =>{
        if(result.data.code == 0){
            return result.data;
        }
        ElMessage.error(result.data.message || '服务异常');
        return Promise.reject(result.data);
    },
    err => {
        if(err.response.status === 401){
            ElMessage.error('请先登录！')
            router.push('/login')
        }else{
            ElMessage.error('服务异常');
        }

        return Promise.reject(err);
    }
)

export default instance;