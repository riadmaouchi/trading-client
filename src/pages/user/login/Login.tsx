import { Account } from '@/api'

interface Props {
    account?: Account
}

const Login = ({ account }: Props) => (
    <React.Fragment>
        {!account ? (
            <div></div>
        ) : (
            <img className="h-8 w-8 rounded-full" src={account.avatar} alt="" />
        )}
    </React.Fragment>
)

export default Login
