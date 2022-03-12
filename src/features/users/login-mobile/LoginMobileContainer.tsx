import { connect } from 'react-redux'
import LoginMobile from './LoginMobile'

import { selectLoadingStatus, selectUser } from '../selectors'
import { RootState } from '@/app/store'

const mapStateToProps = (state: RootState) => ({
    user: selectUser(state),
    loading: selectLoadingStatus(state),
})

export default connect(mapStateToProps)(LoginMobile)
