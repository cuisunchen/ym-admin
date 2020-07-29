<template>
   <div class="loginConfigPage">
      <div class="loginBox flex">
         <span class="label">新手1元提现:</span>
         <el-switch v-model="value" active-text="是否开启新手1元提现" @change="switchChange" />
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
     this.getStatus() 
   },
   methods: {
      switchChange(e){
         this.setLoginType()
      },
      getStatus(){
         request({
            url:'/api/config/getWithdrawalSetting',
            method: 'get',
         }).then(res => {
            if(res.code == 200){
               this.value = res.data
            }
         })
      },
      setLoginType(){
         request({
            url:'/api/config/setWithdrawalOne',
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
