import axios from "./axios.js"
export const login = user => axios.post(`/login`, user)

export const registerUser = user => axios.post(`/register`, user, {headers: {'content-type': 'multipart/form-data'}})

export const verifyTokenRequest = () => axios.get('/verify')