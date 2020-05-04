<template>
  <div class="app-container businessManage-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="mobile" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="充值状态">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
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
        width="100"
      />
      <el-table-column
        align="center"
        prop="mobile"
        label="微信号"
        width="110"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.mobile" placement="top-end">
            <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ scope.row.mobile }}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="mobile"
        label="手机号"
        width="110"
      />
      <!-- 点击跳转到账户管理的充值明细页面 -->
      <el-table-column
        align="center"
        label="充值总金额"
        width="100"
      >
        <template slot-scope="scope">
          <router-link class="link" :to="{path:'/accountManage/business',query:{id: scope.row.id}}">
            {{ scope.row.recharge }}
          </router-link>
        </template>
      </el-table-column>
      <!-- 点击跳转到订单管理的订单明细页面 -->
      <el-table-column
        align="center"
        prop="orderTotal"
        label="订单总数"
        width="80"
      />

      <!-- 点击跳转到消息管理的消息明细页面 -->
      <el-table-column
        align="center"
        label="消息总数"
        width="80"
      >
        <template slot-scope="scope">
          <router-link class="link" :to="{path:'/messageManage/business',query:{mobile: scope.row.mobile}}">
            {{ scope.row.orderTotal }}
          </router-link>
        </template>
      </el-table-column>
      <!-- 点击跳转到反馈管理的问题明细页面 -->
      <el-table-column
        align="center"
        label="问题总数"
        width="80"
      >
        <template slot-scope="scope">
          <router-link class="link" :to="{path:'/feedBackManage/business',query:{id: scope.row.id}}">
            {{ scope.row.orderTotal }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="头像"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.avator" placement="top-end">
            <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ scope.row.avator }}</p>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="time"
        label="首次登录时间"
        width="110"
      />
      <el-table-column
        align="center"
        label="状态"
        width="80"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
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
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

  },
  data() {
    return {
      admin: '',
      mobile: '',
      listLoading: false,
      value: '',
      currentPage: 1,
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
      tableData: [
        {
          id: 'a1',
          avator: 'www.ahsdgh.com/asdf/dgasdgkdgasdgkdgasdgkdgasdgkdgasdgk.png',
          orderTotal: '1',
          mobile: '13728760372',
          recharge: '200.00',
          time: '2019-3-21',
          status: false
        }, {
          id: 'a1',
          avator: 'www.ahsdgh.com/asdf/dgasdgk.png',
          orderTotal: '1',
          mobile: '13728760372',
          recharge: '200.00',
          time: '2019-3-21',
          status: false
        }, {
          id: 'a1',
          avator: 'www.ahsdgh.com/asdf/dgasdgk.png',
          orderTotal: '1',
          mobile: '13728760372',
          recharge: '200.00',
          time: '2019-3-21',
          status: false
        }, {
          id: 'a1',
          avator: 'www.ahsdgh.com/asdf/dgasdgk.png',
          orderTotal: '1',
          mobile: '13728760372',
          recharge: '200.00',
          time: '2019-3-21',
          status: true
        }
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    search() {
      console.log('search')
    },
    handleClick() {
      console.log('button click')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
