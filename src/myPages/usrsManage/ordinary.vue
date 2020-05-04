<template>
  <div class="app-container ordinaryManage-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="mobile" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="位置">
        <el-input v-model="mobile" placeholder="位置" />
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
        label="微信号"
        width="110"
      />

      <el-table-column
        align="center"
        width="110"
        prop="mobile"
        label="手机号"
      />

      <!-- <el-table-column align="center"
            prop="level"
            label="等级"
            width="60">
         </el-table-column> -->
      <!-- 点击弹出弹窗显示好友列表 -->
      <el-table-column
        align="center"
        label="好友总数"
      >
        <template slot-scope="scope">
          <div class="" style="cursor: pointer" @click="showDialog('friends','好友列表',scope.row)">{{ scope.row.orderTotal }}</div>
        </template>
      </el-table-column>
      <!-- 点击显示弹窗   显示各种收益明细 问答收益多少  好运收益多少  好友分成多少 -->
      <el-table-column
        align="center"
        label="今日收益"
      >
        <template slot-scope="scope">
          <div class="" style="cursor: pointer" @click="showDialog('income','今日收益',scope.row)">{{ scope.row.orderTotal }}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="profit"
        label="全部收益"
      />
      <!-- 点击跳转到账户管理的充值明细页面 -->
      <!-- <el-table-column align="center"
            label="已提现总金额"
            width="100">
            <template slot-scope="scope">
               <router-link class="link" :to="{path:'/accountManage/ordinary',query:{id: scope.row.id}}">
                  {{scope.row.profit}}
               </router-link>
            </template>
         </el-table-column> -->
      <!-- 点击跳转到账户管理的充值明细页面 -->
      <el-table-column
        align="center"
        label="剩余金额"
      >
        <template slot-scope="scope">
          <router-link class="link" :to="{path:'/accountManage/ordinary',query:{id: scope.row.id}}">
            {{ scope.row.profit }}
          </router-link>
        </template>
      </el-table-column>
      <!-- 点击弹出弹窗显示提现记录列表 -->
      <el-table-column
        align="center"
        label="提现总数"
        width="80"
      >
        <template slot-scope="scope">
          <div class="" style="cursor: pointer" @click="showDialog('withdrawal','提现记录列表',scope.row)">{{ scope.row.orderTotal }}</div>
        </template>
      </el-table-column>
      <!-- 点击跳转到消息管理的消息明细页面 -->
      <!-- <el-table-column align="center"
            label="消息总数"
            width="50">
            <template slot-scope="scope">
               <router-link class="link" :to="{path:'/messageManage/ordinary',query:{id: scope.row.id}}">
                  {{scope.row.orderTotal}}
               </router-link>
            </template>
         </el-table-column> -->
      <!-- 点击跳转到反馈管理的问题明细页面 -->
      <!-- <el-table-column align="center"
            label="问题总数"
            width="50">
            <template slot-scope="scope">
               <router-link class="link" :to="{path:'/feedBackManage/ordinary',query:{id: scope.row.id}}">
                  {{scope.row.orderTotal}}
               </router-link>
            </template>
         </el-table-column> -->

      <!-- 点击跳转到反馈管理的申诉问题页面 -->
      <!-- <el-table-column align="center"
            label="申诉总数"
            width="50">
            <template slot-scope="scope">
               <router-link class="link" :to="{path:'/feedBackManage/appeal',query:{id: scope.row.id}}">
                  {{scope.row.orderTotal}}
               </router-link>
            </template>
         </el-table-column> -->
      <el-table-column align="center" prop="time" label="首次登录" />

      <el-table-column align="center" width="80" label="账号状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
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
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <friendList v-if="type == 'friends'" />
      <incomeDetail v-if="type == 'income'" />
      <withdrawal v-if="type == 'withdrawal'" />
      <detail v-if="type == 'detail'" :obj="currentData" />
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
        orderTotal: '1000',
        mobile: '13728760372',
        level: '1000',
        profit: '100.04',
        time: '2019-3-21',
        status: false
      }, {
        id: 'a1',
        sex: '男',
        orderTotal: '1',
        mobile: '13728760372',
        level: '1000',
        profit: '100.04',
        time: '2019-3-21',
        status: false
      }, {
        id: 'a1',
        sex: '男',
        orderTotal: '1000',
        mobile: '13728760372',
        level: '1000',
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
      currentPage: 1,
      type: '',
      dialogFormVisible: false,
      dialogTitle: '',
      currentData: {}
    }
  },
  methods: {
    search() {
      console.log('search')
    },
    showDialog(type, title, row) {
      console.log(type)
      this.type = type
      if (type == 'detail') {
        this.currentData = row
      }
      this.dialogTitle = title
      this.dialogFormVisible = true
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
.ordinaryManage-container{
   /deep/ .el-dialog{
      height: auto;
   }
}
</style>
