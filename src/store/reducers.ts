import { combineReducers } from 'redux'
import { sessionReducer } from '@/api'

const rootReducer = combineReducers({
    session: sessionReducer,
})

export default rootReducer
