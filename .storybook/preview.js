import '../src/styles/tailwind.css'
import GlobalStyle from '../src/pages/app/styles'
import { addDecorator } from '@storybook/react'
import { ThemeProvider } from '@/components/theme-provider'
import { MemoryRouter } from 'react-router-dom'

addDecorator((storyFn) => (
    <ThemeProvider>
        <MemoryRouter>
            <GlobalStyle />
            <div style={{ margin: '3em' }}>{storyFn()}</div>
        </MemoryRouter>
    </ThemeProvider>
))

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}
