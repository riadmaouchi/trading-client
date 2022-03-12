import { Meta, Story } from '@storybook/react'
import Header, { Props } from './Header'

export default {
    component: Header,
    title: 'UI/Header',
} as Meta

const Template: Story<Props> = (args: Props) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {
    routes: [
        { name: 'Rates', url: '/' },
        { name: 'About', url: '/liquidity/about' },
        { name: 'Dashboard', url: '/liquidity/dashboard/EURUSD' },
    ],
}

export const NoRoute = Template.bind({})
NoRoute.args = {}
