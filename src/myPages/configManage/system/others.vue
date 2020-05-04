<template>
  <div class="othersPage">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="app版本配置" name="1">
        <el-form style="width:500px" label-width="90px" label-position="left">
          <el-form-item label="当前版本">
            <p>2.0.0</p>
          </el-form-item>
          <el-form-item label="最新版本号">
            <el-input v-model.trim="edition" placeholder="请输入版本" />
            <el-switch
              v-model="isUpdate"
              active-text="是否强制更新"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

  },
  data() {
    return {
      edition: '', //  app版本
      isUpdate: false
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.el-collapse{
   /deep/ .el-collapse-item__header{
      font-size: 18px
   }
}
</style>
