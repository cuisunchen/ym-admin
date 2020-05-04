<template>
  <div class="dialog-container">
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="订单id">
        {{ dataObj.id }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="订单编号">
        {{ dataObj.orderNumber }}
      </TextLayout>
    </div>

    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="用户账号">
        {{ dataObj.userAccount }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="总用户人数">
        {{ dataObj.userTotal }}
      </TextLayout>
    </div>

    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="发布金额">
        {{ dataObj.profit }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="创建时间">
        {{ dataObj.creatTime }}
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="审核时间">
        {{ dataObj.checkTime?dataObj.checkTime:'未审核' }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="发布时间">
        {{ dataObj.issueTime }}
      </TextLayout>
    </div>

    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="截止时间">
        {{ dataObj.endTime?dataObj.endTime:'未截止' }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="完成时间">
        {{ dataObj.finishTime?dataObj.finishTime:'未完成' }}
      </TextLayout>
    </div>
    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="支付方式">
        {{ dataObj.payType }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="状态">
        {{ dataObj.status }}
      </TextLayout>
    </div>

    <div class="flex">
      <TextLayout :label-width="70" class="flex1" label="内容链接">
        {{ dataObj.homeBigImgUrl }}
      </TextLayout>
      <TextLayout :label-width="70" class="flex1" label="封面图">
        <viewer>
          <img style="width:30px;height: 30px" width="300" :src="dataObj.homeTopImgUrl" alt="" srcset="">
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
    dataObj: {
      type: Object
    }
  }
}
</script>
