<template>
  <div class="app-container accountManage-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="时间">
        <el-input v-model="mobile" placeholder="时间" />
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
        prop="time"
        label="时间"
      />
      <!-- 点击跳转到账单所有的充值记录 -->
      <el-table-column
        align="center"
        label="广告商充值总金额"
      >
        <template slot-scope="scope">
          <router-link class="link" :to="{path:'/accountManage/business',query:{id: scope.row.id}}">
            {{ scope.row.profit }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="time"
        label="充值笔数"
      />
      <!-- 点击跳转到普通用户账单所有的充值记录 -->
      <el-table-column
        align="center"
        label="普通用户提现总金额"
      >
        <template slot-scope="scope">
          <router-link class="link" :to="{path:'/accountManage/ordinary',query:{time: scope.row.time}}">
            {{ scope.row.profit }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="orderTotal"
        label="提现笔数"
      />
      <!-- 点击显示弹窗  弹窗上面是可修改平台剩余总金额  输入框(修改存去金额 提交按钮) 下拉框(查询按钮-存取)
         下面是修改记录列表 时间精确到时分秒 列表包括 修改时间 修改金额 剩余总金额 修改人 修改类型(存/取)-->
      <el-table-column
        align="center"
        prop="profit"
        label="平台剩余总金额"
      >
        <template slot-scope="scope">
          <div class="" style="cursor: pointer" @click="showDialog(scope.row.id)">{{ scope.row.profit }}</div>
        </template>
      </el-table-column>
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
        orderTotal: '1',
        mobile: '13728760372',
        level: '1',
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
        status: false
      }, {
        id: 'a1',
        sex: '男',
        orderTotal: '1',
        mobile: '13728760372',
        level: '1',
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
      dialogFormVisible: false
    }
  },
  methods: {
    search() {
      console.log('search')
    },
    showDialog(id) {
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

</style>
