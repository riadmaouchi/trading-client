import { AxiosHttpClient } from './httpClient'
import { SseTransport } from './transport'

export type { ConnectionInfo, Transport } from './transport'
export { ConnectionState, SseTransport } from './transport'
export const client = new SseTransport(new AxiosHttpClient(), 'localhost')
