<template>
	<div class="choosePeople-box dialog-box button-box">
		<el-dialog title="选择路线" :visible.sync="dialogArea">
			<div class="content-box">
				<div class="table-box">
					<el-table
						ref="multipleTable"
						:data="tableData"
						:stripe="true"
						tooltip-effect="dark"
						height="400"
						style="width: 100%"
						:highlight-current-row="true"
						@row-click="clickRow"
					>
						<el-table-column align="center" prop="name" label="片区名称"></el-table-column>
						<el-table-column align="center" prop="pipeLength" label="管道长度"></el-table-column>
						<el-table-column align="center" prop="number" label="设备点数量"></el-table-column>
						<el-table-column align="center" label="操作">
							<template slot-scope="scope">
								<el-button type="text" class="operate-button" @click="handleSee(scope.$index, scope.row)">查看</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<page :pageData="[30, 40, 50, 100]" :total="400" @changePageSize="changePageSize" @changeCurrentPage="changeCurrentPage"></page>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeChooseArea">返回</el-button>
				<el-button type="primary" @click="determine">确 定</el-button>
			</div>
			
		</el-dialog>
	</div>
</template>

<script>
import Page from '@/components/page/Page.vue';
export default {
	name: 'ChooseArea',
	props: ['dialogArea'],
	components: {
		Page
	},
	data() {
		return {
			searchWords: '',
			tableData: [
				{
					name: '东城片区路线',
					pipeLength: '5KM',
					number: 15
				},
				{
					name: '东城片区路线1',
					pipeLength: '10KM',
					number: 15
				},
				{
					name: '东城片区路线2',
					pipeLength: '5KM',
					number: 10
				}
			],
			checkedName: ''
		};
	},
	methods: {
		closeChooseArea() {
			let data = {
				dialogArea: false
			};
			this.$emit('closeChooseArea', data);
		},
		// 选中的行
		clickRow(val) {
			console.log(val);
			this.checkedName = val.name;
		},
		// 点击确定
		determine() {
			if (this.checkedName == '') {
				alert('请选择巡检片区！');
				return;
			} else {
				let data = {
					// name: this.checkedName,
					dialogArea: false
				};

				this.$emit('checkedArea', data);
			}
		},
		// 获取从分页传过来的每页多少条数据
		changePageSize(data) {
			console.log(data);
		},
		// 获取从分页传过来的当前页数
		changeCurrentPage(data) {
			console.log(data);
		},
		// 查看按钮
		handleSee() {}
	},
	mounted() {}
};
</script>

<style scoped lang="scss">
.content-box {
	position: relative;

	.cancel-box {
		width: 20px;
		height: 20px;
		background: #4b77be;
		position: absolute;
		top: -42px;
		right: 0;
		z-index: 20;
		color: #ffffff;
		font-size: 20px;
	}

	.search-box {
		display: flex;

		.el-input {
			width: 200px;
		}

		.search-button {
			margin-left: 5px;
		}
	}

	.table-box {
		margin: 10px 0;
		border: 1px solid #ddd;
		box-sizing: border-box;

		.el-table--striped .el-table__body tr.el-table__row--striped.el-table__row--striped.el-table__row--striped td {
			background-color: #f5f5f5;
		}

		.operate-button {
			color: #337ab7;
		}

		.operate-button:hover {
			color: #23527c;
			text-decoration: underline;
		}
	}
}
</style>
