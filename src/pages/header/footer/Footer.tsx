import React from 'react'

export interface Props {
    footer?: React.ReactNode
    version?: string
}

// v. {process.env.REACT_APP_VERSION}
const Footer: React.FC<Props> = ({ footer, version = 'v. snapshot' }) => {
    return (
        <footer className="text-neutral flex items-center justify-between p-4 bg-primarySoft border-t border-primary">
            <div>
                <span>{version}</span>
            </div>

            {footer}
        </footer>
    )
}

export default Footer
