import ThemeSwitcher from './theme-switcher'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '@/components/logo/Logo'

const navigation = [
    { name: 'Rates', url: '/' },
    { name: 'About', url: '/liquidity/about' },
    { name: 'Dashboard', url: '/liquidity/dashboard/EURUSD' },
]
const profile = ['Your Profile', 'Settings', 'Sign out']

export interface Props {
    header?: React.ReactChild
    mobile?: React.ReactChild
    routes?: Route[]
}

interface Route {
    name: string
    url: string
}

const Header: React.FC<Props> = ({ header, mobile, routes = [] }) => {
    return (
        <Disclosure as="nav">
            {({ open }) => (
                <>
                    <div className="bg-secondary border-b border-primary mx-auto px-4 sm:px-6 lg:px-8 ">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center flex-no-shrink text-white mr-6">
                                        <Logo className="fill-current h-8 w-8 mr-2 text-primaryAlt" />
                                        <span className="text-neutral font-semibold text-xl tracking-tight">
                                            RT Trading
                                        </span>
                                    </div>
                                </div>

                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {routes.map((item) => (
                                            <Fragment key={item.name}>
                                                <NavLink
                                                    className="text-neutral transition-colors duration-200 hover:bg-primaryAlt  px-3 py-2 rounded-md text-sm font-medium"
                                                    key={item.name}
                                                    to={item.url}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            </Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <ThemeSwitcher />

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        {({ open }) => (
                                            <>
                                                <div>
                                                    <Menu.Button className="max-w-xs bg-primary rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-primary">
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        {header}
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items
                                                        static
                                                        className="bg-secondary origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                    >
                                                        {profile.map((item) => (
                                                            <Menu.Item
                                                                key={item}
                                                            >
                                                                {() => (
                                                                    <NavLink
                                                                        className="text-neutral transition-colors duration-200 hover:bg-neutralAlt block px-4 py-2 text-sm"
                                                                        key={
                                                                            item
                                                                        }
                                                                        to="#"
                                                                    >
                                                                        {item}
                                                                    </NavLink>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </>
                                        )}
                                    </Menu>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <MenuIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {routes.map((item) => (
                                <Fragment key={item.name}>
                                    <NavLink
                                        className="text-neutral transition-colors duration-200 hover:bg-primaryAlt block px-3 py-2 rounded-md text-base font-medium"
                                        key={item.name}
                                        to={item.url}
                                    >
                                        {item.name}
                                    </NavLink>
                                </Fragment>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-700">
                            {mobile}
                            <div className="mt-3 px-2 space-y-1">
                                {profile.map((item) => (
                                    <NavLink
                                        className="block px-3 py-2 rounded-md text-base font-medium text-neutral transition-colors duration-200 hover:bg-primaryAlt"
                                        key={item}
                                        to="#"
                                    >
                                        {item}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Header
