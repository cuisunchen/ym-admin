<template>
  <div class="friend">
    <el-table v-loading="listLoading" :data="list"  border
      fit highlight-current-row style="width: 100%" >
      <el-table-column align="center" type="index" width="30"/>

      <el-table-column align="center" prop="mobile" label="微信号"/>

      <el-table-column align="center" prop="mobile" label="手机号"/>

      <el-table-column align="center" prop="level" label="等级"/>

    </el-table>
    <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableFoot.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    userId: {
      type: String
    },
  },
  watch: {
    userId(val){
      this.listLoading = true
      this.param.userId = val
      this.getFriends()
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      param:{
        "pageNum": 1,
        "pageSize": 10,
        "userId": ""
      },
      tableFoot:{
        total: 0,
        currentPage: 1
      },
    }
  },
  created () {
    this.listLoading = true
    this.param.userId = this.userId
    this.getFriends()
  },
  methods: {
    getFriends(){
      this.$ajax({
        url:'/api/user/userFriends',
        method: 'post',
        data: this.param
      }).then(res => {
        this.listLoading = false
        if(res.code == 200){
          this.list = res.data.friendList
          this.tableFoot.total = res.data.sumPage
        }
      })
    },
    handleSizeChange(val) {
      this.param.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.param.pageNum = val
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
