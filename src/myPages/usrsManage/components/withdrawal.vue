<template>
  <div class="withdrawal">
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
        prop="withdrawalQuota"
        label="提现额度"
      />

      <el-table-column
        align="center"
        prop="withdrawaTime"
        label="提现时间"
      />

      <el-table-column
        align="center"
        prop="withdrawaType"
        label="提现方式"
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
        { withdrawalQuota: '100.00', withdrawaTime: '2020-03-12 14:52:34', withdrawaType: '支付宝' },
        { withdrawalQuota: '200.00', withdrawaTime: '2020-03-16 14:52:34', withdrawaType: '支付宝' },
        { withdrawalQuota: '50.00', withdrawaTime: '2020-03-22 14:52:34', withdrawaType: '支付宝' },
        { withdrawalQuota: '100.00', withdrawaTime: '2020-04-12 14:52:34', withdrawaType: '微信' },
        { withdrawalQuota: '150.00', withdrawaTime: '2020-05-12 14:52:34', withdrawaType: '微信' }
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
