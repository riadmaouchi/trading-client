import { connect } from 'react-redux'
import LoginMobile from './LoginMobile'
import { GlobalState } from '@/store'
import { selectAccount } from '@/api'

const mapStateToProps = (state: GlobalState) => ({
    account: selectAccount(state),
})

export default connect(mapStateToProps)(LoginMobile)
