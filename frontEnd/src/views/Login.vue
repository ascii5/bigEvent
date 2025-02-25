
<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <el-form ref="form" :model="registerData" :rules="registerDataRules" size="large" autocomplete="off" v-if="isRegister">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item>
                    <el-input :prefix-icon="User" v-model="registerData.username" placeholder= "请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input :prefix-icon="Lock" v-model="registerData.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input :prefix-icon="Lock" v-model="registerData.rePassword" type="password" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>


            <el-form ref="form" :model="registerData" :rules="registerDataRules" size="large" autocomplete="off" v-else>
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" v-model="registerData.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                 
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" v-model="registerData.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>
                            记住我
                        </el-checkbox>

                        <el-link type="primary" :underline="false">忘记密码?</el-link>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script setup>
    import {User,Lock} from '@element-plus/icons-vue'
    import {ref} from 'vue'
    import { registerService } from '@/api/user';
    import { loginService } from '@/api/user';
    import { useTokenStore } from '@/stores/token';
    import { ElMessage } from 'element-plus';
    import router from '@/router';
    const tokenStore = useTokenStore();

    

    const isRegister = ref(false);

    const registerData = ref({
        username: '',
        password: '',
        rePassword: ''
    })
    
    const username = '';

    const rePasswordValid = (rule,value,callback) => {
        if(value == null || value === ''){
            return callback(new Error('请再次确认密码'))
        }
        if(registerData.value.password !== value){
            return callback(new Error('两次密码输入不一致'))
        }
    }

    const registerDataRules = ref({
        username: [
            {required: true,message: '请输入用户名',trigger: 'blur'},
            {min: 5,max: 16,message: '用户名的长度必须是5~16位',trigger: 'blur'}
        ],
        password:[
            {required: true,message:'请输入密码',trigger:'blur'},
            {min: 5,max: 16,message:'密码长度必须为5~16位',trigger: 'blur'}
        ]
    })

    const register = async () => {

        try {
            let result = await registerService(registerData.value);
            if(result.code == 0){
                alert("注册成功！")
            }else{
                alert("注册失败！")
            }
        } catch (error) {
            console.error("注册请求出错",error);
            alert("注册请求出错");
        }
        
    }

    const clearRegisterData = () => {
       registerData.value = {
        username: '',
        password: '',
        rePassword: ''
       } 
    }

   

    //用于登录的事件函数
    const login = async () => {
        let result = await loginService(registerData.value)
        //保存token
        tokenStore.setToken(result.data)
    
        ElMessage.success('登录成功!')
        router.push('/')
    }

</script>  
<style lang="scss" scoped>
    .login-page{
        height: 100vh;
        background-color: #fff;

        .bg{
            background:
                url('@/assets/logo2.png') no-repeat 60% center / 240px auto, 
                url('@/assets/login_bg.jpg') no-repeat center / cover;
            ;
            border-radius: 0 20px 20px 0;
        }

        .form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            user-select: none;

            .title{
                margin: 0 auto;
            }

            .button{
                width: 100%;
            }

            .flex{
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>