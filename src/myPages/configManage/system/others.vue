<template>
  <div class="othersPage">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="ios版本配置" name="1">
        <el-form style="width:500px" label-width="90px" label-position="left">
          <el-form-item label="当前版本">
            <p>{{appVersion.version}}</p>
          </el-form-item>
          <el-form-item label="最新版本号">
            <el-input v-model.trim="appObj.version" placeholder="请输入版本" />
            <el-switch
              v-model="appObj.isForceUpdate"
              active-text="是否强制更新"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="checkVersion('appObj')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="ios是否正在审核" name="2">
        <el-form style="width:500px" label-width="90px" label-position="left">
          <el-form-item label="当前版本">
            <p>{{iosVersion.version}}</p>
          </el-form-item>
          <el-form-item label="审核版本">
            <el-input v-model.trim="iosObj.version" placeholder="请输入版本" />
            <el-switch
              v-model="iosObj.isForceUpdate"
              active-text="是否提交审核"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="checkVersion('iosObj')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="android版本配置" name="3">
        <el-form style="width:500px" label-width="90px" label-position="left">
          <el-form-item label="当前版本">
            <p>{{androidVersion.version}}</p>
          </el-form-item>
          <el-form-item label="最新版本号">
            <el-input v-model.trim="androidObj.version" placeholder="请输入版本" />
            
          </el-form-item>
          <el-form-item label="配置下载地址">
            <el-input v-model.trim="androidObj.downloadLink" placeholder="请输入版本" />
            <el-switch
              v-model="androidObj.isForceUpdate"
              active-text="是否强制更新"/>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="checkVersion('androidObj')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>

      <el-collapse-item title="微信小程序是否正在审核" name="5">
        <el-form style="width:500px" label-width="90px" label-position="left">
          <el-form-item label="当前版本">
            <p>{{weChatVersion.version}}</p>
          </el-form-item>
          <el-form-item label="审核版本">
            <el-input v-model.trim="weChatObj.version" placeholder="请输入版本" />
            <el-switch
              v-model="weChatObj.isForceUpdate"
              active-text="是否提交审核"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="checkVersion('weChatObj')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script type="text/ecmascript-6">
import request from '@/utils/request'
export default {
  data() {
    return {
      activeNames: '0',
      edition: '', //  app版本
      isUpdate: false,

      appObj:{  //  这是app强制更新
        "clientName": 'app',
        "isForceUpdate": false,
        "version": ""
      },
      iosObj:{   //  这是ios是否在审核
        "clientName": 'iosAudit',
        "isForceUpdate": false,
        "version": ""
      },
      androidObj:{   //  这是ios是否在审核
        "clientName": 'android',
        "isForceUpdate": false,
        "version": "",
        "downloadLink":''
      },
      weChatObj:{   //  微信是否在审核
        "clientName": 'weChat',
        "isForceUpdate": false,
        "version": ""
      },

      appVersion:{},
      iosVersion:{},
      androidVersion:{},
      weChatVersion:{},
    }
  },
  created () {
     this.getVersion() 
  },
  methods: {
    getVersion(){
      request({
        url: '/api/config/viewVersion',
        method: 'get',
      }).then(res => {
        if (res.code == 200) {
          console.log(res)
          for (const item of res.data) {
            switch (item.clientName) {
              case 'iosAudit':
                this.iosVersion = item
                this.iosObj.isForceUpdate = item.forceUpdate
                break;
              case 'app':
                this.appVersion = item
                this.appObj.isForceUpdate = item.forceUpdate
                break;
              case 'weChat':
                this.weChatVersion = item
                this.weChatObj.isForceUpdate = item.forceUpdate
                break;
              case 'android':
                this.androidVersion = item
                this.androidObj.isForceUpdate = item.forceUpdate
                this.androidObj.downloadLink = item.downloadLink
                break;
            }
          }
        }
      })
    },
    checkVersion(type){
      // if( type == 'androidObj'){  
      //   this[type].downloadLink = 'http://www.guangyi009.com/apk/app-release.apk'
      // }
      request({
        url: '/api/config/setVersion',
        method: 'post',
        data: this[type]
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
