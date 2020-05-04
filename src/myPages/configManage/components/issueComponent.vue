<template>
  <div class="issueComponent">
    <el-form
      :inline="currentObj.name == 6 ?true:false"
      :label-width="currentObj.name == 1 || currentObj.name == 2 || currentObj.name == 3 ?'70px': '130px'"
      label-position="left"
      class="demo-form-inline"
    >
      <div v-if="currentObj.name == 1 || currentObj.name == 2 || currentObj.name == 3" class="wrap">
        <el-form-item :label="obj.title">
          <el-col :span="6">
            <el-input v-model.trim="config.totalPrice" :placeholder="obj.content" />
          </el-col>
        </el-form-item>
      </div>
      <div v-if="obj.name == 4 && configOpt.qsForm != undefined" class="wrap" style="width:400px">
        <el-form-item label="全国最低条数">
          <el-input v-model.trim.number="configOpt.qsForm.countryMinNum" :placeholder="obj.content" />
        </el-form-item>
        <el-form-item label="手续费">
          <el-input v-model.trim="configOpt.qsForm.countryCharge" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="同城最低条数">
          <el-input v-model.trim.number="configOpt.qsForm.cityMinNum" :placeholder="obj.content" />
        </el-form-item>
        <el-form-item label="手续费">
          <el-input v-model.trim="configOpt.qsForm.cityCharge" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="附近最低条数">
          <el-input v-model.trim.number="configOpt.qsForm.nearbyMinNum" :placeholder="obj.content" />
        </el-form-item>
        <el-form-item label="手续费">
          <el-input v-model.trim="configOpt.qsForm.nearbyCharge" placeholder="请输入" />
        </el-form-item>

        <el-form-item>
          <span slot="label" style="word-spacing: 5px;">问 答 单 价</span>
          <el-input v-model.trim="configOpt.qsForm.price" :placeholder="obj.content" />
        </el-form-item>
      </div>

      <div v-if="currentObj.name == 5 && configOpt.qsForm != undefined" class="wrap clear">
        <el-col :span="8">
          <el-form-item v-if="currentObj.name == 5" label="首页今日推荐总价">
            <el-input v-model.trim="configOpt.qsForm.homeTotalPrice" placeholder="推荐总价" />
          </el-form-item>
          <el-form-item v-if="currentObj.name == 5" label="好运全国推荐总价">
            <el-input v-model.trim="configOpt.qsForm.goodluckCountryPrice" placeholder="推荐总价" />
          </el-form-item>
          <el-form-item v-if="currentObj.name == 5" label="好运同城推荐总价">
            <el-input v-model.trim="configOpt.qsForm.goodluckCityPrice" placeholder="推荐总价" />
          </el-form-item>
          <el-form-item v-if="currentObj.name == 5" label="好运附近推荐总价">
            <el-input v-model.trim="configOpt.qsForm.goodluckNearbyPrice" placeholder="推荐总价" />
          </el-form-item>
        </el-col>
      </div>
      <div v-if="currentObj.name == 6 && configOpt.qsForm != undefined" class="wrap">
        <el-form-item label="全国最低发布总数">
          <el-input v-model.trim.number="configOpt.qsForm.countryTotalNum" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最大奖励" label-width="70px">
          <el-input v-model.trim="configOpt.qsForm.countryMaxReward" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最低奖励" label-width="70px">
          <el-input v-model.trim="configOpt.qsForm.countryMinReward" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手续费" label-width="70px">
          <el-input v-model.trim="configOpt.qsForm.countryCharge" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="同城最低发布总数">
          <el-input v-model.trim.number="configOpt.qsForm.cityTotalNum" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最大奖励" label-width="70px">
          <el-input v-model.trim="configOpt.qsForm.cityMaxReward" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最低奖励" label-width="70px">
          <el-input v-model.trim="configOpt.qsForm.cityMinReward" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手续费" label-width="70px">
          <el-input v-model.trim="configOpt.qsForm.cityCharge" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="附近最低发布总数">
          <el-input v-model.trim.number="configOpt.qsForm.nearbyTotalNum" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最大奖励" label-width="70px">
          <el-input v-model.trim="configOpt.qsForm.nearbyMaxReward" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最低奖励" label-width="70px">
          <el-input v-model.trim="configOpt.qsForm.nearbyMinReward" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手续费" label-width="70px">
          <el-input v-model.trim="configOpt.qsForm.nearbyCharge" placeholder="请输入" />
        </el-form-item>

        <el-form-item>
          <span slot="label" style="word-spacing: 31px;">中 奖 率</span>
          <el-col :span="20">
            <el-input v-model.trim="configOpt.qsForm.rate" style="width: 80%" placeholder="请输入中奖率" /> %
          </el-col>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" :style="{'margin-left': obj.name == 6 ? '130px' : '0'}" @click="eidtConfig">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    obj: {
      type: Object
    },
    config: {
      type: Object
    }
  },
  data() {
    return {
      identifier: '',
      winningRate: '',
      currentObj: {},
      configOpt: {},
      totalPrice: 100, //  轮播/封面/弹窗总价
      qsForm: {
        countryMinNum: 100, //  全国最低条数
        countryCharge: 10, //  全国手续费
        cityMinNum: 100, //  同城最低条数
        cityCharge: 10, //  同城手续费
        nearbyMinNum: 100, //  附近最低条数
        nearbyCharge: 10, //  附近手续费
        price: 0.3 //  问答单价
      },
      rmForm: {
        homeTotalPrice: 1000, // 首页今日推荐总价
        goodluckCountryPrice: 1000, // 好运全国推荐总价
        goodluckCityPrice: 1000, // 好运同城推荐总价
        goodluckNearbyPrice: 1000 // 好运附近推荐总价
      },
      glForm: {
        countryTotalNum: 500, //  全国最低发布总数
        countryMaxReward: 50, //  全国最大奖励
        countryMinReward: 500, //  全国最低奖励
        countryCharge: 20, //  全国手续费
        cityTotalNum: 500, //  同城最低发布总数
        cityMaxReward: 50, //  同城最大奖励
        cityMinReward: 500, //  同城最低奖励
        cityCharge: 20, //  同城手续费
        nearbyTotalNum: 500, //  附近最低发布总数
        nearbyMaxReward: 50, //  附近最大奖励
        nearbyMinReward: 500, //  附近最低奖励
        nearbyCharge: 20, //  附近手续费
        rate: '20' //  中奖率
      }
    }
  },
  watch: {
    obj: {
      deep: true, // 深度监听
      handler(newVal, oldVal) {
        this.currentObj = newVal
      }
    },
    config: {
      deep: true, // 深度监听
      handler(newVal, oldVal) {
        this.configOpt = newVal
      }
    }
  },
  created() {
    this.configOpt = this.config
    this.currentObj = this.obj
  },
  methods: {
    eidtConfig() {
      let param = {}
      if (this.currentObj.name == 1 || this.currentObj.name == 2 || this.currentObj.name == 3) {
        param = {
          'totalPrice': Number(this.config.totalPrice * 100),
          'typeId': Number(this.currentObj.name)
        }
      } else if (this.currentObj.name == 4) {
        param = {
          'typeId': this.currentObj.name,
          'updateQA': {
            'cityCharge': Number(this.configOpt.qsForm.cityCharge * 100),
            'cityMinNum': this.configOpt.qsForm.cityMinNum,
            'countryCharge': Number(this.configOpt.qsForm.countryCharge * 100),
            'countryMinNum': this.configOpt.qsForm.countryMinNum,
            'nearbyCharge': Number(this.configOpt.qsForm.nearbyCharge * 100),
            'nearbyMinNum': this.configOpt.qsForm.nearbyMinNum,
            'price': Number(this.configOpt.qsForm.price * 100)
          }
        }
      } else if (this.currentObj.name == 5) {
        param = {
          'typeId': this.currentObj.name,
          'updateRecommend': {
            'goodluckCityPrice': Number(this.configOpt.qsForm.goodluckCityPrice * 100),
            'goodluckCountryPrice': Number(this.configOpt.qsForm.goodluckCountryPrice * 100),
            'goodluckNearbyPrice': Number(this.configOpt.qsForm.goodluckNearbyPrice * 100),
            'homeTotalPrice': Number(this.configOpt.qsForm.homeTotalPrice * 100)
          }
        }
      } else if (this.currentObj.name == 6) {
        param = {
          'typeId': this.currentObj.name,
          'updateGoodLuck': {
            'cityCharge': Number(this.configOpt.qsForm.cityCharge * 100),
            'cityMaxReward': Number(this.configOpt.qsForm.cityMaxReward * 100),
            'cityMinReward': Number(this.configOpt.qsForm.cityMinReward * 100),
            'cityTotalNum': this.configOpt.qsForm.cityTotalNum,
            'countryCharge': Number(this.configOpt.qsForm.countryCharge * 100),
            'countryMaxReward': Number(this.configOpt.qsForm.countryMaxReward * 100),
            'countryMinReward': Number(this.configOpt.qsForm.countryMinReward * 100),
            'countryTotalNum': this.configOpt.qsForm.countryTotalNum,
            'nearbyCharge': Number(this.configOpt.qsForm.nearbyCharge * 100),
            'nearbyMaxReward': Number(this.configOpt.qsForm.nearbyMaxReward * 100),
            'nearbyMinReward': Number(this.configOpt.qsForm.nearbyMinReward * 100),
            'nearbyTotalNum': this.configOpt.qsForm.nearbyTotalNum,
            'rate': Number(this.configOpt.qsForm.rate)
          }
        }
      }
      this.$parent.$parent.editConfig(param)
    }
  }
}
</script>

<style lang="scss" scoped>
.issueComponent{
   overflow-x: scroll;
   .el-form{
      width: 1114px;
   }
}
</style>
