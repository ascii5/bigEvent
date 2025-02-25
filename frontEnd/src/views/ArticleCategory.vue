<script setup>
    import{
        Edit,
        Delete
    } from '@element-plus/icons-vue'

    import { ref } from 'vue'
    import { articleCategoryAddService, articleCategoryDeleteService, articleCategoryListService,articleCategoryUpdateService } from '@/api/article';
    import { Value } from 'sass';
    import { ElMessage, ElMessageBox } from 'element-plus';

    const dialogVisible = ref(false)

    var categorys = ref(null)

    const getAllCategory = async () => {
        
        let result = await articleCategoryListService();
        console.log(result.data);
        categorys.value = result.data;
        
    }

    
    getAllCategory()
    


    const categoryModel = ref({
        categoryName: '',
        categoryAlias: ''
    })

    const rules = {
        categoryName:[
            {required: true,message: '请输入分类名称',trigger: 'blur'},
        ],
        categoryAlias:[
            {required: true,message: '请输入分类别名',trigger: 'blur'},
        ]
    }

    const addCategory = async () => {
        let result = await articleCategoryAddService(categoryModel.value)
        ElMessage.success(result.message? result.message: '添加成功')
        dialogVisible.value = false
        getAllCategory()
    }

    const title = ref('')

    const updateCategoryEcho = (row) => {
        title.value = '修改分类'
        dialogVisible.value = true
        categoryModel.value.categoryName = row.categoryName
        categoryModel.value.categoryAlias = row.categoryAlias
        categoryModel.value.id = row.id
    }

    const updateCategory = async () => {
        let result = await articleCategoryUpdateService(categoryModel.value)
        ElMessage.success(result.message ? result.message:'修改成功')
        dialogVisible.value = false
        getAllCategory()
    }

    const clearCategoryModel = () => {
        categoryModel.value.categoryName = '',
        categoryModel.value.categoryAlias = ''
    }

    const deleteCategory = (row) => {
        ElMessageBox.confirm(
            '您确认删除该分类吗？',
            '温馨提示',
            {
                confiremButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async () => {
                let result = await articleCategoryDeleteService(row.id)
                ElMessage.success(result.message ? result.message:'删除成功')
                getAllCategory()
            })

            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消删除',
                })
            })
    }
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary" @click="title='添加分类';dialogVisible = true;clearCategoryModel()">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100%" type="index"></el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default = "{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="updateCategoryEcho(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click = "deleteCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据"></el-empty>
            </template>
            
        </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="title" width="30%">
        <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px;">
            <el-form-item label="分类名称" prop="categoryName">
                <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
            </el-form-item>

            <el-form-item label="分类别名" prop="categoryAlias">
                <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="10"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="title === '添加分类' ? addCategory() : updateCategory()">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>
    .page-container{
        min-height: 100%;
        box-sizing: border-box;


        .header{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

</style>