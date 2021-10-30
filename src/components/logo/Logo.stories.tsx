import Logo, { Props } from './Logo'

import { Meta, Story } from '@storybook/react'

export default {
    component: Logo,
    title: 'Components/Logo',
} as Meta

export const Default: Story = (args: Props) => <Logo {...args} />
