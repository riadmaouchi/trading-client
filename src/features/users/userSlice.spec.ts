import { store } from '../../app/store'
import { login } from './userSlice'
import { User } from '../../services/types'

const userResponse: User = {
    firstName: 'Arvel',
    lastName: 'Crynyd',
    code: 'ACR',
    avatar: 'http://localhost/five.png',
}

const userId = 'test123'

jest.mock('../../services/client/transport')
jest.mock('../../services/apiClient')

describe('User state tests', () => {
    it('Should be able to fetch user data', async () => {
        // When
        const result = await store.dispatch(login(userId))
        const user = result.payload

        // Then
        expect(result.type).toBe('users/login/fulfilled')
        expect(user).toEqual(userResponse)

        const state = store.getState().user
        expect(state.user).toEqual(user)
        expect(state.loading).toEqual(false)
    })
})
