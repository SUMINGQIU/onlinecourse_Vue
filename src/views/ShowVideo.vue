
  <template>
    <div class="post-video">
        <el-row :gutter="20">
            <el-col :span="16">
                <video-player
                    controls
                    class="video-player-box"
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
                    fluid: true,
                    // autoplay: false,
                    sources: [
                        {
                        type: 'video/mp4',
                        src: "https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd",
                        }
                    ],
                    poster: "https://th.bing.com/th/id/OIP.sOM4UHjx7bd74gvsy2gRvQHaHa?pid=ImgDet&rs=1",
                },
            };
        },
        methods: {
            load() {
                API.getVideo(this.$route.params.videoID).then((res) => {
                    this.video = res.data;
                    const tempURL = this.video.URL;
                    console.log("the url is: "+ tempURL)
                    this.playerOptions.sources[0].src = tempURL.trim();
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
</style>