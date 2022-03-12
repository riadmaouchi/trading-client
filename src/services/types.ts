export interface Connection {
    status: ConnectionStatus
    url: string
}

export enum ConnectionStatus {
    Connected = 'connected',
    Disconnected = 'disconnected',
    SessionExpired = 'sessionExpired',
}

export enum PriceMovements {
    Up = 'Up',
    Down = 'Down',
    None = 'None',
}

export interface Level {
    quantity: number
    price: number
    mouvement?: PriceMovements
}

export interface Price {
    id: number
    time: number
    symbol: string
    mid: number
    high: number
    low: number
    bids: Level[]
    asks: Level[]
    stale?: boolean
}

export interface CurrencyPairNotional {
    currencyPair: string
    notional: number
}

export class ServiceTypes {
    private readonly services: Map<string, Service> = new Map()

    constructor(public readonly type: string) {}

    update(update: Service): ServiceTypes {
        this.services.set(update.id, update)
        return this
    }

    count(): number {
        return Array.from(this.services.values()).filter((s) => s.isConnected)
            .length
    }
}

export class Services {
    private readonly serviceTypes = new Map<string, ServiceTypes>()

    add(service: string, serviceTypes: ServiceTypes): Services {
        this.serviceTypes.set(service, serviceTypes)
        return this
    }

    count(type: string): number | undefined {
        const service = this.serviceTypes.get(type)
        return (service && service.count()) || undefined
    }

    status(): ServiceGroups {
        return Array.from(this.serviceTypes.values()).reduce<ServiceGroups>(
            (acc, next) => {
                acc[next.type] = {
                    type: next.type,
                    count: next.count(),
                    state: next.count()
                        ? ServiceStates.Connected
                        : ServiceStates.Disconnected,
                }
                return acc
            },
            {}
        )
    }
}

export interface ServiceGroups {
    [key: string]: ServiceGroup
}

export interface ServiceGroup {
    type: string
    count: number
    state: ServiceStates
}

export enum ServiceStates {
    Connecting = 'CONNECTING',
    Connected = 'CONNECTED',
    Disconnected = 'DISCONNECTED',
}

export interface Service {
    type: string
    id: string
    timestamp: number
    isConnected: boolean
}

export interface User {
    readonly firstName: string
    readonly lastName: string
    readonly code: string
    readonly avatar: string
}

export interface CurrencyPair {
    symbol: string
    ratePrecision: number
    pipsPosition: number
    base: string
    terms: string
}

export interface CurrencyPairs {
    [id: string]: CurrencyPair
}
