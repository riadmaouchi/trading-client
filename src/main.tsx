import { StrictMode, Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './styles/tailwind.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Provider } from 'react-redux'
import { createStore } from '@/store/store'
import StyledLayout from '@/pages/layout'
import LoginContainer from '@/pages/user/login'
import LoginMobileContainer from '@/pages/user/login-mobile'
import { createGlobalStyle } from 'styled-components'

const RatesRouter = lazy(() => import('./pages/rates'))

async function init() {
    const store = await createStore()
    ReactDOM.render(
        <StrictMode>
            <ThemeProvider>
                <GlobalStyle />
                <BrowserRouter>
                    <Suspense fallback={<div></div>}>
                        <Switch>
                            <Provider store={store}>
                                <Route
                                    render={() => (
                                        <StyledLayout
                                            header={<LoginContainer />}
                                            mobile={<LoginMobileContainer />}
                                            body={<RatesRouter />}
                                        />
                                    )}
                                />
                            </Provider>
                        </Switch>
                    </Suspense>
                </BrowserRouter>
            </ThemeProvider>
        </StrictMode>,
        document.getElementById('root')
    )
}
init()

const GlobalStyle = createGlobalStyle`

   :root {
    --color-primary: #ffffff;
    --color-primary-alt: #26c6da;
    --color-secondary: #12263f;
    --color-neutral: #edf2f9;
    --color-neutral-alt: #152e4d;
    --color-accent: #61dafb;
    --color-primarydark: #b2ebf2;
    --color-primarysofter: #00838f;
  }

  [data-color-theme="light"] {
    --color-primary: #282c34;
    --color-primary-alt: #b2ebf2;
    --color-secondary: #ffffff;
    --color-neutral: #111827;
    --color-neutral-alt: #F3F4F6;
    --color-accent: #61dafb;
    --color-primarydark: #00838f;
    --color-primarysofter:  #ffffff;
   
  }
`
