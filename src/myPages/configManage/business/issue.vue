<template>
  <div class="app-container issueConfig-container">
    <el-tabs v-model="editableTabsValue" type="card" @tab-click="tabClick">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :name="item.name"
        :label="item.title"
      />
      <issue-component :obj="currentObj" :config="config" />
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import issueComponent from '../components/issueComponent'
import request from '@/utils/request'
export default {
  components: {
    issueComponent
  },
  data() {
    return {
      editableTabsValue: '1',
      editableTabs: [
        {
          title: '轮播',
          name: '1',
          content: '轮播总价'
        }, {
          title: '开屏',
          name: '2',
          content: '封面总价'
        }, {
          title: '弹窗',
          name: '3',
          content: '弹窗总价'
        }, {
          title: '问答',
          name: '4',
          content: '问答单价'
        }, {
          title: '推荐',
          name: '5',
          content: '设置总价'
        }, {
          title: '好运',
          name: '6',
          content: '好运单价',
          winningRate: '20'
        }
      ],
      currentObj: {},
      config: {}
    }
  },
  created() {
    this.currentObj = this.editableTabs[0]
    this.getConfigPrice('1')
  },
  methods: {
    editConfig(param) {
      const params = {
        'totalPrice': null,
        'typeId': null,
        'updateGoodLuck': {
          'cityCharge': null,
          'cityMaxReward': null,
          'cityMinReward': null,
          'cityTotalNum': null,
          'countryCharge': null,
          'countryMaxReward': null,
          'countryMinReward': null,
          'countryTotalNum': null,
          'nearbyCharge': null,
          'nearbyMaxReward': null,
          'nearbyMinReward': null,
          'nearbyTotalNum': null,
          'rate': null
        },
        'updateQA': {
          'cityCharge': null,
          'cityMinNum': null,
          'countryCharge': null,
          'countryMinNum': null,
          'nearbyCharge': null,
          'nearbyMinNum': null,
          'price': null
        },
        'updateRecommend': {
          'goodluckCityPrice': null,
          'goodluckCountryPrice': null,
          'goodluckNearbyPrice': null,
          'homeTotalPrice': null
        }
      }
      request({
        url: '/api/config/updateConfigPrice',
        method: 'post',
        data: Object.assign(params, param)
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('修改成功')
        }
      })
    },
    tabClick(tab, event) {
      this.currentObj = this.editableTabs[this.editableTabsValue - 1]
      this.getConfigPrice(this.currentObj.name)
    },
    getConfigPrice(typeId) {
      request({
        url: '/api/config/getConfigPrice',
        method: 'post',
        data: { typeId } //  1轮播2开屏3弹框4问答5推荐6好运
      }).then(res => {
        if (res.code == 200) {
          // console.log(res)
          this.config = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
