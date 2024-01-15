import axios from "axios"

const API = "http://localhost:3000/api"

export const login = user => axios.post(`${API}/login`, user)

export const registerUser = user => axios.post(`${API}/register`, user, {headers: {'content-type': 'multipart/form-data'}})