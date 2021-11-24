import { User } from '@/api'

interface Props {
    user?: User
}

const LoginMobile = ({ user }: Props) => (
    <React.Fragment>
        {!user ? (
            <div></div>
        ) : (
            <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatar}
                        alt=""
                    />
                </div>
                <div className="ml-3">
                    <div className="text-base font-medium leading-none">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                        {user.code}
                    </div>
                </div>
            </div>
        )}
    </React.Fragment>
)

export default LoginMobile
