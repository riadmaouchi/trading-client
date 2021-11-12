import { Link, useLocation } from 'react-router-dom'

interface Match {
    pathSection: string
    match: boolean
    name: string
}

const Breadcrumb: React.FC = () => {
    const location = useLocation()

    const matches: Match[] = []
    location.pathname &&
        location.pathname
            .replace(/\/$/, '')
            .split('/')
            .reduce((previous, current) => {
                const pathSection = `${previous}/${current}`
                matches.push({
                    pathSection: pathSection,
                    match: pathSection === location.pathname,
                    name: /[^/]*$/.exec(pathSection)?.[0] ?? '',
                })
                return pathSection
            })
    return (
        <nav className="flex items-center justify-between px-4 py-4 border-b lg:py-6 border-primary">
            <ol className="list-reset flex">
                <li>
                    <Link className="text-blue font-semibold" to={'/'}>
                        Home
                    </Link>
                </li>

                {matches.map((route) => {
                    return (
                        <>
                            <li>
                                <span className="mx-2">/</span>
                            </li>
                            {route.match ? (
                                <li>{route.name}</li>
                            ) : (
                                <li>
                                    <Link
                                        className="font-semibold"
                                        to={route.pathSection}
                                    >
                                        {route.name}
                                    </Link>
                                </li>
                            )}
                        </>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumb
