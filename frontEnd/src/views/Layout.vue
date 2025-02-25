<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png';
import { userInfoGetService } from '@/api/user';
import { useUserInfoStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useTokenStore } from '@/stores/token';

const tokenStore = useTokenStore()

const router = useRouter()

const userInfoStore = useUserInfoStore();

const handleCommand = (command) => {
    if(command === 'logout'){
        ElMessageBox.confirm(
            '您确认退出登录么？',
            '温馨提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
        .then(async () => {
                //用户点击了确认
                //清空pinia中的token和个人信息
                userInfoStore.info={}
                tokenStore.token=''
                //跳转到登录页
                router.push('/login')
            })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消退出',
            })
        })
    }
    else{
        router.push('/user/'+command)
    }
}

const getUserInf = async () => {
    let result = await userInfoGetService();
    userInfoStore.info = result.data
}

getUserInf()
</script>


<template>
    <el-container class="layout-container">
        <el-aside width="200px" class="el-aside">
            <div class="el-aside_logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router>
                
                <el-menu-item index="/article/category">
                    <el-icon>
                        <Management></Management>
                    </el-icon>
                    <span>文章分类</span>
                </el-menu-item>
                
                <el-menu-item index="/article/manage">
                    <el-icon>
                        <Promotion></Promotion>
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                
                
                <el-sub-menu>
                    
                    <template #title>
                        <el-icon>
                            <UserFilled></UserFilled>
                        </el-icon>
                        <span>个人中心</span>
                    </template>


                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User></User>
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>

                    <el-menu-item index = "/user/avatar">
                        <el-icon>
                            <Crop></Crop>
                        </el-icon>

                        <span>更换头像</span>
                    </el-menu-item>

                    <el-menu-item index = "/user/password">
                        <el-icon>
                            <EditPen></EditPen>
                        </el-icon>

                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>

        <el-container> 
            <el-header>
                <div>黑马程序员：<strong>{{userInfoStore.info.nickname ? userInfoStore.info.nickname:userInfoStore.info.username}}</strong></div>
                
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <sapn class="el-dropdown_box">
                        <el-avatar :src="userInfoStore.info.userPic ? userInfoStore.info.userPic : avatar"></el-avatar>
                        <el-icon>
                            <CaretBottom></CaretBottom>
                        </el-icon>
                    </sapn>
                    <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                                <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                                <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
                                <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>

            <el-main class="el-main">
                <div style="width: 1290px; height: 570px;border: 1px solid red;">
                    <router-view></router-view>
                </div>
            </el-main>

            <el-footer class="el-footer">
                大事件 ©2023 Created by 黑马程序员
            </el-footer>
        </el-container>
    </el-container>
</template>


<style lang="scss" scoped>
    .layout-container{
        height: 100vh;

        .el-aside{
            background-color: #232323;

            &_logo{
                height: 120px;
                background: url('@/assets/logo.png') no-repeat center / 120px auto
            }

            .el-menu{
                border-right: none;
            }
        }

        .el-header{
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .el-dropdown_box{
                display: flex;
                align-items: center;

                .el-icon{
                    color: #999;
                    margin-left: 10px;
                }

                &:active,
                &:focus{
                    outline: none;
                }
            }
        }

        .el-footer{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #666;
        }
    }
</style>