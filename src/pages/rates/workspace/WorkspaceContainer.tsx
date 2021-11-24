import Loader from '@/components/loader/Loader'
import { RootState } from '@/state/store'
import { connect } from 'react-redux'
import { selectPricingStatus, selectTiles } from './selector'
import Workspace from './Workspace'

const mapStateToProps = (state: RootState) => ({
    tiles: selectTiles(state),
    status: selectPricingStatus(state),
})

type Props = ReturnType<typeof mapStateToProps>

const WorkspaceContainer: React.FC<Props> = (props) => {
    const { status } = props

    return (
        <div className="col-span-2 rounded-md text-neutralSoft">
            <Loader
                status={status}
                render={() => <Workspace {...props} />}
                message="Pricing Disconnected"
            />
        </div>
    )
}

export default connect(mapStateToProps)(WorkspaceContainer)
