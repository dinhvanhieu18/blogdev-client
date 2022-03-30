import axios from 'axios'
axios.defaults.withCredentials = true

const SERVER_URL = process.env.REACT_APP_SERVER_URL

export const postAPI = async (url: string, data: object, token?: string) => {
    return await axios.post(`${SERVER_URL}/api/${url}`, data, {
        headers: {Authorization: token}
    });
}

export const getAPI = async (url: string, token?: string) => {
    return await axios.get(`${SERVER_URL}/api/${url}`, {
        headers: {Authorization: token}
    });
}

export const putAPI = async (url: string, data: object, token?: string) => {
    return await axios.put(`${SERVER_URL}/api/${url}`, data, {
        headers: {Authorization: token}
    });
}

export const patchAPI = async (url: string, data: object, token?: string) => {
    return await axios.put(`${SERVER_URL}/api/${url}`, data, {
        headers: {Authorization: token}
    });
}

export const deleteAPI = async (url: string, token?: string) => {
    return await axios.delete(`${SERVER_URL}/api/${url}`, {
        headers: {Authorization: token}
    });
}
