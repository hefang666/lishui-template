<template>
	<div class="page-box">
		<div class="select-box">
			<el-select v-model="pageSize" size="mini" @change="handleSizeChange">
				<el-option v-for="(item, index) in pageSizeData" :key="index" :label="item.value" :value="item.value"></el-option>
			</el-select>
		</div>
		<div class="pagination-box">
			<el-pagination
				background
				:small="true"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:pager-count="5"
				layout="pager"
				:page-size="pageSize"
				:total="total"
			></el-pagination>
			<div class="jump-box">
				<span>到第</span>
				<el-input class="jump-input" size="mini" type="text" v-model.number="inputPage" oninput="value=value.replace(/[^\d]/g,'')" @blur="getInputValue">
					{{ inputPage }}
				</el-input>
				<span>页</span>
				<el-button class="jump-button" type="primary" size="mini" @click="jump">跳转</el-button>
			</div>
		</div>
		<div>
			<span class="page-right">当前显示第 {{ startRecording }} 到 {{ endRecoeding }} 条记录; 共 {{ total }} 条记录</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Page',
	props: ['pageData', 'total'],
	data() {
		return {
			pageSize: 30,
			// 当前页码
			currentPage: 1,
			// input输入的页码
			inputPage: 1,
			pageSizeData: [],
			startRecording: 1,
			endRecoeding: 30
		};
	},
	methods: {
		// 获取每页多少条数据
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
			this.pageSize = val;
			this.getShowRecoeding();
			let data = {
				pageSize: this.pageSize
			};
			this.$emit('changePageSize', data);
		},
		// 获取当前选择了第几页
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
			this.currentPage = val;
			this.inputPage = val;
			this.getShowRecoeding();
			let data = {
				currentPage: this.currentPage
			};
			this.$emit('changeCurrentPage', data);
		},
		// 设置下拉框（可选择的每页数据是多少条）
		setPageSizeData(data) {
			this.pageSizeData = [];
			data.forEach(item => {
				this.pageSizeData.push({ value: item });
			});
		},
		// 获取输入框中的数值并进行处理
		getInputValue() {
			if (this.inputPage == '') {
				this.inputPage = 1;
			} else if (this.inputPage == 0) {
				this.inputPage = 1;
			} else if (this.inputPage > Math.ceil(this.$props.total / this.pageSize)) {
				this.inputPage = 1;
			}
		},
		// 获取当前显示的数据，如（1-30）
		getShowRecoeding() {
			this.startRecording = (this.currentPage - 1) * this.pageSize + 1;
			this.endRecoeding = this.currentPage * this.pageSize;
		},
		// 点击跳转
		jump() {
			this.currentPage = this.inputPage;

			this.getShowRecoeding();
			let data = {
				currentPage: this.currentPage
			};
			this.$emit('changeCurrentPage', data);
		}
	},
	mounted() {
		// 如果没有传入每页数据pageData,则使用默认
		if (this.$props.pageData == undefined) {
			this.setPageSizeData([30, 40, 50, 100]);
		} else {
			this.setPageSizeData(this.$props.pageData);
		}

		this.getShowRecoeding();
	}
};
</script>

<style scoped lang="scss">
.page-box {
	width: 100%;
	display: flex;

	.select-box {
		width: 70px;
	}

	.pagination-box {
		flex: 1;
		display: flex;

		.jump-box {
			font-weight: 400;

			span {
				font-size: 14px;
			}

			.jump-input {
				width: 60px;
				margin: 0 5px;

				
			}

			.jump-button {
				margin-left: 5px;
			}
		}
	}
	
	.page-right {
		font-size: 14px;
	}
	/deep/ .el-input--mini .el-input__inner {
		text-align: center;
	}
}
</style>
