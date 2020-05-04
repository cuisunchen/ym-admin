<template>
  <div class="app-container ordinaryAccount-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="mobile" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="时间">
        <el-input v-model="mobile" placeholder="手机号" />
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
        width="70"
      />

      <el-table-column
        align="center"
        prop="mobile"
        label="提现编号"
        width="200"
      />
      <el-table-column
        align="center"
        prop="account"
        label="提现账号"
        width="100"
      />
      <el-table-column
        align="center"
        prop="type"
        label="提现方式"
      />
      <el-table-column
        align="center"
        prop="mobile"
        label="手机号"
        width="110"
      />
      <el-table-column
        align="center"
        prop="level"
        label="剩余金额"
        width="90"
      />
      <el-table-column
        align="center"
        prop="level"
        label="提现金额"
        width="80"
      />

      <el-table-column
        align="center"
        prop="orderTotal"
        label="申请时间"
      />

      <el-table-column
        align="center"
        prop="orderTotal"
        label="审核时间"
      />

      <el-table-column
        align="center"
        label="状态"
        width="70"
      >
        <template>
          <p>
            已驳回
            <!-- ,待支付,待审核,待发布,发布中,已完成 -->
          </p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="180px"
      >
        <template>
          <el-button type="primary">驳回</el-button>
          <el-button type="success">通过</el-button>
        </template>
      </el-table-column>
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
        account: '11111',
        orderTotal: '1',
        mobile: '13728760372',
        level: '1',
        profit: '100.04',
        time: '2019-3-21',
        status: false,
        type: '微信提现'
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
