import { Meta, Story } from '@storybook/react'
import { default as Switcher } from './ThemeSwitcher'

export default {
    component: Switcher,
    title: 'UI/ThemeSwitcher',
} as Meta

export const Button: Story = () => <Switcher />
