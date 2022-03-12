import { default as Switcher } from './ThemeSwitcher'

import { Meta, Story } from '@storybook/react'

export default {
    component: Switcher,
    title: 'UI/ThemeSwitcher',
} as Meta

export const Button: Story = () => <Switcher />
