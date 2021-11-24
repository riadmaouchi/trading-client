import { User } from '@/api'

interface Props {
    user?: User
}

const Login = ({ user }: Props) => (
    <React.Fragment>
        {!user ? (
            <div></div>
        ) : (
            <img className="h-8 w-8 rounded-full" src={user.avatar} alt="" />
        )}
    </React.Fragment>
)

export default Login
