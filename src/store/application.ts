import { Account } from '@/api'
import { ReplaySubject } from 'rxjs'
import { multicast, refCount } from 'rxjs/operators'
import { Session, ConnectionInfo, Transport } from '@/api'
import { Services } from '@/api/session/service'

const HEARTBEAT_TIMEOUT = 3000

export interface ApplicationProps {
    transport: Transport
    account: Account
}

export const createApplicationServices = ({ transport }: ApplicationProps) => {
    const connection = Session.connect(transport).pipe(
        multicast(() => new ReplaySubject<ConnectionInfo>(1)),
        refCount()
    )

    const services = Session.serviceStatus(transport, HEARTBEAT_TIMEOUT).pipe(
        multicast(() => new ReplaySubject<Services>(1)),
        refCount()
    )

    const assets = Session.initAssets(transport)
    return {
        connection,
        services,
        assets,
        transport,
    }
}
