import { RootState } from '@/app/store'
import Loader from '@/components/loader/Loader'
import {
    selectCurrencyPair,
    selectPricingStatus,
    selectTileData,
} from '@/features/rates/tile/selectors'
import { subscribe, updateNotional } from '@/features/rates/tile/tileSlice'
import { CurrencyPairNotional } from '@/services'
import memoize from 'lodash-es/memoize'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'
import Tile from './Tile'

interface TileContainerProps {
    id: string
}

const mapDispatchToProps = memoize(
    (dispatch: Dispatch, ownProps: TileContainerProps) => ({
        onCurrencyPairChanged: (currencyPair: string) =>
            dispatch(subscribe(currencyPair)),
        onUnmount: compose(dispatch, subscribe),
        updateNotional: (notional: CurrencyPairNotional) =>
            dispatch(updateNotional(notional)),
    }),
    (_, { id }) => id
)

const makeMapStateToProps = memoize(
    (state: RootState, ownProps: TileContainerProps) =>
        (state: RootState, ownProps: TileContainerProps) => ({
            pricingStatus: selectPricingStatus(state),
            currencyPair: selectCurrencyPair(state, ownProps.id),
            tileData: selectTileData(state, ownProps.id),
        }),
    (_, { id }) => id
)

type TileContainerDispatchProps = ReturnType<typeof mapDispatchToProps>

type TileContainerStateProps = ReturnType<
    ReturnType<typeof makeMapStateToProps>
>

type ContainerProps = TileContainerProps &
    TileContainerStateProps &
    TileContainerDispatchProps

const TileContainer: React.FC<ContainerProps> = ({
    pricingStatus,
    id,
    onCurrencyPairChanged,
    onUnmount,
    ...props
}) => {
    useEffect(() => {
        onCurrencyPairChanged(id)
        return () => {
            onUnmount(id)
        }
    }, [id, onCurrencyPairChanged, onUnmount])

    return (
        <Loader
            status={pricingStatus}
            render={() => <Tile {...props} />}
            message={`${id} Disconnected`}
        />
    )
}

const ConnectedTileContainer = connect(
    makeMapStateToProps,
    mapDispatchToProps
)(TileContainer)

export default ConnectedTileContainer
