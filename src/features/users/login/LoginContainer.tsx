import { connect } from 'react-redux'
import Login from './Login'

import { selectUser, selectLoadingStatus } from '../selectors'
import { RootState } from '@/app/store'

const mapStateToProps = (state: RootState) => ({
    user: selectUser(state),
    loading: selectLoadingStatus(state),
})

export default connect(mapStateToProps)(Login)