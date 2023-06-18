<template>
    <div class="home">
      <div class="">
        <el-row :gutter="20">
          <el-col :span="4" v-for="video in videos" :key="video.id">
            <el-card class="video-card" @click="goVideo(video)">
              <!-- console.log("video url is:", video.avatar) -->
              <img class = "video-avatar" :src="video.Avatar">
              <div>
                <div class="video-title">{{video.title}}</div>
                <div class="video-bottom clearfix">
                  <span class="video-info">{{video.info.substring(0, 40)}}</span>
                </div>
              </div>
            </el-card>
          </el-col>
          
        </el-row>
       
      </div>
      <div>
        <div class="pagination-container">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-model:current-page.sync="currentPage"
            :page-sizes="[6,12]"
            :page-size="limit"
            :layout="pagerLayout"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import * as API from '@/api/video/'
// import { throwStatement } from '@babel/types';
  
  export default {
    name: 'HomeView',
    data() {
        return {
            videos: [],
            start:0,
            limit:6,
            total: 0,
            currentPage: 1,
            pagerLayout: 'total, sizes, prev, pager, next, jumper',
        };
    },
    methods: {
        handleSizeChange(val) {
          console.log(`${val} items per page`);
          this.limit = val;
          this.load();
        },
        handleCurrentChange(val) {
          console.log(`current page: ${val}`);
          this.start = this.limit * (val - 1);//
          this.load();//
        },
        load() {
            API.getVideos(this.start, this.limit).then((res) => {
                this.videos = res.data.Items;
                this.total = res.data.total;
            });
        },
        goVideo(video) {
          this.$router.push({ name: 'showVideo', params: {videoID: video.id}});
        },
        
    },
    components: {
    },
    beforeMount() {
        this.load(); 
    },
  }
  </script>
  
  <style>
    .video-avatar {
      width: 100%;
    }
    .video-info {
      color: #909399;
    }
    .video-bottom {
      margin-top: 10px;
    }
    .video-title {
      margin: 4px 0px 4px 0px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .video-card {
      cursor: pointer;
    }

    .pagination-container {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
  </style>