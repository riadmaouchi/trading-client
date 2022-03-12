import { Breadcrumb } from '@/components'
import { useTheme } from '@/components/theme-provider'
import StatusContainer from '../../features/system-status/SystemStatusContainer'
import Footer from '../footer/Footer'
import Header from '../header/Header'

interface Props {
    header?: React.ReactChild
    mobile?: React.ReactChild
    footer?: React.ReactChild
    body: React.ReactChild
}

const StyledLayout: React.FC<Props> = ({ body, header, mobile }) => {
    const { themeName } = useTheme()
    const version = [
        import.meta.env.PACKAGE_VERSION,
        import.meta.env.VITE_BUILD_VERSION,
        import.meta.env.VITE_BUILD_NUMBER,
    ]
        .filter(Boolean)
        .join('-')
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
                    <Footer version={version} footer={<StatusContainer />} />{' '}
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
