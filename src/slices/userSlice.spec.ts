import { store } from '../store/store'
import { login } from './userSlice'
import { User } from '../api/types'

const userResponse: User = {
    firstName: 'Arvel',
    lastName: 'Crynyd',
    code: 'ACR',
    avatar: 'http://localhost/five.png',
}

const userId = 'test123'

jest.mock('../lib/transport')
jest.mock('../api/api')

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
