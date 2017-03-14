<template>
<section class="rulesty">
    <div class="tool">
    <!--工具条-->
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input v-model="filter" placeholder="规则ID"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="searchRule">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleAdd">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            </div>
    
        <el-table
		 :data="rules"
                   border
                   style="width: 100%"
                   highlight-current-row
                   >
               <el-table-column
				   fixed
                   prop="RuleID"
                   label="规则ID"
                   width="150">
               </el-table-column>
			   <el-table-column
				   prop ="RuleType"
				   label = "规则类型"
				   width="150">
				</el-table-column>
				<el-table-column
				   prop ="Status"
				   label = "状态"
				   width="150"
				   :formatter="formatter">
				</el-table-column>
				<el-table-column
				   prop ="RuleDesc"
				   label = "描述"
				   width="250">
				</el-table-column>
				<el-table-column
				   prop ="RuleContext"
				   label = "内容"
				   width="500">
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
            <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="规则ID" prop="RuleID">
                    <el-input v-model="editForm.RuleID" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="规则类型" prop="RuleType">
                    <el-input v-model="editForm.RuleType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input-number v-model="editForm.Status" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="editForm.RuleContext" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" :rows="4" v-model="editForm.RuleDesc"></el-input>
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
	import { getRules,editRule,deleteRule,addRule,searchRuleByRuleID} from '../../api/api';
	export  default {
		data(){
		return{
                rules:[],
                filters: {
                    name: ''
                },
				ruleStatus:['无效','有效'],
				filter:'',
                editFormVisible:false,
                editFormTile: '编辑',//编辑界面标题
                //编辑界面数据
                editForm: {
                    id: null,
					"RuleID": '',
					"RuleType": '',
					"RuleContext": '',
					"Status": '',
					"RuleDesc": ''
                },
                editLoading: false,
                btnEditText: '提 交',
                editFormRules: {
                    
                }
            };
		},
		
		methods:{
			formatter(row, column) {
				let idx = parseInt(row.Status);
				//console.log('idx is '+idx + this.ruleStatus[idx]);
				return this.ruleStatus[idx];
			  },
		 deleteRow(row) {
					let id = row.id
					console.log(id)
					let para = {
						id:row.id,
                        RuleID: row.RuleID,
                        RuleType: row.RuleType,
                        Status: row.Status,
                        RuleContext: row.RuleContext,
                        RuleDesc: row.RuleDesc,
					};
					deleteRule(para).then((res) => {
					console.log("已删除")
					this.getRules();
					});
				},
				handleEdit(row){
					let id = row.id
					console.log(id)
					this.editFormVisible = true;
					this.editFormTile = '编辑';
					this.editForm.RuleID = row.RuleID;
					this.editForm.RuleContext = row.RuleContext;
					this.editForm.RuleType = row.RuleType;
					this.editForm.Status = row.Status;
					this.editForm.RuleDesc = row.RuleDesc;
				},
				handleAdd(){
					//var _this = this;
					this.editFormVisible = true;
					this.editFormTile = '新增';
					this.editForm.RuleID = 0;
					this.editForm.RuleContext = '';
					this.editForm.RuleType = 1;
					this.editForm.Status = 1;
					this.editForm.RuleDesc = '';
				},
				getRules(){
					getRules({}).then(function (response) {
						console.log(response);
						this.rules = response.data
					}.bind(this)).catch(function (error) {
						console.log(error);
					})
				},
				searchRule(){
					let param = {
						RuleID: this.filter,
					};
					let ruleID = param['RuleID'];
					if(!ruleID){
                        this.getRules();
					    return;
                    }
					console.log(ruleID);
					searchRuleByRuleID(param).then(function (res){
						console.log(res);
						this.rules = res.data
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
										RuleID: _this.editForm.RuleID,
										RuleContext: _this.editForm.RuleContext,
										RuleType: _this.editForm.RuleType,
										Status: _this.editForm.Status,
										RuleDesc: _this.editForm.RuleDesc,
									};
									addRule(para).then((res) => {
										_this.editLoading = false;
										_this.btnEditText = '提 交';
										_this.$notify({
											title: '成功',
											message: '提交成功',
											type: 'success'
										});
										_this.editFormVisible = false;
										_this.getRules();
									});
								} else {
									//编辑
									console.log("else.......");
									let para = {
										id:_this.editForm.RuleID,
										RuleID: _this.editForm.RuleID,
										RuleContext: _this.editForm.RuleContext,
										RuleType: _this.editForm.RuleType,
										Status: _this.editForm.Status,
										RuleDesc: _this.editForm.RuleDesc,
									};
									editRule(para).then((res) => {
										_this.editLoading = false;
										_this.btnEditText = '提 交';
										_this.$notify({
											title: '成功',
											message: '提交成功',
											type: 'success'
										});
										_this.editFormVisible = false;
										_this.getRules();
                                });
                            }
                        });
                    }
                });

            },
				
			
		},
		mounted(){
				this.getRules();
				}
	}
</script>

<style scoped>
	.rulesty {
        margin-top: 30px;
    }
    .tool{
        margin-bottom: 10px;
    }

</style>