<template>
  <div class="app-container businessManage-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="param.phone" placeholder="手机号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" width="40"/>

      <!-- <el-table-column align="center" prop="id" label="用户id" width="100"/> -->

      <el-table-column align="center" prop="mobile" label="手机号" width="110"/>
      
      <el-table-column align="center" label="微信昵称" width="110" >
        <template slot-scope="scope">
          {{ scope.row.wechat || '暂无' }}
        </template>
      </el-table-column>
      
      <!-- 点击跳转到账户管理的充值明细页面 -->
      <el-table-column align="center" label="充值总金额" width="100">
        <template slot-scope="scope">
          <router-link class="link" :to="{path:'/accountManage/business',query:{phone: scope.row.mobile}}">
            {{ scope.row.recharge }}
          </router-link>
        </template>
      </el-table-column>
      <!-- 点击跳转到订单管理的订单明细页面 -->
      <el-table-column align="center" prop="orderTotal" label="订单总数" width="80"/>

      <!-- 点击跳转到消息管理的消息明细页面 -->
      <el-table-column align="center" label="消息总数" width="80">
        <template slot-scope="scope">
          <router-link class="link" :to="{path:'/messageManage/business',query:{mobile: scope.row.mobile}}">
            {{ scope.row.orderTotal }}
          </router-link>
        </template>
      </el-table-column>
      <!-- 点击跳转到反馈管理的问题明细页面 -->
      <el-table-column align="center" label="问题总数" width="80">
        <template slot-scope="scope">
          <router-link class="link" :to="{path:'/feedBackManage/business',query:{id: scope.row.id}}">
            {{ scope.row.orderTotal }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="头像">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.avator" placement="top-end">
            <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ scope.row.avator }}</p>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="首次登录时间">
        <template slot-scope="scope">
          {{ scope.row.time || '--' }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      :current-page="tableFoot.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="param.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableFoot.total"
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
      tableData: [],
      tableFoot:{
        total: 0,
        currentPage: 1
      },
      param:{
        "pageNum": 1,
        "pageSize": 10,
        "phone": ''
      }
    }
  },
  created () {
    this.listLoading = true
    this.getLists()
  },
  methods: {
    getLists(){
      this.$ajax({
        url: '/api/user/advertisers',
        method: 'post',
        data: this.param
      }).then(res=>{
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
    handleSizeChange(val) {
      this.param.pageSize = val
      this.getLists()
    },
    handleCurrentChange(val) {
      this.param.pageNum = val
      this.getLists()
    },
    search() {
      if(this.param.phone){
        this.param.pageNum = 1
        this.param.pageSize = 10
      }
      this.getLists()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
