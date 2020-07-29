<template>
  <div class="app-container appealQuestion-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="param.phone" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="反馈编号">
        <el-input v-model="param.order" placeholder="手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="tableData" border fit
              highlight-current-rowstyle="width: 100%">
      <el-table-column align="center" type="index" width="30"/>

      <el-table-column align="center" prop="feedbackID" label="反馈编号" />

      <el-table-column align="center" prop="phoneNum" label="手机号"/>
      <!-- 点击订单编号跳转对应的订单管理订单页面 -->
      <el-table-column align="center" prop="adID" label="广告id">
        <template slot-scope="scope">
          <!-- 此处需要知道订单类型跳转到相应的订单页面x -->
          <router-link class="link" :to="{path:'/orderManage/question',query:{id: scope.row.id}}">
            {{ scope.row.adID }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="content" label="内容"/>

      <el-table-column align="center" prop="imgs" label="图片链接"/>

      <el-table-column align="center" prop="sendTime" label="发送时间" />

      <el-table-column align="center" prop="replyTime" label="回复时间" />

      <el-table-column align="center" label="回复">
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
      <p class="title">{{detailData.content}}</p>
      <el-input type="textarea" v-model="aplyParam.content"/>
      <el-button class="btn" type="primary" @click="aply">提交</el-button>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { Message } from 'element-ui'
export default {
  data() {
    return {
      listLoading: false,
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
      dialogFormVisible: false,
      detailData:{},
      param:{
        "order": "",
        "pageNum": 1,
        "pageSize": 10,
        "phone": ""
      },
      aplyParam:{
        "content": "",
        "fatherId": 0
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    aply(){
      this.aplyParam.fatherId = this.detailData.id
      this.$ajax({
        url: '/feedback/replyComplaint',
        method: 'post',
        data: this.aplyParam
      }).then(res=>{
        if(res.code == 200 ){
          this.$message('回复成功')
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    getList(){
      this.$ajax({
        url: '/feedback/getComplaint',
        method: 'post',
        data: this.param
      }).then(res=>{
        if(res.code == 200){
          this.tableData = res.data.dataList
        }else{
          this.$message(res.msg)
        }
      })
    },
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
.appealQuestion-container{
  .el-dialog{
    .el-textarea{
      margin-top: 20px;
    }
    .btn{
      margin-top: 20px;
    }
  }
}
</style>
