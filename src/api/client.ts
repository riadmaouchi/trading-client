import { SseTransport } from '@/lib'
import { AxiosHttpClient } from '@/lib/httpClient'

export const client = new SseTransport(new AxiosHttpClient(), 'localhost')
