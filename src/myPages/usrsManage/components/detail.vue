<template>
  <div class="dialog-container">
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="用户id">
        {{ obj.id }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="微信昵称">
        {{obj.wechat || '--'}}
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="手机号">
        {{ obj.mobile }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="等级">
        {{obj.level}}
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="好友总数">
        {{ obj.friends }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="今日收益">
        {{ obj.todayEarn }}
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="全部收益">
        {{ obj.totalEarn }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="已提现总额">
        {{ obj.widthdrawal }}
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="剩余金额">
        {{ obj.surplus }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="提现总数">
        {{ obj.widthdrawalNum }}
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="消息总数">
        {{ obj.msgNum }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="问题总数">
        {{ obj.qsNum }}
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="申诉总数">
        {{ obj.appealNum }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="首次登录">
        {{ obj.time || '--' }}
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="账号状态">
        {{ obj.status ? '封号中' : '正常' }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="用户头像">
        <viewer>
          <img style="width:30px;height: 30px" width="300" :src="obj.avator" alt="" srcset="">
        </viewer>
      </TextLayout>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TextLayout from '@/components/TextLayout/TextLayout'
export default {
  components: {
    TextLayout
  },
  props: {
    obj: {
      type: Object
    }
  },
  
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.detailPage{

}
</style>
