import { ServiceStates } from '@/services/types'
import { StatusOfflineIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import styled from 'styled-components/macro'
import { default as UILoader } from 'react-loader-spinner'

const LoadableStyle = styled.div<{ minWidth?: string; minHeight?: string }>`
    width: 100%;
    min-width: ${({ minWidth = '100%' }) => minWidth};
    height: 100%;
    min-height: ${({ minHeight = '100%' }) => minHeight};
    border-radius: 0.1875rem;
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.neutral};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: 0.59;
    fill: ${(props) => props.theme.colors.neutral};
`

const Content = styled.div<{ minWidth?: string }>`
    height: 100%;
    width: 100%;
    min-width: ${({ minWidth = '100%' }) => minWidth};
`

interface Props {
    status: ServiceStates
    render: () => JSX.Element
    onMount?: () => void
    message?: string
}

const Loader: React.FC<Props> = ({
    status,
    render,
    onMount,
    message = 'Disconnected',
}) => {
    useEffect(() => {
        if (status === ServiceStates.Connected && onMount) onMount()
    }, [status])

    return status === ServiceStates.Connected ? (
        <Content>{render()}</Content>
    ) : (
        <LoadableStyle>
            {status === ServiceStates.Connecting ? (
                <UILoader
                    type="Bars"
                    className="bg-secondary"
                    color="#22d3ee"
                />
            ) : (
                <React.Fragment>
                    <StatusOfflineIcon className="h-10 w-10" />
                    <div>{message}</div>
                </React.Fragment>
            )}
        </LoadableStyle>
    )
}

export default Loader
