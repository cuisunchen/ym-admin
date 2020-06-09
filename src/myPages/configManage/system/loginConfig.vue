<template>
   <div class="loginConfigPage">
      <div class="loginBox flex">
         <span class="label">登录方式:</span>
         <el-switch v-model="value" active-text="是否启用短信验证码登录" @change="switchChange" />
      </div>
   </div>
</template>

<script type="text/ecmascript-6">
import request from '@/utils/request'
export default {
   data() {
      return {
         value: true
      }
   },
   created () {
     this.getLoginType() 
   },
   methods: {
      switchChange(e){
         this.setLoginType()
      },
      getLoginType(){
         request({
            url:'/api/config/getLoginType',
            method: 'get',
         }).then(res => {
            console.log(res)
            if(res.code == 200){
               this.value = res.data.status == 0 ? true : false
            }
         })
      },
      setLoginType(){
         request({
            url:'/api/config/setLoginType',
            method: 'post',
            data: {
               id: this.value ? 0 : 1
            }
         }).then(res => {
            if(res.code == 200){
               this.value = res.data.status == 0 ? true : false
               this.$message.success('设置成功')
            }
         })
      }
   },
   components: {

   }
}
</script>

<style lang="scss" scoped>
.loginConfigPage{
   .loginBox{
      .label{
         margin-right: 10px;
      }
   }
}
</style>
