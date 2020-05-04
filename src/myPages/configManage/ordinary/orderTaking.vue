<template>
  <div class="app-container orderTaking-container">
    <el-tabs v-model="editableTabsValue" type="card" @tab-click="tabClick">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :name="item.name"
        :label="item.title"
      />

      <!-- <issue-component :obj="currentObj" :config="config"></issue-component> -->
    </el-tabs>

    <el-form v-if="editableTabsValue == 1" style="width:800px">
      <el-form-item label="上传封面标题图片">
        <el-upload
          class="cover-uploader"
          action=""
          :http-request="coverTitleImgUploadSuccess"
          :show-file-list="false"
          :before-upload="beforeImgUpload"
        >
          <el-button v-if="coverTitleImgLoading" circle :loading="coverTitleImgLoading" />
          <div v-else>
            <img v-if="coverForm.titleImg" :src="coverForm.titleImg" class="avatar">
            <i v-else class="el-icon-plus cover-uploader-icon" />
          </div>
        </el-upload>
        2:3
      </el-form-item>
      <el-form-item label="上传封面内容图片">
        <el-upload
          class="cover-uploader"
          action=""
          :http-request="coverContentImgUploadSuccess"
          :show-file-list="false"
          :before-upload="beforeImgUpload"
        >
          <el-button v-if="coverContentImgLoading" circle :loading="coverContentImgLoading" />
          <div v-else>
            <img v-if="coverForm.contentImg" :src="coverForm.contentImg" class="avatar">
            <i v-else class="el-icon-plus cover-uploader-icon" />
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addReleaseNotes(2)">添加</el-button>
      </el-form-item>
    </el-form>
    <el-form v-if="editableTabsValue == 2" style="width:800px">
      <el-form-item label="上传轮播标题图片">
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
        2:1
      </el-form-item>
      <el-form-item label="上传轮播内容图片">
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
      swiperContentImgLoading: false
    }
  },
  methods: {
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
      this.releaseNotesTitleImgLoading = true
      this.successRequest(fd, 'titleImg', 'coverTitleImgLoading')
    },
    coverContentImgUploadSuccess(file) {
      const fd = new FormData()
      fd.append('file', file.file)
      this.releaseNotesContentImgLoading = true
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
        this.releaseNotesForm[imgType] = res.data
      })
    },
    //  图片上传请求
    swiperSuccessRequest(fd, imgType, loaddingType) {
      this.$imgUpload('/image/upload', fd).then(res => {
        this[loaddingType] = false
        this.swiperForm[imgType] = res.data
      })
    },
    confirm() {
      console.log('confirm')
    }
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
   // .content-uploader{
   //    /deep/ .el-upload{
   //       display: flex;
   //       align-items: center;
   //       justify-content: center;
   //       width: 98px;
   //       height: 98px;
   //       border: 1px dashed #d9d9d9;
   //       border-radius: 6px;
   //       cursor: pointer;
   //       position: relative;
   //       overflow: hidden;
   //       .el-button{
   //          border: none;
   //          font-size: 20px;
   //       }
   //       .avatar {
   //          width: 98px;
   //          height: 98px;
   //          display: block;
   //       }
   //    }
   // }
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
</style>
