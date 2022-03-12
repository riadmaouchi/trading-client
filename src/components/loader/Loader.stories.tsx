import Loader from './Loader'

import { Meta, Story } from '@storybook/react'
import { ServiceStates } from '@/services/types'

export default {
    component: Loader,
    title: 'Components/Loader',
} as Meta

export const Connected: Story = () => (
    <Loader
        status={ServiceStates.Connected}
        render={() => <div>Connected</div>}
    />
)

export const Connecting: Story = () => (
    <Loader
        status={ServiceStates.Connecting}
        render={() => <div>Connecting</div>}
    />
)

export const Disconnected: Story = () => (
    <Loader
        status={ServiceStates.Disconnected}
        render={() => <div>Disconnected</div>}
    />
)
