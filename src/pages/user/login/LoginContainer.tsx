import { connect } from 'react-redux'
import Login from './Login'
import { selectAccount } from '@/api'
import { GlobalState } from '@/store'

const mapStateToProps = (state: GlobalState) => ({
    account: selectAccount(state),
})

export default connect(mapStateToProps)(Login)
