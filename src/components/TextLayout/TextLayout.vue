<template>
  <div class="textLayoutWrap flex">
    <div class="key flex" :style="{width: labelWidth + 'px'}">{{ label }}</div>
    <div class="value">
      <template>
        <slot />
      </template>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

  },
  props: {
    labelWidth: {
      type: Number
    },
    label: {
      type: String
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

<style scoped lang="scss" scoped>
.textLayoutWrap{
   width: 0;
   flex-shrink: 0;
   line-height: 20px;
   >div{
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
   }
   .key{
      flex-shrink: 0;
      font-weight: 700;
      margin-right: 16px;
   }
}

</style>
