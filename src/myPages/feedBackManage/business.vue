<template>
  <div class="app-container businessQuestion-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="form.mobile" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="回复状态">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getMerchantFeedback">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="tableData" border fit 
          highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" width="30"/>

      <el-table-column align="center" prop="phoneNum" label="手机号"/>

      <el-table-column align="center" prop="feedbackID" label="反馈编号" />

      <el-table-column align="center" prop="title" label="标题" />

      <el-table-column align="center" prop="sendTime" label="发送时间" />

      <el-table-column align="center" prop="replyTime" label="回复时间"/>

      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <span :style="{color: scope.row.status == '未回复' ? '#1890ff' : '#606266'}">{{scope.row.status}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="回复">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="showDialog(scope.row)">回复</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination background
      :current-page="form.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNums"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog class="replyList" title="回复" :visible.sync="dialogFormVisible">
      <p class="title">{{detailData.title}}</p>

      <div class="item" :class="{'userBack': item.role == 'user'}" v-for="(item,index) in replyList" :key="index">
        <p class="tit">{{item.replyAccount}} 回复:</p>
        <p class="userCon">{{item.content}}</p>
      </div>

      <div class="inputBox flex">
        <el-input type="text" v-model="replyCon"></el-input>
        <el-button type="primary" class="submit" @click="replyFeedback">提交</el-button>
      </div>
    </el-dialog>
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
          label: '已回复'
        }, {
          value: '选项5',
          label: '未回复'
        }
      ],
      tableData: [],
      detailData: {},
      dialogFormVisible: false,
      form:{
        "pageNum": 1,
        "pageSize": 10,
        "phone": "",
        "status": ""
      },
      totalNums: null,
      replyList:[],
      replyCon:""
    }
  },
  created () {
    this.getMerchantFeedback()
  },
  methods: {
    getMerchantFeedback(){
      this.listLoading = true
      this.$ajax({
        url: '/feedback/getMerchantFeedback',
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
    replyFeedback(){
      this.$ajax({
        url: '/feedback/addFeedback',
        method: 'post',
        data: {
          "content": this.replyCon,
          "fatherId": this.detailData.feedbackID
        }
      }).then(res=>{
        if(res.code == 200 && res.msg == 'SUCCESS'){
          this.$message('回复成功')
          this.replyCon = ''
          this.getFeedbackInfo()
        }
      })
    },
    showDialog(data) {
      this.detailData = data
      this.dialogFormVisible = true
      this.getFeedbackInfo()
    },
    getFeedbackInfo(){
      this.$ajax({
        url: '/feedback/getFeedbackInfo',
        method: 'post',
        data: {id:this.detailData.feedbackID}
      }).then(res=>{
        if(res.code == 200){
          this.replyList = res.data
        }
      })
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getMerchantFeedback()
    },
    handleCurrentChange(val) {
      this.form.pageNum = val
      this.getMerchantFeedback()
    }
  }
}
</script>

<style scoped lang="scss" scoped>
.businessQuestion-container{
  .el-dialog{
    position: relative;
    .title{
      margin-bottom: 14px;
    }
    .item{
      text-align: right;
      margin-bottom: 14px;
      .tit{
        color: burlywood;
      }
    }
    .userBack{
      text-align: left;
      .tit{
        color: aquamarine;
      }
    }
    .inputBox{
      position: absolute;
      bottom: 0;
      left: 20px;
      right: 20px;
      bottom: 20px;
      .submit{
        margin-left: 14px;
      }
    }
  }
}

</style>
