<template>
  <div class="app-container ordinaryMessage-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUserMsg">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="tableData" border
        fit highlight-current-row style="width: 100%" >
      <el-table-column align="center" type="index" width="40"/>

      <el-table-column align="center" prop="phoneNum" label="手机号" width="110"/>

      <el-table-column align="center" prop="msgType" label="消息类型" width="110"/>

      <el-table-column align="center" prop="title" label="标题" width="120"/>

      <el-table-column align="center" prop="content" label="内容"/>

      <el-table-column align="center" prop="sendTime" label="发送时间" width="160"/>
    </el-table>

    <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNums"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      listLoading: false,
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
      tableData: [],
      currentPage: 1,
      totalNums: null,
      form:{
        "pageNum": 1,
        "pageSize": 10,
        "phone": ""
      }
    }
  },
  created() {
    this.form.phone = this.$route.query.mobile
    this.getUserMsg()
  },
  methods: {
    getUserMsg(){
      this.listLoading = true
      this.$ajax({
        url: '/msg/getUserMsg',
        method: 'post',
        data: this.form
      }).then(res=>{
        if(res.code == 200){
          this.tableData = res.data.userList
          this.totalNums = res.data.totalNums
          this.listLoading = false
        }
      })
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getUserMsg()
    },
    handleCurrentChange(val) {
      this.form.pageNum = val
      this.getUserMsg()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
