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
