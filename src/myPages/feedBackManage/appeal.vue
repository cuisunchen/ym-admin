<template>
  <div class="app-container appealQuestion-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="mobile" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="反馈编号">
        <el-input v-model="mobile" placeholder="手机号" />
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
        label="反馈编号"
      />

      <el-table-column
        align="center"
        prop="mobile"
        label="手机号"
      />
      <!-- 点击订单编号跳转对应的订单管理订单页面 -->
      <el-table-column
        align="center"
        prop="id"
        label="广告id"
      >
        <template slot-scope="scope">
          <!-- 此处需要知道订单类型跳转到相应的订单页面x -->
          <router-link class="link" :to="{path:'/orderManage/question',query:{id: scope.row.id}}">
            {{ scope.row.id }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="profit"
        label="内容"
      />

      <el-table-column
        align="center"
        prop="profit"
        label="图片链接"
      />

      <el-table-column
        align="center"
        prop="orderTotal"
        label="发送时间"
      />

      <el-table-column
        align="center"
        prop="time"
        label="回复时间"
      />
      <el-table-column
        align="center"
        label="回复"
      >
        <template slot-scope="scope">
          <el-button type="primary" plain @click="showDialog(scope.row)">回复</el-button>
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

    <el-dialog title="回复" :visible.sync="dialogFormVisible">
      <p class="title">埃及十多个接口是否该</p>
      <el-input type="textarea" />
      <el-button type="primary">提交</el-button>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
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
          label: '已回复'
        }, {
          value: '选项5',
          label: '未回复'
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
    showDialog(data) {
      console.log(data)
      this.detailData = data
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
