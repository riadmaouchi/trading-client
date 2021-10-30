import logo from './logo.svg'
import GlobalStyle from './styles'

import { useTheme } from '@/components/theme-provider'
import styled from 'styled-components'
import ThemeSwitcher from '../header/theme-switcher'

function App() {
    const { themeName } = useTheme()

    const RedContainer = styled.div`
        color: ${(props) => props.theme.colors.neutral};
    `

    return (
        <React.Fragment>
            <GlobalStyle />

            <div className="App" data-color-theme={themeName}>
                <RedContainer>Themed components</RedContainer>
                <header className="bg-primary text-secondary">
                    <img src={logo} alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <ThemeSwitcher />
                </header>
            </div>
        </React.Fragment>
    )
}

export default App
