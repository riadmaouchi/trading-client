import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { Meta, Story } from '@storybook/react'
import Switcher, { Props } from './Switcher'

export default {
    component: Switcher,
    title: 'Components/Switcher',
} as Meta

const Template: Story<Props> = (args: Props) => <Switcher {...args} />

export const Checked = Template.bind({})
Checked.args = {
    checked: true,
    checkedIcon: <SunIcon className="w-4 h-4" />,
    unCheckedIcon: <MoonIcon className="w-4 h-4" />,
}

export const Unchecked = Template.bind({})
Unchecked.args = {
    checked: false,
    checkedIcon: <SunIcon className="w-4 h-4" />,
    unCheckedIcon: <MoonIcon className="w-4 h-4" />,
}
