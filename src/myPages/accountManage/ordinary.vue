<template>
  <div class="app-container ordinaryAccount-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="提现编号">
        <el-input v-model="form.phone" placeholder="提现编号" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="时间">
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
      v-loading="listLoading" :data="tableData"
      border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" type="index" width="40"/>

      <!-- <el-table-column align="center" prop="id" label="用户id" width="70" /> -->

      <el-table-column align="center" prop="withdrawalNum" label="提现编号" width="170"/>

      <el-table-column align="center" prop="withdrawalAccount" label="提现账号" width="120" />

      <el-table-column align="center" prop="withdrawalType" label="提现方式" width="80"/>

      <el-table-column align="center" prop="mobile" label="手机号" width="110"/>

      <el-table-column align="center" prop="surplusMoney" label="剩余金额" width="90"/>

      <el-table-column align="center" prop="withdrawalMoney" label="提现金额" width="80"/>

      <el-table-column align="center" prop="applyTime" label="申请时间" />

      <el-table-column align="center" prop="verifyTime" label="审核时间">
        <template slot-scope="scope">{{scope.row.verifyTime || '暂无'}}</template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="70">
        <template slot-scope="scope">{{scope.row.status}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180px" fixed="right">
        <template slot-scope="scope">
          <div class="wrap" v-if="scope.row.status == '未审核'">
            <el-button type="primary" :loading="noPassLoadding" @click="checkOrder(scope.row,2)">驳回</el-button>
            <el-button type="success" :loading="successLoadding" @click="checkOrder(scope.row,1)">通过</el-button>
          </div>
          <div class="wrap" v-if="scope.row.status == '驳回'">
            <el-button type="primary" :loading="successLoadding" @click="checkOrder(scope.row,1)">重新通过</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      :current-page="form.pageNum"
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
      admin: '',
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
      tableData: [],
      currentPage: 1,
      reason:'',
      form:{
        "dateTime": "",
        "pageNum": 1,
        "pageSize": 10,
        "phone": ""
      },
      reason:'',
      totalNums:null,
      successLoadding: false,
      noPassLoadding: false,
    }
  },
  created () {
    if(this.$route.params.time){
      this.form.dateTime = this.$route.params.time + ' 00:00:00'
    }
    this.form.phone = this.$route.params.mobile || ""
    this.getLists()
  },
  methods: {
    noPass(){
      const h = this.$createElement
      this.$msgbox({
        title: '请输入驳回原因',
        message: h('textarea', {
          class: ['reasonText'],
          attrs: {
            placeholder: '请输入驳回原因'
          },
          on: {
            blur: this.inputHandler
          }
        }, null
        ),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
          } else {
            done()
          }
        }
      }).catch(msg => {
        this.reason = ''
      })
    },
    inputHandler(val) {
      this.reason = val.target.value
    },
    checkOrder(row,status){
      let param = {
        order: row.withdrawalNum,
        reason: '',
        status
      }
      if(status == 1){
        this.$confirm(`确定要通过吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.successLoadding = true
              this.editWithdrawStatus(param)
              done()
            } else {
              done()
            }
          }
        })
      }else if(status == 2){
        this.noPassLoadding = true
        const h = this.$createElement
        this.$msgbox({
          title: '请输入驳回原因',
          message: h('textarea', {
            class: ['reasonText'],
            attrs: {
              placeholder: '请输入原因'
            },
            on: {
              blur: this.inputHandler
            }
          }, null),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              param.reason = this.reason
              this.editWithdrawStatus(param,instance)
            } else {
              done()
            }
          }
        }).catch(msg => {
          this.reason = ''
        })
      }
    },
    editWithdrawStatus(param,instance){
      this.$ajax({
        url: '/pay/editWithdrawStatus',
        method: 'post',
        data: param
      }).then(res=>{
        instance.confirmButtonLoading = false
        this.successLoadding = false
        this.noPassLoadding = false
        if(res.code == 200){
          this.$message.success('操作成功')
          this.getLists()
          done()
        }
      })
    },
    getLists(){
      this.$ajax({
        url: '/pay/getWithdrawList',
        method: 'post',
        data: this.form
      }).then(res=>{
        if(res.code == 200){
          this.tableData = res.data.list
          this.totalNums = res.data.totalNums
        }
      })
    },
    inputHandler(val) {
      this.reason = val.target.value
    },
    search() {
      if(this.form.phone == ''){
        let path = this.$route.path; //先获取路由路径
        this.$router.push(path)
      }
      if(this.form.orderNum || this.form.phone || this.form.dateTime){
        this.form.pageNum = 1
        this.form.pageSize = 10
      }
      this.getLists()
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
