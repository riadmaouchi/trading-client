import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import App from '@/pages/app/App'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './styles/tailwind.css'
import { ThemeProvider } from '@/components/theme-provider'

async function init() {
    ReactDOM.render(
        <React.StrictMode>
            <ThemeProvider>
                <BrowserRouter>
                    <Suspense fallback={<div />}>
                        <Switch>
                            <Route render={() => <App />} />
                        </Switch>
                    </Suspense>
                </BrowserRouter>
            </ThemeProvider>
        </React.StrictMode>,
        document.getElementById('root')
    )
}
init()
