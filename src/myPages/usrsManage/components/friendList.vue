<template>
  <div class="friend">
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
        prop="mobile"
        label="微信号"
      />

      <el-table-column
        align="center"
        prop="mobile"
        label="手机号"
      />

      <el-table-column
        align="center"
        prop="level"
        label="等级"
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
  components: {

  },
  data() {
    return {
      list: [
        { mobile: 111111, level: 1, income: 200.0 },
        { mobile: 222222, level: 2, income: 200.0 },
        { mobile: 333333, level: 3, income: 200.0 },
        { mobile: 444444, level: 4, income: 200.0 },
        { mobile: 555555, level: 5, income: 200.0 }
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
