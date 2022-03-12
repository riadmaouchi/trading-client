import { Service } from '@/services'

export const fakeSystemStatusData: Service[] = [
    {
        type: 'reference',
        id: '1',
        timestamp: 1,
        isConnected: true,
    },
    {
        type: 'pricing',
        id: '1',
        timestamp: 1,
        isConnected: true,
    },
    {
        type: 'pricing',
        id: '2',
        timestamp: 1,
        isConnected: false,
    },
]
