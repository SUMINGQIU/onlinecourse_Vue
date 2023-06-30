<template>
    <div class="home">
      <div class="">
        <el-row :gutter="20">
          <el-col :span="colSpan"  v-for="video in videos" :key="video.id" class="video-card-col">
            <el-card class="video-card" @click="goVideo(video)">
              <!-- console.log("video url is:", video.avatar) -->
              <img class = "video-avatar" :src="video.Avatar">
              <div>
                <div class="video-title">{{ truncateText(video.title, 50) }}</div>
                <div class="video-bottom clearfix">
                  <span class="video-info">{{truncateText(video.info, 40)}}</span>
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
            colSpan: 6,
            videos: [],
            start:0,
            limit:6,
            total: 0,
            currentPage: 1,
            pagerLayout: 'total, sizes, prev, pager, next, jumper',
        };
    },
    methods: {
        handleResize() {
          this.colSpan = this.getColSpan(); // 更新列数
        },
        handleSizeChange(val) {
          console.log(`${val} items per page`);
          this.limit = val;
          this.start = 0;
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
        getColSpan() {
          // 根据屏幕宽度决定每列的 span 值
          const screenWidth = window.innerWidth;
          // console.log("current width is", screenWidth)
          if (screenWidth >= 1200) {
            return 6; // 大屏幕上每行显示 4 列
          } else if(screenWidth >= 900) {
            return 8; // 小屏幕上每行显示 3 列
          } else if(screenWidth >= 300){
            return 12;
          } else {
            return 24;
          }
        },
        truncateText(text, maxLength) {
          if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
          } else {
            return text;
          }
        },
        
    },
    components: {
    },
    mounted() {
      this.load();
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
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
      margin: 40px 0px 40px 0px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .video-card {
      margin: 4px 0px 4px 0px;
      cursor: pointer;
    }
    .video-card-col {
      margin-bottom: 10px; /* 设置右侧的间距为 10px */
    }
    .pagination-container {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
  </style>