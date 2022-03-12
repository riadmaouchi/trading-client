import { storiesOf } from '@storybook/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Header, { Props } from './Header'

/*const stories = storiesOf('Header', module)
const store = createStore(() => ({
    userStatus: {
        code: 'LMO',
        firstName: 'Lorretta',
        lastName: 'Moe',
        avatar: `${window.location.origin}/static/media/mockedAvatars/one.png`,
    },
}))

stories.add('Header', () => (
    <Provider store={store}>
        <Header />
    </Provider>
))*/

import { Meta, Story } from '@storybook/react'

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
