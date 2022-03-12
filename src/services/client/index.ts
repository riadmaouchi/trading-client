import { AxiosHttpClient } from './httpClient'
import { SseConnection } from './connection'

export type { ConnectionInfo, Connection } from './connection'
export { ConnectionState, SseConnection } from './connection'
export const client = new SseConnection(new AxiosHttpClient(), 'localhost')
