<script setup>
    import {Plus,Upload} from '@element-plus/icons-vue'
    import {ref} from 'vue'
    import avatar from '@/assets/avatar.jpg'

    const uploadRef = ref()

    const imgUrl = avatar
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>更换头像</span>
            </div>
        </template>

        <el-row>
            <el-col :span="12">
                <el-upload
                    ref="uploadRef"
                    class="avatar-uploader"
                    :show-file-list="false"
                >
                <img v-if="imgUrl" :src="imgUrl" class="avatar">
                <img v-else :src="avatar" width="278">
                </el-upload>

                <br />

                <el-button type="primary" :icon="Plus" size="large">
                    选择图片
                </el-button>

                <el-button type="success" :icon="Upload" size="large">
                    上传头像
                </el-button>
            </el-col>
        </el-row>
    </el-card>


</template>

<style lang="scss" scoped>
    .page-container{
        min-height: 100%;

        .avatar-uploader{
        :deep(){
            .avatar{
                width: 278px;
                height: 278px;
                display: block;
            }

            .el-upload{
                border: 1px dashed var(--el-border-color);
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                transition: var(--el-transition-duration-fast);

            }

            .el-upload:hover{
                border-color: var(--el-color-primary);
            }

            .el-icon.avatar-uploader-icon{
                font-size: 28px;
                color: #8c939d;
                width: 278px;
                height: 278px;
                text-align: center;
            }
        }
   }
    }
   
</style>