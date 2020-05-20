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

      <el-collapse-item title="ios是否正在审核" name="2">
        <el-form style="width:500px" label-width="90px" label-position="left">
          <el-form-item label="当前版本">
            <p>2.0.0</p>
          </el-form-item>
          <el-form-item label="审核版本">
            <el-input v-model.trim="edition" placeholder="请输入版本" />
            <el-switch
              v-model="isUpdate"
              active-text="是否提交审核"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="android是否正在审核" name="3">
        <el-form style="width:500px" label-width="90px" label-position="left">
          <el-form-item label="当前版本">
            <p>2.0.0</p>
          </el-form-item>
          <el-form-item label="审核版本">
            <el-input v-model.trim="edition" placeholder="请输入版本" />
            <el-switch
              v-model="isUpdate"
              active-text="是否提交审核"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="微信小程序是否正在审核" name="4">
        <el-form style="width:500px" label-width="90px" label-position="left">
          <el-form-item label="当前版本">
            <p>2.0.0</p>
          </el-form-item>
          <el-form-item label="审核版本">
            <el-input v-model.trim="formObj.version" placeholder="请输入版本" />
            <el-switch
              v-model="formObj.isForceUpdate"
              active-text="是否提交审核"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="checkVersion('weChat')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script type="text/ecmascript-6">
import request from '@/utils/request'
export default {
  components: {

  },
  data() {
    return {
      activeNames: '0',
      edition: '', //  app版本
      isUpdate: false,
      formObj: {
        "isForceUpdate": true,
        "version": "1.0.0"
      }
    }
  },
  methods: {
    checkVersion(type){
      let param = {
        "clientName": type,
      }
      console.log(Object.assign({},param,this.formObj))
      // return
      request({
        url: '/api/config/setVersion',
        method: 'post',
        data: Object.assign({},param,this.formObj)
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('设置成功')
        }
      })
    }
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
