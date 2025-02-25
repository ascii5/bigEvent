<script setup>
    import { ElMessage } from 'element-plus';
    import { ref } from 'vue';
    import { userPasswordUpdateService } from '@/api/user';


    const formRef = ref(null)
    
    const updateUserPassword = async () => {
        let result = await userPasswordUpdateService(form.value)

    }

    const reset = () => {
        formRef.value.resetFields(form.value.oldPassword,form.value.newPassword)
    }

    const changePassword = () => {
       formRef.value.validate((valid) => {
        if(valid){
            updateUserPassword()
            ElMessage.success('表单提交成功')    
        }
        else{
            ElMessage.error('表单校验失败')
        }
       })
    }

    const rules = {
        oldPassword: [
            {required: true,message: '请输入旧密码',trigger: 'blur'}
        ],
        newPassword:[
            {required: true,message: '请输入新密码',trigger: 'blur'}
        ],
        rePassword:[
            {required: true,message: '请重复输入新密码',trigger: 'blur'},
            {
                validator: validateConfirm
            }
        ]
    }


    const form = ref({
        oldPassword: '',
        newPassword: '',
        rePassword: ''
    })

    // 自定义验证函数，用于验证重复输入的新密码是否与新密码一致
    function validateConfirm(rule, value, callback) {
        const formNewPassword = form.value.newPassword
        const formData = {
            newPassword: formNewPassword, // 这里只是示例，实际应从表单获取新密码的值
            rePassword: value
        }
        if (formData.newPassword === formData.rePassword) {
            callback(); // 验证通过，调用回调函数
        } else {
           
            callback(new Error('两次输入的新密码不一致')); // 验证失败，传递错误信息给回调函数
        }
    }
</script>

<template>
    <el-card class="container">
        <template #header>
            <span>重置密码</span>
        </template>

        <el-row>
            <el-col :span="12">
                <el-form :model="form" :rules="rules" label="原密码"  label-width="100px"  size="large" ref="formRef">
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input v-model="form.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input v-model="form.newPassword"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="确认新密码" prop="rePassword">
                        <el-input v-model="form.rePassword"></el-input>
                    </el-form-item>
                
                    <el-form-item>
                        <el-button @click="changePassword" type="primary" size="large" style="width: 100px;">修改密码</el-button>

                        <el-button @click="reset" size="large" style="width: 100px;">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
    </el-card>
</template>

<style lang="scss" scoped>
    .container{
        min-height: 100%;
    }
</style>