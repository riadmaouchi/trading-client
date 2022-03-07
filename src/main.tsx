import { StrictMode, Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/css/tailwind.css'
import { ThemeProvider } from '@/components/theme-provider'

import { epicMiddleware, store } from '@/store/store'
import StyledLayout from '@/pages/layout'
import LoginContainer from '@/pages/user/login'
import LoginMobileContainer from '@/pages/user/login-mobile'
import { createGlobalStyle } from 'styled-components'

import { connect } from './store/connectionStatus/reducers'
import { login } from './slices/userSlice'
import { client } from './api'
import { combineEpics } from 'redux-observable'

import { connectionStatusEpic } from '@/store/connectionStatus'
import { systemStatusEpic } from '@/store/systemStatus'
import { referenceDataEpic } from '@/store/referenceData/epics'
import { pricingEpic } from '@/store/pricing/epics'

const RatesRouter = lazy(() => import('./pages/rates'))

async function init() {
    if (import.meta.env.MODE === 'staging') {
        await import('./mocks/browser').then((module) => module.worker.start())
    }
    await client.connect().then(() => {
        const rootEpic = combineEpics(
            connectionStatusEpic,
            systemStatusEpic,
            referenceDataEpic,
            pricingEpic
        )
        epicMiddleware.run(rootEpic)
        store.dispatch(connect())
        store.dispatch(login('2'))

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
