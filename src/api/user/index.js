import axios from 'axios'

const logUser = form => axios.post('/api/v1/user/login', form).then(res => res.data)

const regUser = form => axios.post(`/api/v1/user/register`, form).then(res => res.data)

export {
    logUser,
    regUser,
}