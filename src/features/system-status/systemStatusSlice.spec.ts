import { store } from '../../app/store'
import { updateServiceStatus } from './systemStatusSlice'

jest.mock('../../services/client/transport')

test('Updates system status', () => {
    let state = store.getState().systemStatus
    expect(state).toStrictEqual({
        reference: { type: 'reference', state: 'CONNECTING', count: 0 },
        pricing: { type: 'pricing', state: 'CONNECTING', count: 0 },
    })

    store.dispatch(
        updateServiceStatus({
            reference: { type: 'reference', state: 'CONNECTED', count: 1 },
            pricing: { type: 'pricing', state: 'CONNECTED', count: 2 },
        })
    )
    state = store.getState().systemStatus
    expect(state).toStrictEqual({
        reference: { type: 'reference', state: 'CONNECTED', count: 1 },
        pricing: { type: 'pricing', state: 'CONNECTED', count: 2 },
    })
})
