import { AxiosHttpClient, HttpClient } from './httpClient'
import axios, { AxiosResponse } from 'axios'

jest.mock('axios')

function mockAxiosResponse(data: Record<string, any>, status = 200) {
    const response = { data, status } as AxiosResponse
    axios.get = jest.fn().mockResolvedValue(response)
    axios.post = jest.fn().mockResolvedValue(response)
}

describe('Testing Axios HttpClient', () => {
    let client: HttpClient
    let httpResponse: AxiosResponse

    describe('when calling #HttpClient', () => {
        beforeEach(() => {
            client = new AxiosHttpClient(axios)
            httpResponse = {
                data: 'data',
            } as AxiosResponse
            mockAxiosResponse(httpResponse)
        })
        it('get method is call with parameters', async () => {
            await client.get('/test', { key: 'value' })

            expect(axios.get).toHaveBeenCalledWith('/test', {
                params: { key: 'value' },
            })
        })

        it('post method with body parameters', async () => {
            await client.post('/test', { key: 'value' })
            expect(axios.post).toHaveBeenCalledWith('/test', { key: 'value' })
        })

        it('returns payload for succesfull get request', async () => {
            mockAxiosResponse(httpResponse, 201)
            const res = await client.get('/test', { key: 'value' })
            expect(res).toEqual(httpResponse)
        })

        it('returns payload for succesfull post request', async () => {
            mockAxiosResponse(httpResponse, 201)
            const res = await client.post('/test')
            expect(res).toEqual(httpResponse)
        })
    })
})
