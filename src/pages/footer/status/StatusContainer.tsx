import { connect } from 'react-redux'

import { StatusButton } from './StatusButton'
import { selectSystemStatus } from './selectors'
import { RootState } from '@/state/store'

const mapStateToProps = (state: RootState) => {
    return {
        connectionStatus: state.connectionStatus,
        systemStatus: selectSystemStatus(state),
    }
}

export default connect(mapStateToProps)(StatusButton)
