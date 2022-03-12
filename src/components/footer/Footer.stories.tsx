import { Meta, Story } from '@storybook/react'
import Footer, { Props } from './Footer'

export default {
    component: Footer,
    title: 'UI/Footer',
} as Meta

const Template: Story<Props> = (args: Props) => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {
    footer: <div>Footer</div>,
    version: 'v. 1.6',
}

export const Empty = Template.bind({})
Empty.args = {}
