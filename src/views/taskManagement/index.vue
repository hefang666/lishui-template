<template>
	<div class="task_management_pages">
		<div class="header-box">
			<div class="header-left">
				<el-button-group>
					<el-button type="primary" plain>全部</el-button>
					<el-button type="primary" plain>待完成</el-button>
					<el-button type="primary" plain>进行中</el-button>
					<el-button type="primary" plain>已超期</el-button>
					<el-button type="primary" plain>暂停</el-button>
					<el-button type="primary" plain>已完成</el-button>
					<el-button type="primary" plain>已关闭</el-button>
				</el-button-group>
				<div class="search-box">
					<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchWords"></el-input>
					<el-button class="search-button" type="primary">查询</el-button>
				</div>
			</div>
			<div class="header-right">
				<el-button-group>
					<el-button type="primary" plain @click="addTask">新增</el-button>
					<el-button type="primary" plain>删除</el-button>
					<el-button type="primary" plain>暂停</el-button>
					<el-button type="primary" plain>导出</el-button>
				</el-button-group>
			</div>
		</div>
		<div class="content-box">
			<div class="table-box">
				<el-table
					ref="multipleTable"
					:data="tableData"
					:row-class-name="tableRowClassName"
					tooltip-effect="dark"
					height="830"
					style="width: 100%"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column prop="taskName" label="任务名称" min-width="120" show-overflow-tooltip></el-table-column>
					<el-table-column prop="taskType" label="任务类别" width="120"></el-table-column>
					<el-table-column prop="inCharge" label="负责人" show-overflow-tooltip></el-table-column>
					<el-table-column prop="player" label="参与人" show-overflow-tooltip></el-table-column>
					<el-table-column prop="estimatedStartTime" min-width="110" label="预计开始时间" show-overflow-tooltip></el-table-column>
					<el-table-column prop="estimatedEndTime" min-width="110" label="预计完成时间" show-overflow-tooltip></el-table-column>
					<el-table-column prop="actualCompletionTime" min-width="110" label="实际完成时间" show-overflow-tooltip></el-table-column>
					<el-table-column prop="timeOut" label="暂停时长" show-overflow-tooltip></el-table-column>
					<el-table-column prop="missionStatus" label="任务状态" show-overflow-tooltip></el-table-column>
					<el-table-column label="操作" min-width="200">
						<template slot-scope="scope">
							<el-button type="text" class="operate-button operate-button-active" disabled="disabled" @click="handleEdit(scope.$index, scope.row)">关闭</el-button>
							<el-button type="text" class="operate-button" @click="handleDelete(scope.$index, scope.row)">完成</el-button>
							<el-button type="text" class="operate-button" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
							<el-button type="text" class="operate-button" @click="handleDelete(scope.$index, scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pages-box">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[10, 20, 30, 50]"
					:page-size="100"
					:pager-count="5"
					layout="sizes, prev, pager, next, jumper, total"
					:total="400"
				></el-pagination>
			</div>
		</div>

		<!-- 新增任务弹框 -->
		<el-dialog title="新增任务" :visible.sync="dialogAdd">
			<el-form :model="addForm">
				<div class="list-item">
					<el-form-item class="has-two-item" label="任务名称：" label-width="120px" prop="taskName" :rules="[{ required: true, message: '任务名称不能为空' }]">
						<el-input type="taskName" v-model="addForm.taskName" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item class="has-two-item" label="任务负责人：" label-width="120px" prop="inCharge" :rules="[{ required: true, message: '任务负责人不能为空' }]">
						<el-input type="inCharge" v-model="addForm.inCharge" autocomplete="off"></el-input>
					</el-form-item>
				</div>
				<div class="list-item">
					<el-form-item class="has-two-item" label="开始时间：" label-width="120px" prop="estimatedStartTime" :rules="[{ required: true, message: '开始时间不能为空' }]">
						<el-input type="estimatedStartTime" v-model="addForm.estimatedStartTime" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item
						class="has-two-item"
						label="预计结束时间："
						label-width="120px"
						prop="estimatedEndTime"
						:rules="[{ required: true, message: '预计结束时间不能为空' }]"
					>
						<el-input type="estimatedEndTime" v-model="addForm.estimatedEndTime" autocomplete="off"></el-input>
					</el-form-item>
				</div>
				<div class="list-item">
					<el-form-item class="has-two-item" label="任务类别：" label-width="120px" prop="taskType" :rules="[{ required: true, message: '任务类别不能为空', trigger: 'change' }]">
						<el-select v-model="addForm.taskType" placeholder="请选择任务类别">
							<el-option label="普通任务" value="puTong"></el-option>
							<el-option label="临时任务" value="liShi"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="has-two-item" label="巡检片区：" label-width="120px" prop="inspectionArea" :rules="[{ required: true, message: '巡检片区不能为空' }]">
						<el-input type="inspectionArea" v-model="addForm.inspectionArea" autocomplete="off"></el-input>
					</el-form-item>
				</div>
				<el-form-item label="备注：" label-width="120px"><el-input type="textarea" :rows="3" v-model="addForm.remarks" autocomplete="off"></el-input></el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeAdd">取 消</el-button>
				<el-button type="primary" @click="closeAdd">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'TaskManagement',
	data() {
		return {
			searchWords: '',
			tableData: [
				{
					taskName: '巡检任务',
					taskType: '临时任务',
					inCharge: '张三',
					player: '李四、王五',
					estimatedStartTime: '2019-01-01 9:00',
					estimatedEndTime: '2019-01-01 17:00',
					actualCompletionTime: ' ',
					timeOut: '3小时20分',
					missionStatus: '待完成'
				},
				{
					taskName: '巡检任务',
					taskType: '临时任务',
					inCharge: '张三',
					player: '李四、王五',
					estimatedStartTime: '2019-01-01 9:00',
					estimatedEndTime: '2019-01-01 17:00',
					actualCompletionTime: ' ',
					timeOut: '3小时20分',
					missionStatus: '待完成'
				},
				{
					taskName: '巡检任务',
					taskType: '临时任务',
					inCharge: '张三',
					player: '李四、王五',
					estimatedStartTime: '2019-01-01 9:00',
					estimatedEndTime: '2019-01-01 17:00',
					actualCompletionTime: ' ',
					timeOut: '3小时20分',
					missionStatus: '待完成'
				},
				{
					taskName: '巡检任务',
					taskType: '临时任务',
					inCharge: '张三',
					player: '李四、王五',
					estimatedStartTime: '2019-01-01 9:00',
					estimatedEndTime: '2019-01-01 17:00',
					actualCompletionTime: ' ',
					timeOut: '3小时20分',
					missionStatus: '待完成'
				},
				{
					taskName: '巡检任务',
					taskType: '临时任务',
					inCharge: '张三',
					player: '李四、王五',
					estimatedStartTime: '2019-01-01 9:00',
					estimatedEndTime: '2019-01-01 17:00',
					actualCompletionTime: ' ',
					timeOut: '3小时20分',
					missionStatus: '待完成'
				},
				{
					taskName: '巡检任务',
					taskType: '临时任务',
					inCharge: '张三',
					player: '李四、王五',
					estimatedStartTime: '2019-01-01 9:00',
					estimatedEndTime: '2019-01-01 17:00',
					actualCompletionTime: ' ',
					timeOut: '3小时20分',
					missionStatus: '待完成'
				}
			],
			multipleSelection: [],

			// 当前分页
			currentPage: 1,

			// 是否显示新增弹窗
			dialogAdd: true,
			addForm: {
				taskName: '',
				inCharge: '',
				estimatedStartTime: '',
				estimatedEndTime: '',
				taskType: '',
				inspectionArea: '',
				remarks: ''
			}
		};
	},
	methods: {
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
		tableRowClassName() {},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},

		// 打开新增弹窗
		addTask() {
			this.dialogAdd = true;
		},
		// 关闭新增弹窗
		closeAdd() {
			this.dialogAdd = false;
		}
	},
	mounted() {}
};
</script>
<style lang="scss">
@import '../../styles/element-ui-new.scss';
</style>
<style scoped lang="scss">

.task_management_pages {
	padding: 10px;

	.header-box {
		display: flex;
		justify-content: space-between;

		.header-left {
			display: flex;

			.search-box {
				margin-left: 20px;
				display: flex;

				.search-button {
					margin-left: 5px;
				}
			}
		}
	}

	.content-box {
		margin-top: 10px;

		.table-box {
			border: 1px solid #ddd;
			box-sizing: border-box;

			.operate-button {
				width: 35px;
				text-align: center;
				display: inline-block;
				color: #4b77be;
			}

			.operate-button:hover {
				cursor: pointer;
			}

			.operate-button-active {
				color: #3d3d3d;
			}

			.operate-button-active:hover {
				cursor: default;
			}
		}

		.page-box {
			margin-top: 10px;
		}
	}

	.list-item {
		display: flex;
		justify-content: space-between;

		.has-two-item {
			width: 46%;
		}
	}

	// .has-two-item:nth-of-type(odd) {
	// 	float: left;
	// }

	// .has-two-item:nth-of-type(even) {
	// 	float: right;
	// }
}
</style>
