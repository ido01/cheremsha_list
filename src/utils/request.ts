import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { stringify } from 'qs'

function parseJSON(response: AxiosResponse) {
    if (response.status === 204 || response.status === 205) {
        return null
    }

    return response.data
}

async function checkStatus(response: AxiosResponse) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }

    throw response
}

export async function request(url: string, config?: AxiosRequestConfig) {
    const host = process.env.REACT_APP_API_HOST
    return axios(`${host}${url}`, {
        ...config,
        headers: {
            ...config?.headers,
            Authorization: `Bearer ${localStorage.getItem('corp_token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...config?.headers,
        },
        paramsSerializer: (params) => {
            return stringify(params, { arrayFormat: 'brackets' })
        },
    })
        .then(async (data) => {
            const response: any = await checkStatus(data)

            return parseJSON(response)
        })
        .catch(async (data) => {
            const response: any = await checkStatus(data.response)

            return parseJSON(response)
        })
}
