import { Connection, ServiceGroup, ServiceStates } from '@/services'
import { Popover } from '@headlessui/react'
import {
    CheckCircleIcon,
    ExclamationIcon,
    StatusOfflineIcon,
    StatusOnlineIcon,
} from '@heroicons/react/solid'
import React, { useState } from 'react'
import { usePopper } from 'react-popper'

interface Props {
    connectionStatus: Connection
    systemStatus: ServiceGroup[]
}

const getStatus = (systemStatus: ServiceGroup[]) => {
    if (systemStatus.every((s) => s.state === ServiceStates.Connected)) {
        return ServiceStates.Connected
    }
    if (systemStatus.some((s) => s.state === ServiceStates.Connecting)) {
        return ServiceStates.Connecting
    }
    return ServiceStates.Disconnected
}

export const StatusButton: React.FC<Props> = ({
    connectionStatus: { url },
    systemStatus,
}) => {
    const [referenceElement, setReferenceElement] =
        useState<HTMLButtonElement | null>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'top',
    })

    const appStatus = getStatus(systemStatus)

    const api = `${url}/v1/sse`
    return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            ref={(ref: HTMLButtonElement) =>
                                setReferenceElement(ref)
                            }
                            className={`
                ${open ? '' : 'text-opacity-90'}
                w-full group px-3 py-2 rounded-md inline-flex items-center hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            {appStatus == ServiceStates.Connected ? (
                                <StatusOnlineIcon
                                    className={`${open ? '' : 'text-opacity-70'}
                 text-green-500 w-5 h-5 mr-2 ml-2 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                    aria-hidden="true"
                                />
                            ) : (
                                <StatusOfflineIcon
                                    className={`${open ? '' : 'text-opacity-70'}
                  ${
                      appStatus == ServiceStates.Disconnected
                          ? 'text-red-500'
                          : 'text-yellow-500'
                  }
                                    w-5 h-5 mr-2 ml-2 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                    aria-hidden="true"
                                />
                            )}
                        </Popover.Button>

                        <Popover.Panel
                            ref={(ref: HTMLDivElement) => setPopperElement(ref)}
                            style={styles.popper}
                            {...attributes.popper}
                        >
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid gap-cy-2 bg-secondary text-neutral p-7">
                                    {systemStatus.map((service, id) => (
                                        <div
                                            key={id}
                                            className="flex items-center transition duration-150 ease-in-out rounded-lg hover:bg-neutralAlt focus:outline-none focus-visible:ring focus-visible:bg-neutralAlt focus-visible:ring-opacity-50"
                                        >
                                            <div className="flex items-center flex-shrink-0 sm:h-12 sm:w-12">
                                                {service.state ===
                                                ServiceStates.Connected ? (
                                                    <CheckCircleIcon
                                                        aria-hidden="true"
                                                        className="h-5 w-5 text-green-500"
                                                    />
                                                ) : (
                                                    <ExclamationIcon
                                                        aria-hidden="true"
                                                        className={`h-5 w-5 ${
                                                            appStatus ===
                                                            ServiceStates.Disconnected
                                                                ? 'text-red-500'
                                                                : 'text-yellow-500'
                                                        }`}
                                                    />
                                                )}
                                            </div>

                                            <span className="items-center text-sm font-medium ">
                                                {service.type}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="bg-secondary">
                                        <a
                                            href={api}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-neutralAlt focus:outline-none focus-visible:ring focus-visible:ring-neutralAlt focus-visible:ring-opacity-50"
                                        >
                                            <span className="text-sm font-medium text-cyan-500">
                                                Stream API
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </div>
    )
}
