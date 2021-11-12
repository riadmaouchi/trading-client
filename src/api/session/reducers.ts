import { Account } from './session'
import {
    SESSION_ACTION_TYPES,
    SessionAction,
    DisconnectAction,
} from './actions'
import { CurrencyPair } from './asset'
import { ConnectionInfo, ConnectionStatus } from './connection'
import { ServiceStates, ServiceGroup } from './service'

export interface SessionState {
    account?: Account
    assets?: AssetState
    connection: ConnectionInfo
    services: ServiceStatusState
}

export interface AssetState {
    [id: string]: CurrencyPair
}

const connection: ConnectionInfo = {
    status: ConnectionStatus.disconnected,
    url: '',
}

export interface ServiceStatusState {
    [key: string]: ServiceGroup
}

export const services: ServiceStatusState = ['reference', 'pricing'].reduce(
    (acc: ServiceStatusState, type: string) => {
        acc[type] = {
            type,
            state: ServiceStates.Connecting,
            count: 0,
        }
        return acc
    },
    {}
)

const INITIAL_STATE: SessionState = { connection, services }

export const session = (
    state: SessionState = INITIAL_STATE,
    action: SessionAction | DisconnectAction
): SessionState => {
    switch (action.type) {
        case SESSION_ACTION_TYPES.SESSION_ACCOUNT_SELECTED:
            return { ...state, account: action.payload }
        case SESSION_ACTION_TYPES.SESSION_ASSETS_SELECTED:
            return { ...state, assets: { ...action.payload } }
        case SESSION_ACTION_TYPES.SESSION_DISCONNECTED:
            return {
                ...INITIAL_STATE,
                connection: {
                    status: ConnectionStatus.sessionExpired,
                    url: '',
                },
            }
        case SESSION_ACTION_TYPES.SESSION_CONNECTION_UPDATED:
            return { ...state, connection: { ...action.payload } }
        case SESSION_ACTION_TYPES.SESSION_SERVICES_STATES:
            return { ...state, services: { ...action.payload } }
        default:
            return state
    }
}
