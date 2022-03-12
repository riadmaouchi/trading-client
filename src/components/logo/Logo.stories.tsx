import { Meta, Story } from '@storybook/react'
import Logo, { Props } from './Logo'

export default {
    component: Logo,
    title: 'Components/Logo',
} as Meta

export const Default: Story = (args: Props) => <Logo {...args} />
