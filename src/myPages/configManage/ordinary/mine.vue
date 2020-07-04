<template>
  <div class="app-container mine-container">
    <el-form label-width="130px" label-position="left">
      <el-form-item label="app应用分享图片">
        <el-col :span="6">
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="imgUploadSuccess"
            :show-file-list="false"
            :before-upload="beforeImgUpload">
            <el-button v-if="imgLoading" circle :loading="imgLoading" />
            <div v-else>
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </div>
          </el-upload>
        </el-col>
        <el-button type="primary" @click="confirm">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      content: '',
      imageUrl: '',
      imgLoading: false
    }
  },
  methods: {
    confirm() {
      // let params = {
      //   "contentImgUrl": param.contentImg,
      //   "param": type,
      //   "topImgUrl": param.titleImg
      // }
      this.$ajax({
        url: '/api/config/setShareDefault',
        method: 'post',
        data: {"param": this.imageUrl}
      }).then(res=>{
        if(res.code == 200){
          this.$message.success('添加成功')
          this.imageUrl = ''
        }
      })
    },
    imgUploadSuccess(file) {
      const fd = new FormData()
      fd.append('file', file.file)
      this.imgLoading = true
      this.successRequest(fd, 'imageUrl')
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
    successRequest(fd, imgType) {
      this.$imgUpload('/image/upload', fd).then(res => {
        this.imgLoading = false
        this[imgType] = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-upload{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 98px;
      height: 196px;
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 98px;
    height: 98px;
    line-height: 98px;
    text-align: center;
  }
  .avatar {
    width: 98px;
    height: 100%;
    display: block;
  }
</style>
