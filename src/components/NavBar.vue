<template>
    <el-menu class="top-bar" mode="horizontal" router>
        <el-menu-item index="/">首页 Homepage</el-menu-item>
        <!-- <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
        </el-sub-menu> -->
        <el-menu-item index="/about">关于 About</el-menu-item>
        <!-- <el-menu-item index="/postvideo">投稿视频 PostVideo</el-menu-item> -->
        <!-- <el-menu-item index="/register">管理员登录 Login</el-menu-item> -->
        <el-menu-item index="/normalreg">注册 Register</el-menu-item>
        <!-- <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item> -->
    </el-menu>
</template>
  
  <script>
  export default {
    name: 'NavBar',
    props: {
      msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .top-bar {
    margin-bottom: 50px;
  }
  </style>
  