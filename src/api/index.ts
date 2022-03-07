import { AxiosHttpClient } from '@/api/httpClient'
import { SseTransport } from './transport'

export * from './api'
export type { Level, Price } from './types'
export * from './types'
export type { ConnectionInfo, Transport } from './transport'
export { ConnectionState, SseTransport } from './transport'
export const client = new SseTransport(new AxiosHttpClient(), 'localhost')
