import axios from 'axios'

const postVideo = form => axios.post('/api/v1/videos', form).then(res => res.data)

const getVideo = id => axios.get(`/api/v1/video/${id}`).then(res => res.data)

const getVideos = (start, limit) => axios.get('/api/v1/videos', { params: { start, limit } }).then(res => res.data)

export {
    getVideos,
    getVideo,
    postVideo,
}