import { RootState } from '@/app/store'
import { connect } from 'react-redux'
import { selectSystemStatus } from './selectors'
import { StatusButton } from './SystemStatusButton'

const mapStateToProps = (state: RootState) => {
    return {
        connectionStatus: state.connectionStatus,
        systemStatus: selectSystemStatus(state),
    }
}

export default connect(mapStateToProps)(StatusButton)
