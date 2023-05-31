<template>
    <div class="post-video">
        <h2>欢迎投稿： </h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="form.title" style="width: 600px;"></el-input>
            </el-form-item>

            <el-form-item label="视频地址">
                <el-input type="url " v-model="form.url" style="width: 600px;"></el-input>
            </el-form-item>

            <el-form-item label="描述">
                <el-input type="textarea" v-model="form.info" style="width: 600px;"></el-input>
            </el-form-item>

            <el-form-item label="视频封面">
                <el-upload
                    class="avatar-uploader"
                    label="描述"
                    action=""
                    ref="upload"
                    :on-preview="handlePictureCardPreview"
                    :on-success="handleAvatarSuccess"
                    :before-upload="fnBeforeUpload"
                    :http-request="fnUploadRequest"
                    :show-file-list="false"
                >

                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <template v-slot:tip>
                        <div class="el-upload__tip">只能上传png和jpg文件，大小不超过2MB</div>
                    </template>
                </el-upload>
            </el-form-item>

            <el-dialog :visible="dialogVisible" @update:visible="dialogVisible = $event">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

            <el-form-item>
                <el-button type="primary" @click="OnSubmit">立即创建</el-button>
            </el-form-item>
            
        </el-form>
    </div>  
  </template>
  
  <script>
    // @ is an alias to /src
    import * as API from '@/api/video/'
    import uploadAPI from '@/api/upload/'
    // use the index.js as API to post videos
    export default {
        name: 'PostVideo ',
        data() {
            return {
                imageUrl: '',
                dialogImageUrl: '',
                dialogVisible: false,
                form: {
                    title: '',
                    info: '',
                    url:'',
                    avatar:'',
                },
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            fnBeforeUpload(file) {
                const isImage =  (file.type === 'image/png' || file.type === 'image/jpeg');
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isImage) {
                    this.$message.error("只能接受PNG格式！");
                }
                if (!isLt2M) {
                    this.$message.error("上传图片不能超过 2MB！");
                    
                }
                return isImage && isLt2M;
            },
            fnUploadRequest(option) {
                uploadAPI(option.file.name).then((res) => {
                    const oReq = new XMLHttpRequest();
                    oReq.open('PUT', res.data.put, true);
                    oReq.withCredentials = true;
                    oReq.send(option.file);
                    oReq.onload = () => {
                        this.imageUrl = res.data.get;
                        this.form.avatar = res.data.key;
                    };
                    
                }).catch((error) => {
                    this.$notify.error({
                        title: "网络错误，或者服务器宕机",
                        message: error,
                    });
                });
            },
            OnSubmit() {
                API.postVideo(this.form).then((res) => {
                    if(res.code > 0) {
                        this.$notify.error({
                            title: '投稿失败',
                            message: res.msg,
                        });
                    } else {
                        this.$notify({
                            title: '投稿成功',
                            message: `您的投稿ID为${res.data.id}`,
                            type: 'success',
                        });
                    }
                    
                }).catch((error) => {
                    this.$notify.error({
                        title: '404 Not found',
                        message: error,
                        
                    });
                });
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },  
        },
        components: {
                
        },
    };
  </script>
  
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .post-video {
    margin: 50px 0 0 300px;
  }
</style>