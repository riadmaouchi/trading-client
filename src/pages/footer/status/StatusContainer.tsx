import { connect } from 'react-redux'

import { StatusButton } from './StatusButton'
import { selectServices } from './selectors'
import { GlobalState } from '@/store'

const mapStateToProps = (state: GlobalState) => {
    return {
        connectionStatus: state.session.connection,
        services: selectServices(state),
    }
}

export default connect(mapStateToProps)(StatusButton)
