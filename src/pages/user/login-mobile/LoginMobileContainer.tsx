import { connect } from 'react-redux'
import LoginMobile from './LoginMobile'

import { selectUser } from '@/store/user/selector'
import { RootState } from '@/store/store'

const mapStateToProps = (state: RootState) => ({
    user: selectUser(state),
})

export default connect(mapStateToProps)(LoginMobile)
