<template>
   <div class="issuePage flex">
      <div class="content flex1">
         <div class="issueType flex align-center">
            <div class="label">发布广告类型</div>
            <el-cascader v-model="currentType" :options="types" 
               @visible-change="rangeTypeShow"
               @change="changeType" />
         </div>
         
         <transition name='fade'>
            <recommend :ad-type="adType" :hidden="hidden" v-if='currentTypeID == 4 || currentTypeID == 5 || currentTypeID == 6 || currentTypeID == 7'/> 
         </transition>
         <transition name='fade'>
            <questionAndLuck @preview="preview" :ad-type="adType" v-if='currentTypeID == 8 || currentTypeID == 9'/> 
         </transition>
         <transition name='fade'>
            <publicIssueComponent :ad-type="adType"  v-if='currentTypeID == 1 || currentTypeID == 2 || currentTypeID == 3'/> 
         </transition>
      </div>
   </div>
</template>

<script type="text/ecmascript-6">
import recommend from './components/recommend'
import questionAndLuck from './components/questionAndLuck'
import publicIssueComponent from './components/publicIssueComponent'
import request from '@/utils/request'
export default {
   data() {
      return {
         currentType: '',
         currentTypeID: 1,
         types:[
            {
               value: 1,
               label:'轮播',
               rangType: 1
            },
            {
               value: 2,
               label:'开屏',
               rangType: 1
            },
            {
               value: 3,
               label:'插屏',
               rangType: 1
            },
            {
               value: 0,
               label:'推荐',
               rangType: 1,
               children: [
                  {
                     value: 4,
                     label: '首页推荐',
                  },
                  {
                     value: 5,
                     label: '全国好运推荐',
                  },
                  {
                     value: 6,
                     label: '同城好运推荐',
                  },
                  {
                     value: 7,
                     label: '附近好运推荐',
                  }
               ]
            },
            {
               value: 8,
               label:'问答'
            },
            {
               value: 9,
               label:'好运'
            }
         ],
         activeNames: ['1'],
         previewDialog: false,
         adType:'',
         hidden: false,
      }
   },
   created () {
      this.currentType = this.types[0].value
      this.currentTypeID = this.types[0].value
      this.adType = this.types[0].label
      this.$setStorage('adObj',JSON.stringify(this.types[0]))
      return request({
         url:'/api/getOptions',
         method: 'get',
      }).then(res=>{
         console.log(res)
      })
   },
   methods: {
      
      preview(data){
         let previewParam = {
            previewType: 0,   //  0: 封面  1:首页  2: 好运
            pagePosition: 0,  // 0:首页弹框 1:首页轮播 2:首页推荐 3:问答 4:好运推荐 5:好运
         }
         data = Object.assign({},data,previewParam)
         let frame = document.getElementById('iframeId');  // 或者用vue语法 let frame = this.$refs.iframeId
         // if(process){}
         frame.contentWindow.postMessage(data,'http://localhost:8081/#/');
      },
      //  供子组件调用  方法
      
      rangeTypeShow(val){
         if(val){
            this.hidden = false
         }
         else{
            this.hidden = true
         }
      },
      changeType(val){  
         this.currentTypeID = val[val.length-1]
         let obj;
         for (const item of this.types) {
            if(item.children){
               for (const child of item.children) {
                  if(child.value == this.currentTypeID){
                     obj = child;
                     break
                  }
               }
            }else{
               if(item.value == this.currentTypeID){
                  obj = item
                  break 
               }
            }
         }
         console.log(obj.label)
         this.adType = obj.label
         this.$setStorage('adObj',JSON.stringify(obj))
      },
   },
   components: {
      recommend,questionAndLuck,publicIssueComponent
   }
}
</script>

<style lang="scss" scoped>
.issuePage{
   // width: 1200px;
   min-height:calc(100% - 170px);
   padding: 30px 20px;
   // margin: 20px ;
   .content{
      padding-right: 80px;
   }
   .issueType{
      margin-bottom: 20px;
      .label{
         color: #606266;
         width: 130px;
         flex-shrink: 0;
      }
   }
   .title{
      font-size: 18px;
      line-height: 60px;
      margin-top: 20px;
   }
   .el-collapse{
      width: 800px;
      margin-top: 50px;
      border-bottom: none;
      .title{
         font-size: 18px;
      }
      /deep/ .el-collapse-item__wrap{
         border: none;
      }
      .el-form{
         width: 800px;
      }
   }
}
</style>
