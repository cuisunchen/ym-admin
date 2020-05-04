<template>
  <div class="dialog-container">
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="用户id">
        {{ obj.sex }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="微信号">
        222
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="手机号">
        {{ obj.sex }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="等级">
        222
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="好友总数">
        {{ obj.sex }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="今日收益">
        222
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="全部收益">
        {{ obj.sex }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="已提现总额">
        222
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="剩余金额">
        {{ obj.sex }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="提现总数">
        222
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="消息总数">
        {{ obj.sex }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="问题总数">
        222
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="申诉总数">
        {{ obj.sex }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="首次登录">
        222
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="账号状态">
        {{ obj.sex }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="用户头像">
        222
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
