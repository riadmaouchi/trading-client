import { Route, Switch } from 'react-router-dom'

const RatesRouter: React.FC = () => (
    <Switch>
        <Route exact path="/" render={() => <div>Workspace</div>} />
    </Switch>
)

export default RatesRouter
