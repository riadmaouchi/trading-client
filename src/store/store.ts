import { createApplicationServices } from './application'
import { configureStore } from './configuration'
import { Session, SessionActions, SseTransport, Transport } from '@/api'
import { AxiosHttpClient } from '@/api/transport/httpClient'

export const createStore = async () => {
    let transport: Transport
    if (!import.meta.env.VITE_MOCK_MODE) {
        transport = new SseTransport(new AxiosHttpClient(), 'localhost')
        await transport.connect()
    }

    const account = Session.logIn()

    const store = configureStore(
        createApplicationServices({
            transport,
            account,
        })
    )

    store.dispatch(SessionActions.connect())
    store.dispatch(SessionActions.accountSelected(account))

    return store
}
