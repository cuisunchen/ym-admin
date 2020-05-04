<template>
  <div class="incomeDetail">
    <el-table
      v-loading="listLoading"
      :data="list"
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
        prop="questionIncome"
        label="问答收益"
      />

      <el-table-column
        align="center"
        prop="luckDraw"
        label="好运收益"
      />

      <el-table-column
        align="center"
        prop="friendDivide"
        label="其他收益"
      />

      <el-table-column
        align="center"
        prop="friendDivide"
        label="好友分成"
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
      list: [
        { questionIncome: '22.00', luckDraw: '10.00', friendDivide: '10.00' },
        { questionIncome: '23.00', luckDraw: '20.00', friendDivide: '11.00' },
        { questionIncome: '24.00', luckDraw: '30.00', friendDivide: '12.00' },
        { questionIncome: '25.00', luckDraw: '40.00', friendDivide: '13.00' },
        { questionIncome: '26.00', luckDraw: '50.00', friendDivide: '14.00' }
      ],
      listLoading: false,
      currentPage: 1
    }
  },
  methods: {
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
