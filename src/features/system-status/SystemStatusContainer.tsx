import { connect } from 'react-redux'

import { StatusButton } from './SystemStatusButton'
import { selectSystemStatus } from './selectors'
import { RootState } from '@/app/store'

const mapStateToProps = (state: RootState) => {
    return {
        connectionStatus: state.connectionStatus,
        systemStatus: selectSystemStatus(state),
    }
}

export default connect(mapStateToProps)(StatusButton)
