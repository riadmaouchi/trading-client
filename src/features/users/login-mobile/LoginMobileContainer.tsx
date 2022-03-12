import { RootState } from '@/app/store'
import { connect } from 'react-redux'
import { selectLoadingStatus, selectUser } from '../selectors'
import LoginMobile from './LoginMobile'

const mapStateToProps = (state: RootState) => ({
    user: selectUser(state),
    loading: selectLoadingStatus(state),
})

export default connect(mapStateToProps)(LoginMobile)
