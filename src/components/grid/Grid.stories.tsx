import { Meta, Story } from '@storybook/react'
import Workspace from './Grid'


export default {
    component: Workspace,
    title: 'Components/Grid',
} as Meta

const tile1 = { id: '1' }
const tile2 = { id: '2' }
export const Default: Story = () => <Workspace tiles={[tile1, tile2]} />
