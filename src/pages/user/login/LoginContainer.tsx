import { connect } from 'react-redux'
import Login from './Login'

import { selectUser, selectLoadingStatus } from '@/store/user/selector'
import { RootState } from '@/store/store'

const mapStateToProps = (state: RootState) => ({
    user: selectUser(state),
    loading: selectLoadingStatus(state),
})

export default connect(mapStateToProps)(Login)
