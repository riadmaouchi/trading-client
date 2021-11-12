import { Breadcrumb } from '@/components'
import Header from '../header/Header'
import { useTheme } from '@/components/theme-provider'
import Footer from '../footer/Footer'
import StatusContainer from '../footer/status/StatusContainer'

interface Props {
    header?: React.ReactChild
    mobile?: React.ReactChild
    footer?: React.ReactChild
    body: React.ReactChild
}

const StyledLayout: React.FC<Props> = ({ body, header, mobile }) => {
    const { themeName } = useTheme()
    return (
        <div
            data-color-theme={themeName}
            className="flex h-screen antialiased text-neutral bg-neutralAlt"
        >
            <div className="flex-1 h-full overflow-x-hidden overflow-y-auto">
                <header>
                    <Header header={header} mobile={mobile} />
                </header>
                <main>
                    <Breadcrumb />
                    <Content body={body} />
                </main>
                <footer className="py-6">
                    <Footer
                        version={import.meta.env.PACKAGE_VERSION}
                        footer={<StatusContainer />}
                    />{' '}
                </footer>
            </div>
        </div>
    )
}

export interface ContentProps {
    body: React.ReactChild
}

const Content: React.FC<ContentProps> = ({ body }) => (
    <div className="mt-2">
        <div className="grid grid-cols-1 p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-3">
            {body}

            <div className="rounded-md bg-primarySoft">
                <div className="flex items-center justify-between p-4 border-b border-primary">
                    <h4 className="text-lg font-semibold text-neutralSoft">
                        Chart
                    </h4>
                    <div className="flex items-center"></div>
                </div>

                <div className="relative p-4 h-72">content</div>
            </div>
        </div>
    </div>
)

export default StyledLayout
