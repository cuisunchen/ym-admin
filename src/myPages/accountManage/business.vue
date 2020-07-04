<template>
  <div class="app-container businessAccount-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单编号">
        <el-input v-model="form.orderNum" placeholder="请输入订单编号" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.mobile" placeholder="请输入订手机号" />
      </el-form-item>
      <el-form-item label="充值时间">
        <el-date-picker
          v-model="form.dateTime"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading" :data="tableData" border fit
      highlight-current-row style="width: 100%" >
      <el-table-column align="center" type="index" width="40"/>
      <el-table-column align="center" prop="id" label="用户id" />
      <!-- 点击跳到订单管理表格 -->
      <el-table-column align="center" prop="orderNum" label="订单编号" width="200"/>
      <el-table-column align="center" prop="rechargeNum" label="充值编号" width="200"/>
      <el-table-column align="center" prop="mobile" label="手机号" width="140"/>

      <!-- 点击跳转到账户管理的充值明细页面 -->
      <el-table-column align="center" prop="rechargeAmount" label="充值金额" width="120"/>
      <el-table-column align="center" prop="time" label="充值时间" width="160"/>
    </el-table>

    <el-pagination
      background
      :current-page="form.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      form:{
        orderNum:"",
        mobile:'',
        dateTime:'',
        pageNum: 1,
        pageSize: 10
      },
      totalPage: 0,
      listLoading: false,
      tableData: [],
    }
  },
  created() {
    if(this.$route.params.time){
      this.form.dateTime = this.$route.params.time + ' 00:00:00'
    }
    
    if(this.$route.query.id){
      this.form.orderNum = this.$route.query.id
    }
    
    this.getLists()
  },
  methods: {
    search(){
      if(this.form.orderNum || this.form.mobile || this.form.dateTime){
        this.form.pageNum = 1
        this.form.pageSize = 10
      }
      this.getLists()
    },
    getLists(){
      this.$ajax({
        url:'/pay/getPayAdList',
        method: 'post',
        data: this.form
      }).then(res=>{
        if(res.code == 200){
          this.tableData = res.data.list
          this.totalPage = res.data.totalNums
        }
      })
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getLists()
    },
    handleCurrentChange(val) {
      this.form.pageNum = val
      this.getLists()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
