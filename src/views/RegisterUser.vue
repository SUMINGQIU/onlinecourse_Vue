<template>
    <div class="registerUser">
        <h2>欢迎登录 </h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.user_name" style="width: 300px;"></el-input>
            </el-form-item>

            <el-form-item label="用户密码">
                <el-input v-model="form.password" style="width: 300px;"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="OnSubmit">登录</el-button>
            </el-form-item>
            
        </el-form>
    </div>  
  </template>
  
  <script>
    // @ is an alias to /src
    // import * as API from '@/api/video/'
    import * as logAPI from '@/api/user/'
    // use the index.js as API to post videos
    export default {
        name: 'RegisterUser',
        data() {
            return {
                form: {
                    user_name: '',
                    password: '',
                },
            };
        },
        methods: {
            OnSubmit() {
                logAPI.logUser(this.form).then((res) => {
                    if(res.status != 0) {
                        this.$notify.error({
                            title: '登录失败',
                            message: res.msg,
                        });
                    } else {
                        this.$notify({
                            title: '登录成功',
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
  .registerUser {
    margin: 50px 0 0 300px;
  }
</style>