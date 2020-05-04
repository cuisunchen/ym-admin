<template>
  <div class="app-container businessAccount-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单编号">
        <el-input v-model="orderID" placeholder="请输入订单编号" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="mobile" placeholder="请输入订手机号" />
      </el-form-item>
      <el-form-item label="充值时间">
        <el-input v-model="mobile" placeholder="请输入充值时间" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        type="index"
        width="30"
      />
      <el-table-column
        align="center"
        prop="id"
        label="用户id"
        width="150"
      />
      <!-- 点击跳到订单管理表格 -->
      <el-table-column
        align="center"
        prop="mobile"
        label="订单编号"
        width="200"
      />
      <el-table-column
        align="center"
        prop="mobile"
        label="充值编号"
        width="200"
      />
      <el-table-column
        align="center"
        prop="mobile"
        label="手机号"
        width="140"
      />

      <!-- 点击跳转到账户管理的充值明细页面 -->
      <el-table-column
        align="center"
        prop="profit"
        label="充值金额"
        width="80"
      />
      <el-table-column
        align="center"
        prop="profit"
        label="充值时间"
      />
    </el-table>

    <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      orderID: '',
      admin: '',
      mobile: '',
      listLoading: false,
      value: '',
      options: [
        {
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '未充值'
        }, {
          value: '选项5',
          label: '已充值'
        }
      ],
      tableData: [{
        id: 'a1',
        sex: '男',
        orderTotal: '1',
        mobile: '13728760372',
        level: '1',
        profit: '100.04',
        time: '2019-3-21',
        status: false
      }, {
        id: 'a1',
        sex: '男',
        orderTotal: '1',
        mobile: '13728760372',
        level: '1',
        profit: '100.04',
        time: '2019-3-21',
        status: false
      }, {
        id: 'a1',
        sex: '男',
        orderTotal: '1',
        mobile: '13728760372',
        level: '1',
        profit: '100.04',
        time: '2019-3-21',
        status: false
      }, {
        id: 'a1',
        sex: '男',
        orderTotal: '1',
        mobile: '13728760372',
        level: '1',
        profit: '100.04',
        time: '2019-3-21',
        status: true
      }],
      currentPage: 1
    }
  },
  created() {
    this.orderID = this.$route.query.id
  },
  methods: {
    search() {
      console.log('search')
    },
    handleClick() {
      console.log('button click')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
