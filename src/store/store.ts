import { createApplicationServices } from './application'
import { configureStore } from './configuration'
import { Session, SessionActions, SseTransport, Transport } from '@/api'
import { AxiosHttpClient } from '@/api/transport/httpClient'
import { HttpClient } from '../api/transport/httpClient'

export const createStore = async () => {
    let transport: Transport
    const host = 'localhost'
    const httpClient: HttpClient = new AxiosHttpClient()
    transport = new SseTransport(httpClient, host)

    console.log('process.env', process.env)
    console.log('import.meta.env', import.meta.env)
    console.log('build number', process.env.VITE_BUILD_NUMBER)

    if (import.meta.env.VITE_MOCK_MODE === 'transport') {
        await import('../mocks/mockSseTransport')
            .then((module) => (transport = new module.MockSseTransport(host)))
            .catch((err) => console.error(err))
    } else if (import.meta.env.VITE_MOCK_MODE === 'api') {
        await import('../api/transport/defaultTransport')
            .then(
                (module) =>
                    (transport = new module.DefaultTransport(httpClient, host))
            )
            .catch((err) => console.error(err))
    }

    await transport.connect()

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
