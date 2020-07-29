<template>
  <div class="incomeDetail">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" >
      <el-table-column align="center" type="index" width="30" />

      <el-table-column align="center" prop="date" label="日期" />

      <el-table-column align="center" prop="profit" label="收益" />

      <!-- <el-table-column align="center" prop="friendDivide" label="其他收益"/>

      <el-table-column align="center"  prop="friendDivide" label="好友分成" /> -->
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
        { date: '2020-07-10', profit: '10.00'},
        { date: '2020-07-09', profit: '11.00'},
        { date: '2020-07-08', profit: '12.00'},
        { date: '2020-07-07', profit: '13.00'},
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
