<template>
    <section class="modelc">
            <div class="tool">
            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input v-model="filters.name" placeholder="模型名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="getModels">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleAdd">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            </div>
           <el-table
                   :data="models"
                   border
                   style="width: 100%"
                   highlight-current-row
                   max-height="250">
               <el-table-column
                       fixed
                       prop="ModId"
                       label="模型ID"
                       width="100">
               </el-table-column>
               <el-table-column
                       prop="ModName"
                       label="模型名称"
                       width="120">
               </el-table-column>
               <el-table-column
                       prop="ModType"
                       sortable
                       label="模型类型"
                       width="120">
               </el-table-column>
               <el-table-column
                       prop="Status"
                       label="类型"
                       width="120">
               </el-table-column>
               <el-table-column
                       prop="UserID"
                       label="用户id"
                       width="120">
               </el-table-column>
               <el-table-column
                       prop="ModDesc"
                       label="描述"
                       width="300">
               </el-table-column>
               <el-table-column
                       fixed="right"
                       label="操作"
                       inline-template :context="_self"
                       width="220">
                   <span>
                       <el-button
                               @click.native.prevent="handleEdit(row)"
                               type="text"
                               size="small">
                           编辑
                       </el-button>
                       <el-button
                               @click.native.prevent="deleteRow(row)"
                               type="text"
                               size="small">
                           移除
                       </el-button>
				    </span>
               </el-table-column>
           </el-table>

        <!--编辑界面-->
        <el-dialog :title="editFormTile" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="模型名称" prop="ModName">
                    <el-input v-model="editForm.ModName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="模型类型" prop="ModType">
                    <el-input v-model="editForm.ModType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input-number v-model="editForm.Status" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="用户id">
                    <el-input v-model="editForm.UserID" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" :rows="4" v-model="editForm.ModDesc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script type="text/ecmascript-6">
    import { getModels, removeModel, editModel, addModel } from '../../api/api';
    export  default {
        data (){
            return {
                models:[],
                filters: {
                    name: ''
                },
                editFormVisible:false,
                editFormTile: '编辑',//编辑界面标题
                //编辑界面数据
                editForm: {
                    id: null,
                    ModId: null,
                    ModName: '',
                    ModType: '',
                    Status: 1,
                    UserID: '',
                    ModDesc: ''
                },
                editLoading: false,
                btnEditText: '提 交',
                editFormRules: {
                    ModName: [
                        { required: true, message: '请输入模型名称', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            deleteRow(row) {
                let id = row.id
                console.log(id)
            },
            handleEdit(row){
                let id = row.id
                console.log(id)
                this.editFormVisible = true;
                this.editFormTile = '编辑';
                this.editForm.ModId = row.ModId;
                this.editForm.ModName = row.ModName;
                this.editForm.ModType = row.ModType;
                this.editForm.Status = row.Status;
                this.editForm.UserID = row.UserID;
                this.editForm.ModDesc = row.ModDesc;
            },
            handleAdd(){
                var _this = this;
                this.editFormVisible = true;
                this.editFormTile = '新增';
                this.editForm.ModId = 0;
                this.editForm.ModName = '';
                this.editForm.ModType = 1;
                this.editForm.Status = 1;
                this.editForm.UserID = '';
                this.editForm.ModDesc = '';
            },
            editSubmit: function () {
                var _this = this;

                _this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        _this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            _this.editLoading = true;
                            _this.btnEditText = '提交中';
                            if (_this.editForm.ModId == 0) {
                                //新增
                                let para = {
                                    ModName: _this.editForm.ModName,
                                    sex: _this.editForm.sex,
                                    age: _this.editForm.age,
                                    birth: _this.editForm.birth == '' ? '' : util.formatDate.format(new Date(_this.editForm.birth), 'yyyy-MM-dd'),
                                    addr: _this.editForm.addr,
                                };
                                addModel(para).then((res) => {
                                    _this.editLoading = false;
                                    _this.btnEditText = '提 交';
                                    _this.$notify({
                                        title: '成功',
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    _this.editFormVisible = false;
                                    _this.getModels();
                                });
                            } else {
                                //编辑
                                let para = {
                                    id: _this.editForm.id,
                                    name: _this.editForm.name,
                                    sex: _this.editForm.sex,
                                    age: _this.editForm.age,
                                    birth: _this.editForm.birth == '' ? '' : util.formatDate.format(new Date(_this.editForm.birth), 'yyyy-MM-dd'),
                                    addr: _this.editForm.addr,
                                };
                                editUser(para).then((res) => {
                                    _this.editLoading = false;
                                    NProgress.done();
                                    _this.btnEditText = '提 交';
                                    _this.$notify({
                                        title: '成功',
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    _this.editFormVisible = false;
                                    _this.getModels();
                                });
                            }
                        });
                    }
                });

            },
            getModels(){
                let self = this
                getModels({}).then(function (response) {
                    console.log(response);
                    self.models = response.data
                }).catch(function (error) {
                    console.log(error);
                })
            },
        },
        mounted() {
            console.log("mounted")
            this.getModels();
        }
    }
</script>

<style scoped>
    .modelc {
        margin-top: 30px;
    }
    .tool{
        margin-bottom: 10px;
    }
</style>