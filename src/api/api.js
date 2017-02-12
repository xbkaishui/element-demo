import axios from 'axios'

let base = 'http://127.0.0.1:8010/api'

export const getModels = params => { return axios.get(`${base}/models`, { params: params }); };

export const removeModel= params => {
    let id = params['id'];
    return axios.delete(`${base}/models/${id}`, { params: params }); };

export const editModel= params => {
    console.log(params);
    let id = params['id'];
    return axios.put(`${base}/models/${id}`,  params); };

export const addModel= params => { return axios.post(`${base}/models`,  params ); };