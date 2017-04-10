<template>
<section class="varisty">
    <div class="tool">
    <!--工具条-->
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input v-model="filter" placeholder="变量ID"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="searchVari">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleAdd">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            </div>

        <el-table
		 :data="varis"
                   border
                   style="width: 100%"
                   highlight-current-row
                   >
               <el-table-column
				   fixed
                   prop="VariID"
                   label="指标编号"
                   width="150">
               </el-table-column>
			   <el-table-column
				   prop ="VariCode"
				   label = "指标编码"
				   width="150">
			   </el-table-column>
			   <el-table-column
				   prop ="VariName"
				   label = "指标名称"
				   width="150"
				   :formatter="formatter">
			    </el-table-column>
			    <el-table-column
				   prop ="VariType"
				   label = "指标类型"
				   width="150">
				</el-table-column>
				<el-table-column
				   prop ="VariTag"
				   label = "指标标记"
				   width="150">
				</el-table-column>
                <el-table-column
				   prop ="VariSrc"
				   label = "计算指标的源数据"
				   width="150"
				   :formatter="formatter">
				</el-table-column>
				<el-table-column
				   prop ="SrcCol"
				   label = "源的字段名"
				   width="150">
				</el-table-column>
				<el-table-column
				   prop ="SrcColType"
				   label = "源的字段类型"
				   width="150">
				</el-table-column>
				<el-table-column
                    prop ="SrcCondition"
                	label = "源的获取条件"
                	width="150">
                </el-table-column>
				<el-table-column
                       fixed="right"
                       label="操作"
                       inline-template :context="_self"
                       width="200">
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
            <el-form :model="editForm" label-width="120px" :varis="editFormVaris" ref="editForm">
                <el-form-item label="指标编号" prop="VariID">
                    <el-input v-model="editForm.VariID" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="指标编码" prop="VariCode">
                    <el-input v-model="editForm.VariCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="指标名称" prop="VariName">
                    <el-input v-model="editForm.VariName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="指标类型" prop="VariType">
                     <el-input v-model="editForm.VariType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="指标标记" prop="VariTag">
                    <el-input v-model="editForm.VariTag" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="计算指标的源数据" prop="VariSrc">
                    <el-input v-model="editForm.VariSrc" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="源的字段名" prop="SrcCol">
                    <el-input v-model="editForm.SrcCol" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="源的字段类型" prop="SrcColType">
                     <el-input v-model="editForm.SrcColType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="源的获取条件" prop="SrcCondition">
                     <el-input v-model="editForm.SrcCondition" auto-complete="off"></el-input>
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
	import { getVaris,editVari,deleteVari,addVari,searchRuleByVariID} from '../../api/api';
	export  default {
		data(){
		return{
                varis:[],
                filters: {
                    name: ''
                },
				variStatus:['无效','有效'],
				filter:'',
                editFormVisible:false,
                editFormTile: '编辑',//编辑界面标题
                //编辑界面数据
                editForm: {
                    id: null,
					"VariID": '',
					"VariCode": '',
					"VariName": '',
					"VariType": '',
					"VariTag": '',
					"VariSrc": '',
					"SrcCol": '',
					"SrcColType": '',
					"SrcCondition": ''
                },
                editLoading: false,
                btnEditText: '提 交',
                editFormVaris: {

                }
            };
		},

		methods:{
			formatter(row, column) {
				let idx = parseInt(row.Status);
				//console.log('idx is '+idx + this.variStatus[idx]);
				return this.variStatus[idx];
			  },
		 deleteRow(row) {
					let id = row.id
					console.log(id)
					let para = {
						id:row.id,
                        VariID: row.VariID,
                        VariCode: row.VariCode,
                        VariName: row.VariName,
                        VariType: row.VariType,
                        VariTag: row.VariTag,
                        VariSrc: row.VariSrc,
                        SrcCol: row.SrcCol,
                        SrcColType: row.SrcColType,
                        SrcCondition: row.SrcCondition,
					};
					deleteRule(para).then((res) => {
					console.log("已删除")
					this.getVaris();
					});
				},
				handleEdit(row){
					let id = row.id
					console.log(id)
					this.editFormVisible = true;
					this.editFormTile = '编辑';
					this.editForm.VariID = row.VariID;
					this.editForm.VariCode = row.VariCode;
					this.editForm.VariName = row.VariName;
					this.editForm.VariType = row.VariType;
					this.editForm.VariTag = row.VariTag;
					this.editForm.VariSrc = row.VariSrc;
					this.editForm.SrcCol = row.SrcCol;
					this.editForm.SrcColType = row.SrcColType;
					this.editForm.SrcCondition = row.SrcCondition;
				},
				handleAdd(){
					//var _this = this;
					this.editFormVisible = true;
					this.editFormTile = '新增';
					this.editForm.VariID = '';
					this.editForm.VariCode = '';
					this.editForm.VariName = '';
					this.editForm.VariType = 1;
					this.editForm.VariTag = 0;
					this.editForm.VariSrc = '';
					this.editForm.SrcCol = '';
					this.editForm.SrcColType = '';
					this.editForm.SrcCondition = '';
				},
				getVaris(){
					getVaris({}).then(function (response) {
						console.log(response);
						this.varis = response.data
					}.bind(this)).catch(function (error) {
						console.log(error);
					})
				},
				searchVari(){
					let param = {
						VariID: this.filter,
					};
					let variID = param['VariID'];
					if(!variID){
                        this.getVaris();
					    return;
                    }
					console.log(variID);
					searchRuleByVariID(param).then(function (res){
						console.log(res);
						this.varis = res.data
					}.bind(this)).catch(function (err){
						alert(err);
						console.log(err);
					})

				},
				 editSubmit: function () {
					var _this = this;

					_this.$refs.editForm.validate((valid) => {
						if (valid) {
							_this.$confirm('确认提交吗？', '提示', {}).then(() => {
								_this.editLoading = true;
								_this.btnEditText = '提交中';
								if (_this.editFormTile =='新增') {
									//新增
									console.log(".......");
									let para = {
										VariID: _this.editForm.VariID,
										VariCode: _this.editForm.VariCode,
										VariName: _this.editForm.VariName,
										VariType: _this.editForm.VariType,
										VariTag: _this.editForm.VariTag,
										VariSrc: _this.editForm.VariSrc,
										SrcCol: _this.editForm.SrcCol,
										SrcColType: _this.editForm.SrcColType,
										SrcCondition: _this.editForm.SrcCondition
									};
									addVari(para).then((res) => {
										_this.editLoading = false;
										_this.btnEditText = '提 交';
										_this.$notify({
											title: '成功',
											message: '提交成功',
											type: 'success'
										});
										_this.editFormVisible = false;
										_this.getVaris();
									});
								} else {
									//编辑
									console.log("else.......");
									let para = {
										id:_this.editForm.VariID,
                                        VariID: _this.editForm.VariID,
										VariCode: _this.editForm.VariCode,
										VariName: _this.editForm.VariName,
										VariType: _this.editForm.VariType,
										VariTag: _this.editForm.VariTag,
										VariSrc: _this.editForm.VariSrc,
										SrcCol: _this.editForm.SrcCol,
										SrcColType: _this.editForm.SrcColType,
										SrcCondition: _this.editForm.SrcCondition,
									};
									editVari(para).then((res) => {
										_this.editLoading = false;
										_this.btnEditText = '提 交';
										_this.$notify({
											title: '成功',
											message: '提交成功',
											type: 'success'
										});
										_this.editFormVisible = false;
										_this.getVaris();
                                });
                            }
                        });
                    }
                });

            },


		},
		mounted(){
				this.getVaris();
				}
	}
</script>

<style scoped>
	.varisty {
        margin-top: 30px;
    }
    .tool{
        margin-bottom: 10px;
    }

</style>