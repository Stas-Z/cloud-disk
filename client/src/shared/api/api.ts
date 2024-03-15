import axios from 'axios'

import { USER_TOKEN_KEY } from '../const/localstorage'

export const $api = axios.create({
    baseURL: __API__,
})

// set authorization header on each request
$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(USER_TOKEN_KEY)}`
    }
    return config
})
