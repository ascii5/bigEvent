import { createRouter,createWebHistory } from "vue-router";
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import ArticleCategoryVue from '@/views/ArticleCategory.vue'
import ArticleManageVue from "@/views/ArticleManage.vue";
import UserInfoVue from '@/views/UserInfo.vue';
import UserAvatarVue from "@/views/UserAvatar.vue";
import UserResetPasswordVue from "@/views/UserResetPassword.vue";

const routes = [
    {path: '/login',component: LoginVue},
    {
        path: '/',
        component: LayoutVue,
        redirect: '/article/manage',
        children:[
             {path: '/article/category',component: ArticleCategoryVue},
             {path:'/article/manage',component: ArticleManageVue},
             {path:'/user/info',component: UserInfoVue},
             {path:'/user/avatar',component: UserAvatarVue},
             {path:'/user/password',component: UserResetPasswordVue}
         ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router