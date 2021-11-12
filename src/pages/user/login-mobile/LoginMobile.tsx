import { Account } from '@/api'

interface Props {
    account?: Account
}

const LoginMobile = ({ account }: Props) => (
    <React.Fragment>
        {!account ? (
            <div></div>
        ) : (
            <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                    <img
                        className="h-10 w-10 rounded-full"
                        src={account.avatar}
                        alt=""
                    />
                </div>
                <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                        {account.firstName} {account.lastName}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                        {account.code}
                    </div>
                </div>
            </div>
        )}
    </React.Fragment>
)

export default LoginMobile
