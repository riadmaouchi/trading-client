import { connect } from 'react-redux'
import LoginMobile from './LoginMobile'

import { selectLoadingStatus, selectUser } from '@/store/user/selector'
import { RootState } from '@/store/store'

const mapStateToProps = (state: RootState) => ({
    user: selectUser(state),
    loading: selectLoadingStatus(state),
})

export default connect(mapStateToProps)(LoginMobile)
