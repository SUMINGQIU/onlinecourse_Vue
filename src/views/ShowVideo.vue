<template>
    <div class="post-video">
      <div class="video-header">
        <h2>{{video.title}}</h2>
        <div class="video-data">
            {{video.view}}
        </div>
      </div>
      <videoPlay
        v-bind="playerOptions"
        :poster="playerOptions.postUrl"
      />
      <div class="video-info">
        <pre>{{video.info}}</pre>
      </div>
    </div>
</template>
  
<script>
    import { ref, onBeforeMount } from 'vue';
    import { useRoute } from 'vue-router';
    import "vue3-video-play/dist/style.css";
    import { videoPlay } from "vue3-video-play";
    import { reactive } from "vue";
    // import Vue3VideoPlayer from 'vue3-video-player';
    // import 'vue3-video-player/dist/vue3-video-player.css'
    import * as API from '@/api/video/';
    // import moment from 'moment';

    export default {
        components: {
            videoPlay
        },
        name: 'ShowVideo',
        setup() {

            const video = ref({});
            const route = useRoute();
            const videoUrl = ref('');
            const postUrl = ref(''); 
            const playerOptions = reactive({
                width: "800px", //播放器宽度
                height: "450px", //播放器高度
                color: "#409eff", //主题色
                // src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
                src: videoUrl,
                postUrl: postUrl,
                autoplay: false,
                muted: true,
                webFullScreen: false,
                speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
                loop: false, //循环播放
                mirror: false, //镜像画面
                ligthOff: false, //关灯模式 
                control: true, //是否显示控制
                controlBtns: [
                    "audioTrack",
                    "quality",
                    "speedRate",
                    "volume",
                    "setting",
                    "pip",
                    "pageFullScreen",
                    "fullScreen",
                ],
            });

            const load = async () => {
                const res = await API.getVideo(route.params.videoID);
                video.value = res.data;
                console.log("video data is: ",video.value);
                videoUrl.value = video.value.URL;
                console.log("Avatar data is: ",video.value.Avatar);
                if(video.value.Avatar.length != 0) {
                    console.log("ther is a pic data", video.value.Avatar)
                    postUrl.value = video.value.Avatar;
                } else {
                    console.log("ther is no pic data")
                    postUrl.value = "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg";
                }
                console.log("url is: ",videoUrl.value);
                console.log("Avatar is: ",postUrl.value);
            };

            // const formatDate = (date) => {
            //     return moment(date).format("YYYY-MM-DD h:mm:ss");
            // };

            // onMounted(load);
            onBeforeMount(load);
            return {
                video,
                videoUrl,
                postUrl,
                // formatDate,
                playerOptions
            };
        },
    };
</script>





<!-- <template>
        <div class="post-video">
        <div class="video-header">
            <h2>{{video.title}}</h2>
            <div class="video-data">
                {{ formatDate(video.created_at) }}
                {{video.view}}
            </div>
        </div>
        <vm-player v-if="videoUrl" playsinline controls>
            <vm-video>
                <vm-file :src="videoUrl"  />
            </vm-video>
        </vm-player>
        <div class="video-info">
            <pre>{{video.info}}</pre>
        </div>
        </div>
    </template>
    
    <script>
        import { ref, onMounted } from 'vue';
        import { useRoute } from 'vue-router';
        import { VmPlayer, VmVideo, VmFile} from '@vime/core';
        import * as API from '@/api/video/';
        import moment from 'moment';


        customElements.define('vm-player', VmPlayer);
        customElements.define('vm-video', VmVideo);
        customElements.define('vm-file', VmFile);

        export default {
            name: 'ShowVideo',
            setup() {
                const video = ref({});
                const route = useRoute();
                const videoUrl = ref('');

                const load = async () => {
                    const res = await API.getVideo(route.params.videoID);
                    video.value = res.data;
                    console.log("video data is: ",video.value);
                    // videoUrl.value = video.value.URL;
                    videoUrl.value ="https://vjs.zencdn.net/v/oceans.mp4";
                    console.log("url is: ",videoUrl.value);
                };

                const formatDate = (date) => {
                    return moment(date).format("YYYY-MM-DD h:mm:ss");
                };

                onMounted(load);

                return {
                    video,
                    videoUrl,
                    formatDate,
                };
            },
        };
    </script> -->
  
<!-- <template>
    <div class="post-video">
        <el-row :gutter="20">
            <el-col :span="16">
                <video-player
                    ref="videoPlayer"
                    controls
                    class="video-player-box video-js"    
                    :options="playerOptions"
                    :loop="true"
                    :volume="0.4"
                />
            </el-col>
        </el-row>
    </div>      
</template>

<script>
    import { defineComponent } from 'vue'
    import { VideoPlayer } from '@videojs-player/vue'
    // import 'video.js/dist/video-js.css'
    // import 'vue-video-player/src/custom-theme.css'
    // import { VideoJsPlayer } from 'video.js'
    // import { VideoPlayer } from "vue-video-player";
    import 'video.js/dist/video-js.css'
    import * as API from '@/api/video/'

    export default defineComponent({
        name: 'ShowVideo',
        components: {
            VideoPlayer
        },
        data() {
            return {
                video:{},
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    preload: 'auto',
                    fluid: true,
                    // autoplay: false,
                    sources: [
                        {
                        type: 'video/mp4',
                        src: "https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd",
                        }
                    ],
                    controlBar: {
                        timeDivider: true,           // 当前时间和持续时间的分隔符
                        durationDisplay: true,       // 显示持续时间
                        remainingTimeDisplay: false, // 是否显示剩余时间功能
                        fullscreenToggle: true       // 是否显示全屏按钮
                    },
                    poster: "https://th.bing.com/th/id/OIP.sOM4UHjx7bd74gvsy2gRvQHaHa?pid=ImgDet&rs=1",
                },
            };
        },
        mounted(){
            this.load();
        },
        methods: {
            load() {
                API.getVideo(this.$route.params.videoID).then((res) => {
                    this.video = res.data;
                    const tempURL = this.video.URL;
                    console.log("the url is: "+ tempURL);
                    this.playerOptions.sources[0].src = tempURL.trim();
                    console.log("if Videoplayer exists",this.$refs.videoPlayer)
                    
                    this.$nextTick(() => {
                        console.log("player name",this.$refs.videoPlayer.id);
                        if (this.$refs.videoPlayer.player) {
                            this.$refs.videoPlayer.player.src(this.playerOptions.sources[0]);
                        }
                    });


                    
                    // this.playerOptions.sources[0].src = "https://onlinecslearning-vue.oss-cn-hongkong.aliyuncs.com/testvodep_2.mp4"
                    // this.playerOptions.sources[0].src = "https://onlinecslearning-vue.oss-cn-hongkong.aliyuncs.com/CS107-lecture03_1.mp4"
                });
            }
        },
        
        // beforeMount() {
        //     this.load(); 
        // },
    })
</script> -->
<!-- 
<style>
    .video-player-box {
        max-width: 100%;
    }
    .vjs-poster {
        background-color: #aaaaaa00;
    }

    /*播放按钮设置成宽高一致，圆形，居中*/
    .vjs-custom-skin > .video-js .vjs-big-play-button {
    outline: none;
    border: none;
    width: 66px;
    height: 66px !important;
    background-color: rgba(0,0,0,0) !important;
    }

    .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
    content: '';
    width: 66px;
    height: 66px;
    /* background: url('../assets/icon_stop@2x.png') no-repeat; */
    background-size: 100% 100%;
    }


    /*control-bar布局时flex，通过order调整剩余时间的位置到进度条右边*/
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-remaining-time{
    order:3 !important;
    }

    /* 进度条下面的播放按钮 */
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-play-control {
    margin: 0;
    line-height: 20px;
    height: 94px;
    padding: 50px 0 24px 0;
    }
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-play-control .vjs-icon-placeholder:before {
    position: absolute;
    font-size: 20px;
    top: 44px;
    left: 24px;
    width: 20px;
    height: 20px;
    }

    /** 时间组件 */
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-time-control {
    margin: 0;
    line-height: 20px;
    height: 94px;
    padding: 50px 0 24px 0;
    min-width: auto;
    }
    /* 时间-左 */
    .video-js .vjs-current-time, .vjs-no-flex .vjs-current-time {
    min-width: 32px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 20px;
    margin: 0 0 0 24px !important;
    }
    /* 下面控件的时间分割线 */
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-time-divider {
    min-width: 6px;
    margin: 0 8px !important;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255,255,255,0.2);
    line-height: 20px;
    }
    /* 时间-右 */
    .video-js .vjs-duration, .vjs-no-flex .vjs-duration {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 20px;
    }
    .video-js .vjs-control-bar {
    height: 94px;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)
    }
    /*进度条单独放置一行*/
    .vjs-custom-skin > .video-js .vjs-progress-control.vjs-control{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 68px;
    width: 100%;
    height: 2px;
    padding: 0 24px;
    }
    /* 进度条背景轨道 */
    .video-js .vjs-slider{
    border-radius: 1em;
    background-color: rgba(255,255,255,0.2);
    }
    /* 加载进度条背景色 */
    .video-js .vjs-load-progress {
    background: rgba(255,255,255,0.1);
    }
    /* 进度条进度 */
    .vjs-custom-skin > .video-js .vjs-play-progress, .vjs-custom-skin > .video-js .vjs-volume-level{
    border-radius: 1px;
    background: #FFFFFF;
    }
    
    /*鼠标进入播放器后，播放按钮颜色会变*/
    .video-js:hover .vjs-big-play-button, .vjs-custom-skin>.video-js .vjs-big-play-button:active, .vjs-custom-skin>.video-js .vjs-big-play-button:focus{
    background-color: rgba(0,0,0,0) !important;
    }
    
    /*control bar*/
    .video-js .vjs-control-bar{
    background-color: rgba(0,0,0,0.2) !important;
    }
    
    /*点击按钮时不显示蓝色边框*/
    .video-js .vjs-control-bar button{
    outline: none;
    }
    .vjs-volume-panel .vjs-control .vjs-volume-panel-horizontal {
    width: 0;
    display: none;
    }
    /** 隐藏倍速 */
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-playback-rate {
    display: none;
    }
    /** 音量按钮 */
    .video-js .vjs-volume-panel {
    /* display: none; */
    position: absolute;
    right: 48px;
    bottom: 24px;
    width: 20px;
    height: 20px;
    }
    .vjs-icon-volume-high:before, .video-js .vjs-mute-control .vjs-icon-placeholder:before {
    font-size: 20px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    color: rgba(255,255,255,0.9);
    }
    .video-js .vjs-volume-bar {
    margin: 8px 16px 8px 0;
    }
    .video-js .vjs-volume-level {
    left: -21px;
    }
    /* 全屏组件 */
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-fullscreen-control {
    position: absolute;
    right: 24px;
    bottom: 24px;
    width: 20px;
    height: 20px;
    }
    .video-js .vjs-big-play-button .vjs-icon-placeholder:before, .vjs-button > .vjs-icon-placeholder:before {
    text-align: right;
    }
    /* 全屏按钮图标 */
    .vjs-icon-fullscreen-enter:before, .video-js .vjs-fullscreen-control .vjs-icon-placeholder:before {
    content: '';
    width: 20px;
    height: 20px;
    /* background: url('../assets/icon_full@2x.png') no-repeat; */
    background-size: 100% 100%;
    }
    /* 全屏播放后隐藏自定义全屏图标 */
</style> -->


<!-- 
    <style>
    .video /*可不设置*/
    {
        margin: 48px 0;
    }
    .vjs-poster {
        background-color: #aaaaaa00;
    }

    /*播放按钮设置成宽高一致，圆形，居中*/
    .vjs-custom-skin > .video-js .vjs-big-play-button {
    outline: none;
    border: none;
    width: 66px;
    height: 66px !important;
    background-color: rgba(0,0,0,0) !important;
    }

    .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
    content: '';
    width: 66px;
    height: 66px;
    /* background: url('../assets/icon_stop@2x.png') no-repeat; */
    background-size: 100% 100%;
    }


    /*control-bar布局时flex，通过order调整剩余时间的位置到进度条右边*/
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-remaining-time{
    order:3 !important;
    }

    /* 进度条下面的播放按钮 */
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-play-control {
    margin: 0;
    line-height: 20px;
    height: 94px;
    padding: 50px 0 24px 0;
    }
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-play-control .vjs-icon-placeholder:before {
    position: absolute;
    font-size: 20px;
    top: 44px;
    left: 24px;
    width: 20px;
    height: 20px;
    }

    /** 时间组件 */
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-time-control {
    margin: 0;
    line-height: 20px;
    height: 94px;
    padding: 50px 0 24px 0;
    min-width: auto;
    }
    /* 时间-左 */
    .video-js .vjs-current-time, .vjs-no-flex .vjs-current-time {
    min-width: 32px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 20px;
    margin: 0 0 0 24px !important;
    }
    /* 下面控件的时间分割线 */
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-time-divider {
    min-width: 6px;
    margin: 0 8px !important;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255,255,255,0.2);
    line-height: 20px;
    }
    /* 时间-右 */
    .video-js .vjs-duration, .vjs-no-flex .vjs-duration {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 20px;
    }
    .video-js .vjs-control-bar {
    height: 94px;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)
    }
    /*进度条单独放置一行*/
    .vjs-custom-skin > .video-js .vjs-progress-control.vjs-control{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 68px;
    width: 100%;
    height: 2px;
    padding: 0 24px;
    }
    /* 进度条背景轨道 */
    .video-js .vjs-slider{
    border-radius: 1em;
    background-color: rgba(255,255,255,0.2);
    }
    /* 加载进度条背景色 */
    .video-js .vjs-load-progress {
    background: rgba(255,255,255,0.1);
    }
    /* 进度条进度 */
    .vjs-custom-skin > .video-js .vjs-play-progress, .vjs-custom-skin > .video-js .vjs-volume-level{
    border-radius: 1px;
    background: #FFFFFF;
    }
    
    /*鼠标进入播放器后，播放按钮颜色会变*/
    .video-js:hover .vjs-big-play-button, .vjs-custom-skin>.video-js .vjs-big-play-button:active, .vjs-custom-skin>.video-js .vjs-big-play-button:focus{
    background-color: rgba(0,0,0,0) !important;
    }
    
    /*control bar*/
    .video-js .vjs-control-bar{
    background-color: rgba(0,0,0,0.2) !important;
    }
    
    /*点击按钮时不显示蓝色边框*/
    .video-js .vjs-control-bar button{
    outline: none;
    }
    .vjs-volume-panel .vjs-control .vjs-volume-panel-horizontal {
    width: 0;
    display: none;
    }
    /** 隐藏倍速 */
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-playback-rate {
    display: none;
    }
    /** 音量按钮 */
    .video-js .vjs-volume-panel {
    /* display: none; */
    position: absolute;
    right: 48px;
    bottom: 24px;
    width: 20px;
    height: 20px;
    }
    .vjs-icon-volume-high:before, .video-js .vjs-mute-control .vjs-icon-placeholder:before {
    font-size: 20px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    color: rgba(255,255,255,0.9);
    }
    .video-js .vjs-volume-bar {
    margin: 8px 16px 8px 0;
    }
    .video-js .vjs-volume-level {
    left: -21px;
    }
    /* 全屏组件 */
    .vjs-custom-skin > .video-js .vjs-control-bar .vjs-fullscreen-control {
    position: absolute;
    right: 24px;
    bottom: 24px;
    width: 20px;
    height: 20px;
    }
    .video-js .vjs-big-play-button .vjs-icon-placeholder:before, .vjs-button > .vjs-icon-placeholder:before {
    text-align: right;
    }
    /* 全屏按钮图标 */
    .vjs-icon-fullscreen-enter:before, .video-js .vjs-fullscreen-control .vjs-icon-placeholder:before {
    content: '';
    width: 20px;
    height: 20px;
    /* background: url('../assets/icon_full@2x.png') no-repeat; */
    background-size: 100% 100%;
    }
    /* 全屏播放后隐藏自定义全屏图标 */
    .vjs-icon-fullscreen-exit:before, .video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder:before {
    background: url('');
    line-height: 20px;
    margin-right: 10px;
    }
    </style> -->














  <!-- <script>
    import { defineComponent } from 'vue'
    import { VideoPlayer } from '@videojs-player/vue'
    // import { videoPlayer } from 'vue-video-player'
    // import 'video.js/dist/video-js.css'
    // import 'vue-video-player/src/custom-theme.css'
    // import { VideoJsPlayer } from 'video.js'
    // import { VideoPlayer } from "vue-video-player";
    import 'video.js/dist/video-js.css'
    import * as API from '@/api/video/'

    export default defineComponent({
        name: 'ShowVideo',
        data() {
            return {
                video:{},
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    preload: 'auto',
                    fluid: true,
                    // autoplay: false,
                    sources: [
                        {
                        type: 'video/mp4',
                        src: "https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd",
                        }
                    ],
                    controlBar: {
                    timeDivider: true,           // 当前时间和持续时间的分隔符
                    durationDisplay: true,       // 显示持续时间
                    remainingTimeDisplay: false, // 是否显示剩余时间功能
                    fullscreenToggle: true       // 是否显示全屏按钮
                },
                    poster: "https://th.bing.com/th/id/OIP.sOM4UHjx7bd74gvsy2gRvQHaHa?pid=ImgDet&rs=1",
                },
            };
        },
        mounted(){
            this.load();
        },
        methods: {
            load() {
                API.getVideo(this.$route.params.videoID).then((res) => {
                    this.video = res.data;
                    const tempURL = this.video.URL;
                    console.log("the url is: "+ tempURL);
                    this.playerOptions.sources[0].src = tempURL.trim();
                    console.log("if Videoplayer exists",this.$refs.videoPlayer)
                    
                    this.$nextTick(() => {
                        console.log("player name",this.$refs.videoPlayer.player);
                        if (this.$refs.videoPlayer.player) {
                            this.$refs.videoPlayer.player.src(this.playerOptions.sources[0]);
                        }
                    });
                    // this.playerOptions.sources[0].src = "https://onlinecslearning-vue.oss-cn-hongkong.aliyuncs.com/testvodep_2.mp4"
                    // this.playerOptions.sources[0].src = "https://onlinecslearning-vue.oss-cn-hongkong.aliyuncs.com/CS107-lecture03_1.mp4"
                });
            }
        },
        components: {
            VideoPlayer
        },
        beforeMount() {
            this.load(); 
        },
    })
  </script>

<style>
.video-player-box {
    max-width: 100%;
}
</style> -->