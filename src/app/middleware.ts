import { disconnect } from '@/features/connection-status/connectionSlice'
import { AnyAction, Dispatch, MiddlewareAPI } from 'redux'
import { timer } from 'rxjs'

export const APPLICATION_DISCONNECT_MINS = 60
const APPLICATION_DISCONNECT = APPLICATION_DISCONNECT_MINS * 60 * 1000

export const disconnectAfterAWhile =
    ({ dispatch }: MiddlewareAPI) =>
    (next: Dispatch) => {
        timer(APPLICATION_DISCONNECT).subscribe(() => {
            dispatch(disconnect())
            console.warn(
                `Application disconnected at ${APPLICATION_DISCONNECT}`
            )
        })

        return (action: AnyAction) => next(action)
    }
