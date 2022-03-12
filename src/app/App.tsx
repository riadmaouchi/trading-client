import StyledLayout from '@/components/layout/Layout'
import { ThemeProvider } from '@/components/theme-provider'
import { connectionStatusEpic } from '@/features/connection-status/connectionEpics'
import { connect } from '@/features/connection-status/connectionSlice'
import { currencyPairEpic } from '@/features/currency-pairs/currencyPairEpics'
import { tileEpic } from '@/features/rates/tile/tileEpics'
import { systemStatusEpic } from '@/features/system-status'
import LoginContainer from '@/features/users/login'
import LoginMobileContainer from '@/features/users/login-mobile'
import { login } from '@/features/users/userSlice'
import { client } from '@/services/client'
import { lazy, StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { combineEpics } from 'redux-observable'
import { epicMiddleware, store } from './store'
import GlobalStyle from './styles'

const RatesRouter = lazy(() => import('../features/rates'))

export async function initApp() {
    if (import.meta.env.MODE === 'staging') {
        await import('../mocks/browser').then((module) => module.worker.start())
    }
    client.connect().then(() => {
        const rootEpic = combineEpics(
            connectionStatusEpic,
            systemStatusEpic,
            currencyPairEpic,
            tileEpic
        )
        epicMiddleware.run(rootEpic)
        store.dispatch(connect())
        store.dispatch(login('2'))

        ReactDOM.render(
            <StrictMode>
                <App />
            </StrictMode>,
            document.getElementById('root')
        )
    })
}

function App() {
    return (
        <ThemeProvider>
            <GlobalStyle />
            <BrowserRouter>
                <Suspense fallback={<div>Loading</div>}>
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
    )
}
