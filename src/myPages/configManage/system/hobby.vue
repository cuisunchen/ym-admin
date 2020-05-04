<template>
  <div class="app-container hobbyConfig-container">
    <p class="title">兴趣列表</p>
    <div class="lists">
      <div v-for="item in tags" :key="item.name" class="item flex flex-column">

        <div class="imgBox">
          <img :src="item.imgUrl" alt="">
        </div>
        <span class="close el-icon-close" @click="deleteTag(item)" />
        <p class="hobbyName">{{ item.name }}</p>
      </div>
    </div>

    <el-form ref="ruleForm" style="width:500px" :model="form" :rules="rules" class="recommendWrap" label-width="90px" label-position="left">
      <el-form-item ref="brand" label="上传图片" prop="imgUrl">
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="imgUploadSuccess"
          :show-file-list="false"
          :before-upload="beforeImgUpload"
        >
          <el-button v-if="imgLoading" circle :loading="imgLoading" />
          <div v-else>
            <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="添加标签名" prop="tabName">
        <el-input v-model.trim="form.tabName" placeholder="请输入标签名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="submitLoading" @click="addTag">添加</el-button>
        <!-- <el-button type="primary" @click="deleteTag">删除</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import request from '@/utils/request'
export default {
  data() {
    const checkImgUrl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('图片不能为空'))
      } else {
        callback()
      }
    }
    const checkTabName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('标签名不能为空'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        imgUrl: [
          { validator: checkImgUrl, trigger: 'change' }
        ],
        tabName: [
          { validator: checkTabName, trigger: 'blur' }
        ]
      },
      tags: [
        {
          id: '121313',
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3043394513,1123403899&fm=26&gp=0.jpg',
          name: '服装'
        },
        {
          id: '121313',
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3043394513,1123403899&fm=26&gp=0.jpg',
          name: '游戏'
        }
      ],
      form: {
        imgUrl: '',
        tabName: ''
      },
      tagName: '',
      imgLoading: false,
      submitLoading: false
    }
  },
  created() {
    this.getHobbys()
  },
  methods: {
    imgUploadSuccess(file) {
      this.$refs.brand.clearValidate()
      const fd = new FormData()
      fd.append('file', file.file)
      this.imgLoading = true
      this.successRequest(fd, 'imgUrl')
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
        if (res.code == 200) {
          this.imgLoading = false
          this.form.imgUrl = res.data
        }
      })
    },
    addTag() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log('submit!!')
          this.submitLoading = true
          request({
            url: '/api/addInterest',
            method: 'post',
            data: this.form
          }).then(res => {
            if (res.code == 200) {
              this.getHobbys()
            }
          })

          console.log(this.tags)
          this.form = {
            brand: '',
            name: ''
          }
          this.submitLoading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    getHobbys() {
      request({
        url: '/api/getAllInterest',
        method: 'get'
      }).then(res => {
        if (res.code == 200) {
          this.tags = res.data
        }
      })
    },
    deleteTag(item) {
      alert('删除兴趣')
    }
  }
}
</script>

<style lang="scss" scoped>
.lists{
   margin-top: 10px;
   .item{
      display: inline-block;
      width: 80px;
      margin-right: 16px;
      position: relative;
      .imgBox{
         width: 80px;
         height: 80px;
         img{
            width: 100%;
            height: 100%;
            border-radius: 4px;
         }
      }

      .close{
         position: absolute;
         top: 4px;
         right: 4px;
         color: #fff;
      }
      .hobbyName{
         font-size: 14px;
         line-height: 30px;
         text-align: center;
      }
   }
}
.el-tag + .el-tag {
   margin-left: 10px;
}
.el-form{
   margin-top: 30px;
}
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
    height: 98px;
    display: block;
  }
</style>
