import { StrictMode, Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/css/tailwind.css'
import { ThemeProvider } from '@/components/theme-provider'

import { epicMiddleware, rootEpic, store } from '@/state/store'
import StyledLayout from '@/pages/layout'
import LoginContainer from '@/pages/user/login'
import LoginMobileContainer from '@/pages/user/login-mobile'
import { createGlobalStyle } from 'styled-components'

import { connect } from './state/connectionStatus/reducers'
import { userSelected } from './state/user/reducers'
import { API, client } from './api'

const RatesRouter = lazy(() => import('./pages/rates'))

async function init() {
    client.connect().then(() => {
        epicMiddleware.run(rootEpic)
        store.dispatch(connect())
        store.dispatch(userSelected(API.login()))
        ReactDOM.render(renderApp(), document.getElementById('root'))
    })
}

init()

function renderApp() {
    return (
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
        </StrictMode>
    )
}

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
