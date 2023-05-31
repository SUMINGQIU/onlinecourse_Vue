import axios from 'axios'

const postUploadToken = fileName => axios.post('/api/v1/upload/token', {filename:fileName}).then(res => res.data);

export default postUploadToken