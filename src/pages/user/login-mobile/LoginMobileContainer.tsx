import { connect } from 'react-redux'
import LoginMobile from './LoginMobile'

import { selectUser } from '@/state/user/selector'
import { RootState } from '@/state/store'

const mapStateToProps = (state: RootState) => ({
    user: selectUser(state),
})

export default connect(mapStateToProps)(LoginMobile)
