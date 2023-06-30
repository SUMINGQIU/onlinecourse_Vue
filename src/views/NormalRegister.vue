<template>
    <div class="registerNormalUser">
        <h2>欢迎注册 </h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.user_name" style="width: 300px;"></el-input>
            </el-form-item>

            <el-form-item label="用户密码">
                <el-input v-model="form.password" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="再次输入">
                <el-input v-model="form.password_confirm" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.nickname" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="OnSubmit">注册</el-button>
            </el-form-item>
            
        </el-form>
    </div>  
  </template>
  
  <script>
    // @ is an alias to /src
    // import * as API from '@/api/video/'
    import * as regAPI from '@/api/user/'
    // use the index.js as API to post videos
    export default {
        name: 'RegisterNormalUser',
        data() {
            return {
                form: {
                    nickname:'',
                    user_name: '',
                    password: '',
                    password_confirm: '',
                },
            };
        },
        methods: {
            OnSubmit() {
                regAPI.regUser(this.form).then((res) => {
                    console.log(res);
                    console.log(res.msg);
                    if(res.msg != null && res.status != 0) {
                        if(res.msg == '两次输入的密码不相同') {
                            this.$notify.error({
                                title: '登录失败',
                                message: res.msg,
                            });
                        } else if (res.msg == '用户名已经注册') {
                            this.$notify.error({
                                title: '用户名已经注册',
                                message: res.msg,
                            });
                        }  else if (res.msg == '昵称被占用') {
                            this.$notify.error({
                                title: '邮箱已注册',
                                // message: res.msg,
                            });
                        } else if (res.msg == '密码加密失败') {
                            this.$notify.error({
                                title: '密码加密失败',
                                message: res.msg,
                            });
                        } else {
                            this.$notify.error({
                                title: '注册失败,请检查密码，九位及以上字母与数字！',
                                message: res.msg,
                            });
                        }
                    } else {
                        this.$notify({
                            title: '注册成功',
                            type: 'success',
                        });
                    }
                })
                .catch((error) => {
                    this.$notify.error({
                        title: '404 Not found',
                        message: error,
                        
                    });
                });
            },
        },
        components: {
                
        },
    };
  </script>
  
  <style>
  .registerNormalUser {
    margin: 50px 0 0 300px;
  }
</style>