import request from '@/utils/request'
import { remove } from '@vue/shared'


export const registerService = (registerData) => {
    var params = new URLSearchParams()
    for(let key in registerData){
        params.append(key,registerData[key])
    }
    return request.post('/user/register',params)
}

export const loginService = (loginData) => {
    var params = new URLSearchParams()
    for(let key in loginData){
        params.append(key,loginData[key])
    }
    return request.post('/user/login',params)
}

export const userInfoGetService = () => {
    return request.get('/user/userInfo')
}

export const userInfoUpdateService = (userInfo) => {
    return request.put('/user/update',userInfo)
}

export const userPasswordUpdateService = (passwordInfo) => {
    return request.patch('/user/updatePwd',passwordInfo)
}