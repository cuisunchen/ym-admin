<template>
  <div class="app-container otherConfig-container">
    <h2>发布模块的配置</h2>

    <el-collapse v-model="activeNames">
      <el-collapse-item title="商户平台页面滚动文本配置" name="1">
        <el-form style="width:500px" label-width="70px" label-position="left">
          <el-form-item label="当前文本">
            <p>{{ scrollInput }}</p>
          </el-form-item>
          <el-form-item label="输入文本">
            <el-input v-model.trim="scrollText" placeholder="请输入文本内容" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateMerchantMessage">提交</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="发布广告类型页面轮播图配置" name="2">
        <p class="title">轮播图列表</p>
        <div v-if="swiperList.length < 1" class="noData">暂无,请上传!</div>
        <div v-else class="lists flex">
          <div v-for="(item,index) in swiperList" :key="index" class="item" @click="showContent(item.contentImg)">
            <img :src="item.titleImg" alt="">
            <i class="el-icon-close" @click.stop="deletePic(item.id,2)" />
          </div>
        </div>

        <el-form style="width:800px">
          <el-form-item label="上传标题图片">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="swiperTitleImgUploadSuccess"
              :show-file-list="false"
              :before-upload="beforeImgUpload"
            >
              <el-button v-if="swiperTitleImgLoading" circle :loading="swiperTitleImgLoading" />
              <div v-else>
                <img v-if="swiperForm.titleImg" :src="swiperForm.titleImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传内容图片">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="swiperContentImgUploadSuccess"
              :show-file-list="false"
              :before-upload="beforeImgUpload"
            >
              <el-button v-if="swiperContentImgLoading" circle :loading="swiperContentImgLoading" />
              <div v-else>
                <img v-if="swiperForm.contentImg" :src="swiperForm.contentImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addReleaseNotes(2)">添加</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="发布须知页面配置" name="3">
        <p class="title">须知列表</p>
        <div v-if="releaseNotes.length < 1" class="noData">暂无,请上传!</div>
        <div v-else class="lists flex">
          <div v-for="(item,index) in releaseNotes" :key="index" class="item" @click="showContent(item.contentImg)">
            <img :src="item.titleImg" alt="">
            <i class="el-icon-close" @click.stop="deletePic(item.id,3)" />
          </div>
        </div>
        <el-form style="width:800px">
          <el-form-item label="上传标题图片">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="releaseNotesTitleImgUploadSuccess"
              :show-file-list="false"
              :before-upload="beforeImgUpload"
            >
              <el-button v-if="releaseNotesTitleImgLoading" circle :loading="releaseNotesTitleImgLoading" />
              <div v-else>
                <img v-if="releaseNotesForm.titleImg" :src="releaseNotesForm.titleImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传内容图片">
            <el-upload
              class="content-uploader"
              action=""
              :http-request="releaseNotesConImgUploadSuccess"
              :show-file-list="false"
              :before-upload="beforeImgUpload"
            >
              <el-button v-if="releaseNotesContentImgLoading" circle :loading="releaseNotesContentImgLoading" />
              <div v-else>
                <img v-if="releaseNotesForm.contentImg" :src="releaseNotesForm.contentImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addReleaseNotes(3)">添加</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
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
import request from '@/utils/request'
export default {
  components: {

  },
  data() {
    return {
      scrollText: '',
      scrollInput: '',
      imgLoading: false,
      swiperTitleImgLoading: false,
      swiperContentImgLoading: false,
      releaseNotesTitleImgLoading: false,
      releaseNotesContentImgLoading: false,
      imgUrl: '',
      tagName: '',
      centerDialogVisible: false,
      activeNames: '',
      swiperList: [],
      releaseNotes: [], //  发布须知图片列表
      swiperForm: {
        titleImg: '',
        contentImg: ''
      },
      releaseNotesForm: {
        titleImg: '',
        contentImg: ''
      },
      previewUrl: '' //  预览图片地址
    }
  },
  created() {
    this.getReleaseNotes(2)
    this.getReleaseNotes(3)
    this.getMerchantMessage()
  },
  methods: {
    initForm() {
      this.releaseNotesForm = {
        titleImg: '',
        contentImg: ''
      }
      this.swiperForm = {
        titleImg: '',
        contentImg: ''
      }
    },
    updateMerchantMessage() {
      request({
        url: '/api/config/updateMerchantMessage',
        method: 'post',
        data: { message: this.scrollText }
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('修改成功!')
          this.scrollText = ''
          this.getMerchantMessage()
        }
      })
    },
    getMerchantMessage() {
      request({
        url: '/api/config/getMerchantMessage',
        method: 'get'
      }).then(res => {
        if (res.code == 200) {
          this.scrollInput = res.data
        }
      })
    },
    addReleaseNotes(typeId) {
      if (typeId == 3) {
        this.releaseNotesForm['typeId'] = typeId
      } else {
        this.swiperForm['typeId'] = typeId
      }

      request({
        url: '/api/config/addReleaseNotes',
        method: 'post',
        data: typeId == 3 ? this.releaseNotesForm : this.swiperForm
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('上传成功!')
          this.initForm()
          this.getReleaseNotes(typeId)
        }
      })
    },
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
    getReleaseNotes(id) {
      request({
        url: '/api/config/getReleaseNotes',
        method: 'post',
        data: { id }
      }).then(res => {
        if (res.code == 200) {
          if (id == 2) {
            this.swiperList = res.data
          } else {
            this.releaseNotes = res.data
          }
        }
      })
    },
    showContent(url) {
      this.previewUrl = url
      this.centerDialogVisible = true
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
    releaseNotesTitleImgUploadSuccess(file) {
      const fd = new FormData()
      fd.append('file', file.file)
      this.releaseNotesTitleImgLoading = true
      this.successRequest(fd, 'titleImg', 'releaseNotesTitleImgLoading')
    },
    releaseNotesConImgUploadSuccess(file) {
      const fd = new FormData()
      fd.append('file', file.file)
      this.releaseNotesContentImgLoading = true
      this.successRequest(fd, 'contentImg', 'releaseNotesContentImgLoading')
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
        this.releaseNotesForm[imgType] = res.data
      })
    },
    //  图片上传请求
    swiperSuccessRequest(fd, imgType, loaddingType) {
      this.$imgUpload('/image/upload', fd).then(res => {
        this[loaddingType] = false
        this.swiperForm[imgType] = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lists{
   margin-bottom: 20px;
}
.lists .item{
   position: relative;
   margin-right: 10px;
}
.lists .item .el-icon-close{
   position: absolute;
   right: 4px;
   top: 4px;
   font-size: 18px;
   cursor: pointer;
   color: #000;
   background-color: rgba(255,255,255, .5);
   border-radius: 50%;
}
.lists img{
   width: 180px;
   height: 60px;
   border-radius: 6px;
}
/deep/ .contentDialog{
   height: auto;
   max-height: 600px;
   img{
      width: 100%;
   }
}

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
   .content-uploader{
      /deep/ .el-upload{
         display: flex;
         align-items: center;
         justify-content: center;
         width: 98px;
         height: 98px;
         border: 1px dashed #d9d9d9;
         border-radius: 6px;
         cursor: pointer;
         position: relative;
         overflow: hidden;
         .el-button{
            border: none;
            font-size: 20px;
         }
         .avatar {
            width: 98px;
            height: 98px;
            display: block;
         }
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
  .avatar {
    width: 180px;
    height: 60px;
    display: block;
  }
</style>
