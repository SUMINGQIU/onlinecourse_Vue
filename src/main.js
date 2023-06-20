import { createApp, h } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
// import VueVideoPlayer from '@videojs-player/vue';
import vue3VideoPlay from 'vue3-video-play';
// import VideoPlayer from 'vue-video-player'
// import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css';
// import 'vue3-video-player/dist/vue3-video-player.css';

// createApp(App).use(store).use(router).mount('#app')
// const app = createApp(App).use(store).use(router)
// const app = createApp(App, {
//     compilerOptions: {
//       isCustomElement: tag => tag.startsWith('vm-')|| tag.startsWith('vm')
//     }
//   });
const app = createApp({
    render: () => h(App),
    // compilerOptions: {
    //           isCustomElement: tag => tag.startsWith('vm-')|| tag.startsWith('vm')
    // }
  });
app.use(store)
app.use(router)
app.use(ElementPlus)
// app.use(VueVideoPlayer)
app.use(vue3VideoPlay)

app.mount('#app')
// app.use(VideoPlayer)
// Vue.use(VideoPlayer)
// Vue.use(require('vue-moment'));