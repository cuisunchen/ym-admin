<template>
  <div class="app-container accountManage-container">
    <el-form :inline="true" class="demo-form-inline">
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

    <el-table v-loading="listLoading" :data="tableData" border fit
              highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" width="30"/>
      <el-table-column align="center" prop="time" label="时间"/>
      <!-- 点击跳转到账单所有的充值记录 -->
      <el-table-column align="center" label="广告商充值总金额">
        <template slot-scope="scope">
          <router-link class="link" :to="{name:'accountBusiness',params:{time: scope.row.time}}">
            {{ scope.row.businessRechargeMoney }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="rechargeTimes" label="充值笔数"/>
      <!-- 点击跳转到普通用户账单所有的充值记录 -->
      <el-table-column align="center" label="普通用户提现总金额">
        <template slot-scope="scope">
          <router-link class="link" :to="{name:'accountOrdinary',params:{time: scope.row.time}}">
            {{ scope.row.withdrawalMoney }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="withdrawalTimes" label="提现笔数"/>
      <!-- 点击显示弹窗  弹窗上面是可修改平台剩余总金额  输入框(修改存去金额 提交按钮) 下拉框(查询按钮-存取)
         下面是修改记录列表 时间精确到时分秒 列表包括 修改时间 修改金额 剩余总金额 修改人 修改类型(存/取)-->
      <el-table-column align="center" label="阿里平台剩余总金额">
        <template slot-scope="scope">
          <div class="" style="cursor: pointer" @click="showDialog(scope.row.id)">{{ scope.row.platformSurplus }}</div>
        </template>
      </el-table-column>
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
    <el-dialog title="平台总金额设置与详情" :visible.sync="dialogFormVisible">
      <platformComponent />
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import platformComponent from './components/platformComponent'
export default {
  components: {
    platformComponent
  },
  data() {
    return {
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
      totalNums:null,
      dialogFormVisible: false,
      form:{
        "dateTime": '',
        "pageNum": 1,
        "pageSize": 10
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList(){
      this.$ajax({
        url: '/pay/allPayAndWithdraw',
        method: 'post',
        data: this.form
      }).then(res=>{
        if(res.code == 200){
          this.tableData = res.data.list
          this.totalNums = res.data.totalNums
        }
      })
    },
    search() {
      if(this.form.dateTime){
        this.form.pageNum = 1
        this.form.pageSize = 10
      }
      this.getList()
    },
    showDialog(id) {
      this.dialogFormVisible = true
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.form.pageNum = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
