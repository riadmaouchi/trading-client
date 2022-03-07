import { store } from '../store'
import { ConnectionStatus } from '../../api/types'
import { connect, updateStatus } from './reducers'

jest.mock('../../api/transport')

test('Updates connection status', () => {
    let state = store.getState().connectionStatus
    expect(state.status).toBe(ConnectionStatus.Disconnected)
    expect(state.url).toBe('')

    store.dispatch(connect())
    state = store.getState().connectionStatus
    expect(state.status).toBe(ConnectionStatus.Disconnected)
    expect(state.url).toBe('')

    store.dispatch(
        updateStatus({
            status: ConnectionStatus.Connected,
            url: 'url',
        })
    )
    state = store.getState().connectionStatus
    expect(state.status).toBe(ConnectionStatus.Connected)
    expect(state.url).toBe('url')
})
