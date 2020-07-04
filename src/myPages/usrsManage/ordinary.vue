<template>
  <div class="app-container ordinaryManage-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="param.phone" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="状态" class="comeFrom">
        <el-select v-model="param.status" placeholder="请选择">
          <el-option
            v-for="item in statusOpt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading" :data="tableData"
      border fit highlight-current-row style="width: 100%" >

      <el-table-column align="center" type="index" />

      <!-- <el-table-column align="center" prop="id" label="用户id" width="70" /> -->

      <el-table-column align="center" prop="mobile" label="微信号" width="110" />

      <el-table-column align="center" width="110" prop="mobile" label="手机号" />

      <el-table-column align="center" label="好友总数" width="90">
        <template slot-scope="scope">
          <div style="cursor: pointer" @click="showDialog('friends','好友列表',scope.row)">{{ scope.row.friends }}</div>
        </template>
      </el-table-column>
      <!-- 点击显示弹窗   显示各种收益明细 问答收益多少  好运收益多少  好友分成多少 -->
      <el-table-column align="center" label="今日收益" width="110">
        <template slot-scope="scope">
          <div style="cursor: pointer" @click="showDialog('income','今日收益',scope.row)">{{ scope.row.todayEarn }}</div>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="totalEarn" label="全部收益" width="110"/>

      <el-table-column align="center" prop="surplus" label="剩余金额" width="110" >
      </el-table-column>
      <!-- 点击弹出弹窗显示提现记录列表 -->
      <el-table-column align="center" label="提现总数" width="80">
        <template slot-scope="scope">
          <router-link class="link" :to="{name:'accountOrdinary',params:{mobile: scope.row.mobile}}">
            {{ scope.row.widthdrawalNum }}
          </router-link>
          <!-- <div class="" style="cursor: pointer" @click="showDialog('withdrawal','提现记录列表',scope.row)">{{ scope.row.widthdrawalNum }}</div> -->
        </template>
      </el-table-column>

      <el-table-column align="center" label="首次登录" >
        <template slot-scope="scope">
            {{ scope.row.time || '--' }}
        </template>
      </el-table-column>

      <el-table-column align="center" width="80" label="账号状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#ff4949" @change="switchChange(scope.row)"/>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="70">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDialog('detail','详情',scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      :current-page="tableFoot.currentPage"
      :page-sizes="[2, 20, 30, 40]"
      :page-size="param.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableFoot.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <friendList v-if="type == 'friends'" :user-id="currentData.id" />
      <incomeDetail v-if="type == 'income'" />
      <withdrawal v-if="type == 'withdrawal'" :phone="currentData.mobile"/>
      <detail v-if="type == 'detail'" :obj="currentData" />
    </el-dialog>

    <el-dialog title="原因"
      :visible.sync="reasonShow"
      width="30%" :before-close="handleClose">
      <el-row :gutter="20" class="flex align-center">
        <el-col :span="16">
          <el-input v-model="blockReason" placeholder="请输入封号理由"></el-input>
        </el-col>
        <el-col :span="8">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              请选择<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
             <!-- @command="dropItemClick" -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in dropList" :key="index">
                  <div @click="dropItemClick(item)">{{item}}</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reasonShow = false">取 消</el-button>
        <el-button type="primary" @click="blockAccount">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import friendList from './components/friendList'
import incomeDetail from './components/incomeDetail'
import withdrawal from './components/withdrawal'
import detail from './components/detail'
export default {
  components: {
    friendList, incomeDetail, withdrawal, detail
  },
  data() {
    return {
      listLoading: false,
      tableData: [],
      type: '',
      dialogFormVisible: false,
      reasonShow: false,
      dropList:['系统升级,请稍后再试','您的账号存在违规操作,已被封号,请联系客服'],
      blockReason:'',
      blockAccountId:'',
      dialogTitle: '',
      currentData: {},
      statusOpt:[
        {value: null,label:'全部'},
        {value: 0,label:'封号中'},
        {value: 1,label:'正常'},
      ],
      tableFoot:{
        total: 0,
        currentPage: 1
      },
      param:{
        "pageNum": 1,
        "pageSize": 10,
        "phone": '',
        'status': null
      }
    }
  },
  created () {
    this.listLoading = true
    this.getLists()
  },
  methods: {
    search(){
      if(this.param.phone || this.param.status > -1){
        this.param.pageNum = 1
        this.param.pageSize = 10
      }
      this.getLists()
    },
    getLists(){
      this.$ajax({
        url:'/api/user/userList',
        method: 'post',
        data: this.param
      }).then(res => {
        this.listLoading = false
        if(res.code == 200){
          this.tableData = res.data.userList.map(item=>{
            item.status = !item.status
            return item
          })
          this.tableFoot.total = res.data.totalNums
        }
      })
    },
    handleClose(){},
    dropItemClick(data){
      this.blockReason = data
    },
    showDialog(type, title, row) {
      this.type = type
      if (type == 'detail') {
        // this.currentData = row
        
      }
      this.currentData = row
      this.dialogTitle = title
      this.dialogFormVisible = true
    },
    switchChange(row){
      this.blockAccountId = row.id
      if(row.status){
        this.reasonShow = true
      }else{
        this.blockAccount()
      }
    },
    blockAccount(){
      this.$ajax({
          url:'/api/user/updateUserStatus',
          method: 'post',
          data: {id: this.blockAccountId}
        }).then(res=>{
          if(res.code == 200){
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.getLists()
          }
        })
    },
    handleSizeChange(val) {
      this.param.pageSize = val
      this.getLists()
    },
    handleCurrentChange(val) {
      this.param.pageNum = val
      this.tableFoot.currentPage = val
      this.getLists()
    }
  }
}
</script>

<style lang="scss" scoped>
.ordinaryManage-container{
   /deep/ .el-dialog{
      height: auto;
   }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
}
</style>
