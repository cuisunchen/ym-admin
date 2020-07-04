<template>
  <div class="app-container orderTaking-container">
    <el-tabs v-model="editableTabsValue" type="card" @tab-click="tabClick">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :name="item.name"
        :label="item.title" />

      <!-- <issue-component :obj="currentObj" :config="config"></issue-component> -->
    </el-tabs>

    <div class="corverBox" v-if="editableTabsValue == 1">
      <div class="currentPic flex align-center">
        <div class="label">当前图片:</div>
        <div v-if="!corverList.topImgUrl" class="noData">暂无,请上传!</div>
        
        <div class="imgs" v-else>
          <img :src="corverList.topImgUrl" alt="">
        </div>
      </div>
      <el-form style="width:800px">
        <el-form-item>
          <p class="tit" slot="label" style="text-align: center">上传封面标题图片 <br>2:3</p>
          <el-upload
            class="cover-uploader"
            action=""
            :http-request="coverTitleImgUploadSuccess"
            :show-file-list="false"
            :before-upload="beforeImgUpload">
            <el-button v-if="coverTitleImgLoading" circle :loading="coverTitleImgLoading" />
            <div v-else>
              <img v-if="coverForm.titleImg" :src="coverForm.titleImg" class="avatar">
              <i v-else class="el-icon-plus cover-uploader-icon" />
            </div>
          </el-upload>
          
        </el-form-item>
        <el-form-item >
          <p class="contentTit" slot="label" style="text-align: center">上传封面内容图片</p>
          <el-upload
            class="cover-uploader"
            action=""
            :http-request="coverContentImgUploadSuccess"
            :show-file-list="false"
            :before-upload="beforeImgUpload">
            <el-button v-if="coverContentImgLoading" circle :loading="coverContentImgLoading" />
            <div v-else>
              <img v-if="coverForm.contentImg" :src="coverForm.contentImg" class="avatar">
              <i v-else class="el-icon-plus cover-uploader-icon" />
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDefaultImg(coverForm,'COVER')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="swiperBox" v-if="editableTabsValue == 2">
      <div class="currentPic flex align-center">
        <div class="label">当前图片:</div>
        <div v-if="!swiperList.topImgUrl" class="noData">暂无,请上传!</div>
        <div class="imgs" v-else>
          <img :src="swiperList.topImgUrl" alt="">
        </div>
      </div>
      <el-form  style="width:800px">
        <el-form-item>
          <p class="swiperTit" slot="label" style="text-align: center">上传轮播标题图片 <br>2:1</p>
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="swiperTitleImgUploadSuccess"
            :show-file-list="false"
            :before-upload="beforeImgUpload">
            <el-button v-if="swiperTitleImgLoading" circle :loading="swiperTitleImgLoading" />
            <div v-else>
              <img v-if="swiperForm.titleImg" :src="swiperForm.titleImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <p class="contentTit" slot="label" style="text-align: center">上传轮播内容图片</p>
          <el-upload
            class="cover-uploader"
            action=""
            :http-request="swiperContentImgUploadSuccess"
            :show-file-list="false"
            :before-upload="beforeImgUpload">
            <el-button v-if="swiperContentImgLoading" circle :loading="swiperContentImgLoading" />
            <div v-else>
              <img v-if="swiperForm.contentImg" :src="swiperForm.contentImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDefaultImg(swiperForm,'ROTATION')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <el-dialog
      title="内容"
      custom-class="contentDialog"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <img :src="previewUrl" alt="">
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      editableTabsValue: '1',
      editableTabs: [
        {
          title: '封面默认图片',
          name: '1'
        }, {
          title: '轮播图默认图片',
          name: '2'
        }
      ],
      currentObj: {},
      config: {},
      coverForm: {
        titleImg: '',
        contentImg: ''
      },
      swiperForm: {
        titleImg: '',
        contentImg: ''
      },
      coverTitleImgLoading: false,
      coverContentImgLoading: false,
      swiperTitleImgLoading: false,
      swiperContentImgLoading: false,

      centerDialogVisible: false,
      corverList:{},
      swiperList:{},
      previewUrl: '' //  预览图片地址
    }
  },
  created () {
    this.getDefaultPic('COVER')
    this.getDefaultPic('ROTATION')
  },
  methods: {
    deletePic(id, typeId) {
      request({
        url: '/api/config/delReleaseNotes',
        method: 'post',
        data: { id }
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('删除成功!')
          this.getReleaseNotes(typeId)
        }
      })
    },
    showContent(url) {
      this.previewUrl = url
      this.centerDialogVisible = true
    },
    getDefaultPic(type){
      this.$ajax({
        url: '/api/config/getOtherImg',
        method: 'post',
        data: {"param": type}
      }).then(res=>{
        if(res.code == 200){
          if(type == 'COVER'){
            this.corverList = res.data
          }else{
            this.swiperList = res.data
          }
        }
      })
    },
    addDefaultImg(param,type){
      let params = {
        "contentImgUrl": param.contentImg,
        "param": type,
        "topImgUrl": param.titleImg
      }
      this.$ajax({
        url: '/api/config/setOtherImg',
        method: 'post',
        data: params
      }).then(res=>{
        if(res.code == 200){
          this.$message.success('添加成功')
          if(type == 'COVER'){
            this.coverForm = {
              titleImg: '',
              contentImg: ''
            },
            this.getDefaultPic('COVER')
          }else{
            this.swiperForm = {
              titleImg: '',
              contentImg: ''
            }
            this.getDefaultPic('ROTATION')
          }
        }
      })
    },
    tabClick(tab, event) {
      this.currentObj = this.editableTabs[this.editableTabsValue - 1]
    },
    swiperTitleImgUploadSuccess(file) {
      const fd = new FormData()
      fd.append('file', file.file)
      this.swiperTitleImgLoading = true
      this.swiperSuccessRequest(fd, 'titleImg', 'swiperTitleImgLoading')
    },
    swiperContentImgUploadSuccess(file) {
      const fd = new FormData()
      fd.append('file', file.file)
      this.swiperContentImgLoading = true
      this.swiperSuccessRequest(fd, 'contentImg', 'swiperContentImgLoading')
    },
    coverTitleImgUploadSuccess(file) {
      const fd = new FormData()
      fd.append('file', file.file)
      this.coverTitleImgLoading = true
      this.successRequest(fd, 'titleImg', 'coverTitleImgLoading')
    },
    coverContentImgUploadSuccess(file) {
      const fd = new FormData()
      fd.append('file', file.file)
      this.coverContentImgLoading = true
      this.successRequest(fd, 'contentImg', 'coverContentImgLoading')
    },
    beforeImgUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    //  图片上传请求
    successRequest(fd, imgType, loaddingType) {
      this.$imgUpload('/image/upload', fd).then(res => {
        this[loaddingType] = false
        this.coverForm[imgType] = res.data
      })
    },
    //  图片上传请求
    swiperSuccessRequest(fd, imgType, loaddingType) {
      this.$imgUpload('/image/upload', fd).then(res => {
        this[loaddingType] = false
        this.swiperForm[imgType] = res.data
      })
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-upload{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 180px;
      height: 60px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .el-button{
         border: none;
         font-size: 20px;
      }
   }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .corverBox{
    .currentPic{
      margin-bottom: 50px;
      .label{
        font-size: 14px;
        color: #606266;
        font-weight: 700;
        margin-right: 20px;
      }
      .imgs{
        width: 60px;
        height: 120px;
        font-size: 0;
        overflow: hidden;
        border-radius: 6px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .swiperBox{
    .currentPic{
      margin-bottom: 50px;
      .label{
        font-size: 14px;
        color: #606266;
        font-weight: 700;
        margin-right: 20px;
      }
      .imgs{
        width: 120px;
        height: 60px;
        font-size: 0;
        overflow: hidden;
        border-radius: 6px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
   .cover-uploader{

      /deep/ .el-upload{
         width: 60px;
         height: 120px;
      }
      .cover-uploader-icon {
         font-size: 28px;
         color: #8c939d;
         width: 60px;
         height: 120px;
         line-height: 120px;
         text-align: center;
      }
   }

  .avatar {
    width: 180px;
    height: 60px;
    display: block;
  }
  .tit{
    font-weight: 700;
    color: #606266;
    line-height: 20px;
    margin-top: 40px;
  }
  .contentTit{
    line-height: 30px;
    margin-top: 45px;
    font-weight: 700;
    color: #606266;
  }
  .swiperTit{
    font-weight: 700;
    color: #606266;
    line-height: 20px;
    margin-top: 10px;
  }
</style>
