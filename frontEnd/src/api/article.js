import request from '@/utils/request'
import { useTokenStore } from '@/stores/token'

export const articleCategoryListService = () => {
    const tokenStore = useTokenStore()
    return request.get('/category',{headers:{'Authorization': tokenStore.tokn}})
}

export const articleCategoryAddService = (categoryModel) => {
    return request.post('/category',categoryModel)
}

export const articleCategoryUpdateService = (categoryModel) => {
    return request.put('/category',categoryModel)
}

export const articleCategoryDeleteService = (id) => {
    return request.delete('/category?id='+id)
}

export const articleListService = (params) => {
    return request.get('/article',{params:params})
}

export const articleAddService = (articleModel) => {
    return request.post('/article',articleModel)
}

export const articleDeleteService = (id) => {
    return request.delete('/article?id='+id)
}

export const articleUpdateService = (articleModel,id) => {
    return request.put(`/article/${id}`,articleModel)
}