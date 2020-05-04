<template>
  <div class="platformComponent">
    <p class="tit">设置金额</p>
    <el-form :inline="true" class="demo-form-inline" label-width="100px" label-position="left">
      <el-form-item label="修改存取金额">
        <el-input v-model.trim="money" placeholder="请输入要修改的金额" />
      </el-form-item>
      <el-form-item label="修改存取类型">
        <el-select v-model="value" size="mini" placeholder="请选择" style="width: 168px;margin-right: 10px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="修改剩余金额">
        <el-input v-model.trim="money" placeholder="请输入剩余金额" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
    <p class="tit">查询数据</p>
    <el-form :inline="true" class="demo-form-inline" label-width="100px" label-position="left">
      <el-form-item label="日期">
        <el-input v-model.trim="money" placeholder="请输入要修改的金额" />
      </el-form-item>
      <el-form-item label="修改存取类型">
        <el-select v-model="value" placeholder="请选择" style="width: 168px;margin-right: 10px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        type="index"
        width="40"
      />

      <el-table-column
        align="center"
        prop="editTime"
        label="修改时间"
      />

      <el-table-column
        align="center"
        label="修改金额"
      >
        <template slot-scope="scope">
          {{ scope.row.editMoney+1 }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="surplusMoney"
        label="剩余总金额"
      />
      <el-table-column
        align="center"
        prop="editor"
        label="修改人"
      />
      <el-table-column
        align="center"
        prop="editType"
        label="修改类型"
      />
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
      money: '',
      options: [
        {
          value: '1',
          label: '全部'
        }, {
          value: '2',
          label: '取'
        }, {
          value: '3',
          label: '取'
        }
      ],
      value: '',
      listLoading: false,
      list: [
        { editTime: '2020-03-02', editMoney: 200.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '存' },
        { editTime: '2020-03-04', editMoney: 2000.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '取' },
        { editTime: '2020-03-05', editMoney: 4000.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '取' },
        { editTime: '2020-03-06', editMoney: 3000.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '存' },
        { editTime: '2020-03-12', editMoney: 1000.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '存' },
        { editTime: '2020-03-02', editMoney: 200.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '存' },
        { editTime: '2020-03-04', editMoney: 2000.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '取' },
        { editTime: '2020-03-05', editMoney: 4000.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '取' },
        { editTime: '2020-03-06', editMoney: 3000.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '存' },
        { editTime: '2020-03-12', editMoney: 1000.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '存' },
        { editTime: '2020-03-02', editMoney: 200.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '存' },
        { editTime: '2020-03-04', editMoney: 2000.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '取' },
        { editTime: '2020-03-05', editMoney: 4000.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '取' },
        { editTime: '2020-03-06', editMoney: 3000.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '存' },
        { editTime: '2020-03-12', editMoney: 1000.00, surplusMoney: 20000.00, editor: 'cuisunchen', editType: '存' }
      ],
      currentPage: 1
    }
  },
  methods: {
    submit() {

    },
    search() {

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
