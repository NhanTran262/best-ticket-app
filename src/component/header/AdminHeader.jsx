import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {HiBars3, HiBell, HiXMark} from "react-icons/hi2";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, selectUserLogout} from "../../features/user/AuthSlice.js";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AdminHeader() {
    const param = useParams();
    const dispatch = useDispatch();
    const userLogout = useSelector(selectUserLogout);
    const navigate = useNavigate();
    const navigation = [
        {name: 'Dashboard', href: '/admin', current: param.param === undefined},
        {name: 'Users', href: '/admin/users', current: param.param === 'users'},
        {name: 'Bookings', href: '/admin/bookings', current: param.param === 'bookings'},
        {name: 'Events', href: '/admin/events', current: param.param === 'events'},
        {name: 'Tickets', href: '/admin/tickets', current: param.param === 'tickets'},
        {name: 'Event Approval', href: '/admin/event-approval', current: param.param === 'event-approval'},
    ]

    const logout = () => {
        dispatch(logoutUser(userLogout));
    }
    return (
        <Disclosure as="nav" className="bg-deep-purple-700 dark:bg-blue-gray-400">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <HiXMark className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <HiBars3 className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative dark:bg-blue-gray-400 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5"/>
                                    <span className="sr-only">View notifications</span>
                                    <HiBell className="h-6 w-6" aria-hidden="true"/>
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button
                                            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5"/>
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <span
                                                        className={classNames(active ? 'bg-gray-100' : '', 'cursor-pointer block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </span>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({active}) => (
                                                    <span
                                                        className={classNames(active ? 'bg-gray-100 ' : '', 'cursor-pointer block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Settings
                                                    </span>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({active}) => (
                                                    <span
                                                        className={classNames(active ? 'bg-gray-100 ' : '', ' cursor-pointer block px-4 py-2 text-sm text-gray-700')}
                                                        onClick={() => logout()}
                                                    >
                                                        Sign out
                                                    </span>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
