import { Route, Switch } from 'react-router-dom'
import { WorkspaceContainer } from './workspace'

const RatesRouter: React.FC = () => (
    <Switch>
        <Route exact path="/" render={() => <RatesRoute />} />
    </Switch>
)

const RatesRoute = () => <WorkspaceContainer />

export default RatesRouter
