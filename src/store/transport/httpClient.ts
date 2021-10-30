import axios, { AxiosInstance } from 'axios'

export interface HttpClient {
    url?: string

    setWithCredentials(withCredientials: boolean): void

    get<T>(url: string, params?: HttpGetParams): Promise<T>

    delete<T>(url: string): Promise<T>

    head<T>(url: string): Promise<T>

    post<T>(url: string, data?: HttpPostBody): Promise<T>

    put<T>(url: string, data?: HttpPostBody): Promise<T>

    patch<T>(url: string, data?: HttpPostBody): Promise<T>
}

export type HttpGetParams = Record<string, any>

export type HttpPostBody = Record<string, any>

export class AxiosHttpClient implements HttpClient {
    private instance: AxiosInstance

    constructor(instance?: AxiosInstance) {
        if (instance === null || instance === undefined) {
            instance = axios.create({
                timeout: 3000,
            })
        }
        this.instance = instance
    }

    set url(baseUrl: string) {
        this.instance.defaults.baseURL = baseUrl
    }

    setWithCredentials(withCredientials: boolean): void {
        this.instance.defaults.withCredentials = withCredientials
    }

    async get<T>(url: string, params?: HttpGetParams): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.instance
                .get(url, { params })
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response: any) => {
                    reject(response)
                })
        })
    }

    async delete<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.instance
                .delete(url)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response: any) => {
                    reject(response)
                })
        })
    }

    async head<T>(url: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.instance
                .head(url)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response: any) => {
                    reject(response)
                })
        })
    }

    async post<T>(url: string, data?: HttpPostBody): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.instance
                .post(url, data)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response: any) => {
                    reject(response)
                })
        })
    }

    async put<T>(url: string, data?: HttpPostBody): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.instance
                .put(url, data)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response: any) => {
                    reject(response)
                })
        })
    }

    async patch<T>(url: string, data?: HttpPostBody): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.instance
                .patch(url, data)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response: any) => {
                    reject(response)
                })
        })
    }
}
