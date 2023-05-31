import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import VueVideoPlayer from '@videojs-player/vue';
import 'video.js/dist/video-js.css';

createApp(App).use(store).use(router).mount('#app')

const app = createApp(App).use(store).use(router)

app.use(ElementPlus)
app.use(VueVideoPlayer)
app.mount('#app')
