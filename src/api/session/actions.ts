import { Action } from 'redux'
import { Account } from './session'
import { action, ActionUnion } from '@/store'
import { CurrencyPairs } from './asset'
import { ofType } from 'redux-observable'
import { ConnectionInfo } from './connection'
import { ServiceGroups } from './service'

export enum SESSION_ACTION_TYPES {
    SESSION_ACCOUNT_SELECTED = '@RTTrading/SESSION_ACCOUNT_SELECTED',
    SESSION_ASSETS_SELECTED = '@RTTrading/SESSION_ASSETS_SELECTED',
    SESSION_CONNECTED = '@RTTrading/SESSION_CONNECTED',
    SESSION_DISCONNECTED = '@RTTrading/SESSION_DISCONNECTED',
    SESSION_CONNECTION_UPDATED = '@TradingCloud/SESSION_CONNECTION_UPDATED',
    SESSION_SERVICES_STATES = '@TradingCloud/SESSION_SERVICES_STATES',
}

export const SessionActions = {
    accountSelected: action<
        SESSION_ACTION_TYPES.SESSION_ACCOUNT_SELECTED,
        Account
    >(SESSION_ACTION_TYPES.SESSION_ACCOUNT_SELECTED),
    assetsSelected: action<
        SESSION_ACTION_TYPES.SESSION_ASSETS_SELECTED,
        CurrencyPairs
    >(SESSION_ACTION_TYPES.SESSION_ASSETS_SELECTED),
    connect: action<SESSION_ACTION_TYPES.SESSION_CONNECTED>(
        SESSION_ACTION_TYPES.SESSION_CONNECTED
    ),
    disconnect: action<SESSION_ACTION_TYPES.SESSION_DISCONNECTED>(
        SESSION_ACTION_TYPES.SESSION_DISCONNECTED
    ),
    connectionStatusUpdated: action<
        SESSION_ACTION_TYPES.SESSION_CONNECTION_UPDATED,
        ConnectionInfo
    >(SESSION_ACTION_TYPES.SESSION_CONNECTION_UPDATED),
    createServiceStatusAction: action<
        SESSION_ACTION_TYPES.SESSION_SERVICES_STATES,
        ServiceGroups
    >(SESSION_ACTION_TYPES.SESSION_SERVICES_STATES),
}

export type SessionAction = ActionUnion<typeof SessionActions>
export type ConnectAction = ReturnType<typeof SessionActions.connect>
export type DisconnectAction = ReturnType<typeof SessionActions.disconnect>

export const applicationConnected = ofType<Action, ConnectAction>(
    SESSION_ACTION_TYPES.SESSION_CONNECTED
)
export const applicationDisconnected = ofType<Action, DisconnectAction>(
    SESSION_ACTION_TYPES.SESSION_DISCONNECTED
)
