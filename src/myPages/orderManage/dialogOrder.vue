<template>
  <div class="app-container dialogOrder-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单编号">
        <el-input v-model="form.homeAdId" placeholder="请输入订单编号" />
      </el-form-item>
      <el-form-item label="发布时间">
        <el-input v-model="form.releaseTime" placeholder="请输入发布时间" />
      </el-form-item>
      <el-form-item label="来源">
        <el-select v-model="form.comeFrom" placeholder="请选择">
          <el-option
            v-for="item in comeFrom"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="listLoading" @click="getDatas">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="batchHandle">
      <label for="">批量操作: </label>
      <div class="btns">
        <el-button type="success" size="mini" @click="orderPass">通过</el-button>
        <el-button type="warning" size="mini" @click="noPass">驳回</el-button>
        <el-button type="danger" size="mini" @click="orderDown">下架</el-button>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
      class="elTable"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="39"
      />

      <el-table-column
        align="center"
        prop="orderNumber"
        label="订单编号"
        width="110"
      >
        <template slot-scope="scope">
          <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ scope.row.orderNumber }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="userAccount" label="用户账号" width="110" />

      <el-table-column align="center" label="内容链接" width="110" >
        <template slot-scope="scope">
          <a :href="scope.row.homeBigImgUrl" target="_blank"
            style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
            {{ scope.row.homeBigImgUrl }}
          </a>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总用户人数" width="100">
        <template slot-scope="scope">
          <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ scope.row.userTotal>0?scope.row.userTotal.toString():'0' }}</p>
        </template>
      </el-table-column>

      <!-- 点击跳转到账单管理的页面 -->
      <el-table-column
        align="center"
        label="发布金额"
      >
        <template slot-scope="scope">
          <router-link class="link" :to="{path:'/accountManage/business',query:{id: scope.row.id}}">
            <el-tooltip class="item" effect="dark" :content="scope.row.profit" placement="top-end">
              <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ scope.row.profit }}</p>
            </el-tooltip>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发布时间">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.issueTime.toString()" placement="top-start">
            <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ scope.row.issueTime.length }}</p>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="来源" width="60">yes</el-table-column>

      <el-table-column align="center" label="状态" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">待审核</span>
          <span v-if="scope.row.status == 1">发布中</span>
          <span v-if="scope.row.status == 2">已驳回</span>
          <span v-if="scope.row.status == 3">已完成</span>
          <span v-if="scope.row.status == 4">已下架</span>
          <span v-if="scope.row.status == 5">已过期</span>
          <span v-if="scope.row.status == 6">待发布</span>
          <span v-if="scope.row.status == 7">待支付</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="220px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDialog(scope.row)">详情</el-button>
          <el-button type="success" size="mini" v-if="form.status != 1" @click="orderPass(scope.row)">通过</el-button>
          <el-button type="warning" size="mini" v-if="form.status != 2" @click="noPass(scope.row)">驳回</el-button>
          <el-button type="danger" size="mini" v-if="form.status != 5" @click="orderDown(scope.row)">下架</el-button>
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
    <el-dialog title="弹框订单详情" :visible.sync="dialogFormVisible">
      <dialogOrderDetail :data-obj="detailData" />
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import dialogOrderDetail from './details/dialogOrderDetail'
import { statusOpt, comeFrom } from '../../utils/options'
import request from '@/utils/request'
export default {
  components: {
    dialogOrderDetail
  },
  data() {
    return {
      listLoading: false,
      form: {
        homeAdId: '',
        releaseTime: '',
        rangeType: 0,
        status: 0,
        pageNum: 1,
        pageSize: 20,
        comeFrom: 1
      },
      status: 0,
      options: [],
      comeFrom: [],
      tableData: [],
      totalNums: null,
      dialogFormVisible: false,
      detailData: null,
      selectIds: [],
      reason: ''
    }
  },
  created() {
    this.options = statusOpt
    this.comeFrom = comeFrom
    this.form.status = this.status
    this.getDatas()
  },
  methods: {
    orderPass(row) {
      if (!row.id && this.selectIds.length < 1) { //  参数有两个表示为单个删除
        this.$message.error('请先选择要操作的广告!')
        return
      }
      this.$confirm(`确定要通过吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            this.$orderPass(row.id ? [row.id] : this.selectIds).then(res => {
              instance.confirmButtonLoading = false
              if (res.code == 200) {
                this.$message.success('操作成功')
                this.selectIds = []
                this.getDatas()
              }
              done()
            })
          } else {
            done()
          }
        }
      })
    },
    noPass(row) {
      if (!row.id && this.selectIds.length < 1) { //  参数有两个表示为单个删除
        this.$message.error('请先选择要操作的广告!')
        return
      }
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
        }, null
        ),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            const param = {
              homeAdId: row.id ? [row.id] : this.selectIds,
              reason: this.reason
            }
            this.$orderNoPass(param).then(res => {
              instance.confirmButtonLoading = false
              if (res.code == 200) {
                this.$message.success('操作成功')
                this.selectIds = []
                this.reason = ''
                this.getDatas()
                done()
              } else {
                done()
              }
            })
          } else {
            done()
          }
        }
      }).catch(msg => {
        this.reason = ''
      })
    },

    orderDown(row) {
      if (!row.id && this.selectIds.length < 1) { //  参数有两个表示为单个删除
        this.$message.error('请先选择要操作的广告!')
        return
      }
      const h = this.$createElement
      this.$msgbox({
        title: '请输入下架原因',
        message: h('textarea', {
          class: ['reasonText'],
          attrs: {
            placeholder: '请输入原因'
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
            const param = {
              homeAdId: row.id ? [row.id] : this.selectIds,
              reason: this.reason
            }
            this.$orderDown(param).then(res => {
              instance.confirmButtonLoading = false
              if (res.code == 200) {
                this.$message.success('操作成功')
                this.selectIds = []
                this.reason = ''
                this.getDatas()
                done()
              } else {
                done()
              }
            })
          } else {
            done()
          }
        }
      }).catch(msg => {
        // this.selectIds = []
        this.reason = ''
      })
    },
    inputHandler(val) {
      this.reason = val.target.value
    },
    getDatas() {
      this.listLoading = true
      this.form.status = this.status
      request({
        url: '/api/find/findAlertList',
        method: 'post',
        data: this.form
      }).then(res => {
        if (res.code == 200) {
          res.data || res.data.list.map(item => item.loadding = false)
          this.tableData = res.data.list
          this.totalNums = res.data.totalNums
          this.listLoading = false
        }
      })
    },
    handleSelectionChange(val) {
      this.selectIds = []
      val.forEach(item => {
        this.selectIds.push(item.id)
      })
    },
    showDialog(data) {
      this.detailData = data
      this.dialogFormVisible = true
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getDatas()
    },
    handleCurrentChange(val) {
      this.form.pageNum = val
      this.getDatas()
    }
  }
}
</script>

<style lang="scss" scoped>
.dialogOrder-container{
   .batchHandle{
      text-align: right;
      margin-bottom: 10px;
      label{
         font-size: 14px;
         color: #606266;
         margin-right: 10px;
      }
      .btns{
         display: inline-block;
      }
   }
   /deep/ .elTable tr{
      height: 50px;
      overflow: hidden;
      padding: 0 !important;
   }
   /deep/ .elTable td{
      padding: 0 !important;
      .cell{
         height: 50px;
         line-height: 50px;
         a{
            display: block;
            line-height: 50px;
         }
      }
   }
}
</style>
