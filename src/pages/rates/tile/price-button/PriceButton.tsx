import { useEffect, useRef, useState } from 'react'
import { Direction } from '@/state/pricing/tile'
import styled from 'styled-components'

interface Props {
    big?: number
    pip?: number
    pipFraction?: number
    rate?: number
    direction?: Direction
    handleClick?: () => void
    symbol: string
}

const FlashContainerStyle = styled.div<{ flash: string }>`
    background-color: transparent;
    transition: background-color 500ms;
`

const FlashStyle = styled(FlashContainerStyle)`
    background-color: ${({ theme, flash }) =>
        flash === 'up'
            ? theme.colors.green[500]
            : flash === 'down'
            ? theme.colors.red[500]
            : 'transparent'};
    &:hover {
        background-color: transparent;
    }
`

const renderPips = (pips: number) =>
    pips.toString().length === 1 ? `0${pips}` : pips
const createBigFigure = (bigFigure: number, rate: number) =>
    bigFigure === Math.floor(rate) ? `${bigFigure}.` : bigFigure.toString()
const renderBigFigure = (bigFigure: string) =>
    bigFigure.toString().length === 3 ? `${bigFigure}0` : bigFigure

const PriceButton: React.FC<Props> = ({
    big = 0,
    pip = 0,
    pipFraction = 0,
    rate = 0,
    direction = Direction.Buy,
    handleClick = () => {
        console.log('clicked')
    },
    symbol,
}) => {
    const [price, setPrice] = useState(rate)
    const previousPriceRef = useRef(0)
    const previousPrice = previousPriceRef.current

    if (rate !== previousPrice && rate !== price) {
        setPrice(rate)
    }

    const [activeFlash, setActiveFlash] = useState('')

    useEffect(() => {
        previousPriceRef.current = rate
        setActiveFlash(
            price > previousPrice ? 'up' : price < previousPrice ? 'down' : ''
        )
        const timer = setTimeout(() => {
            setActiveFlash('')
        }, 200)
        return () => clearTimeout(timer)
    }, [rate])

    return (
        <button
            className={`group rounded hover:${
                direction === Direction.Buy ? 'bg-blue-500' : 'bg-red-500'
            } group-hover:text-neutralSofter`}
        >
            <div className="flex py-5 p-2 ">
                <div className="flex flex-col place-content-center">
                    <div className="text-left text-gray-400 text-xs uppercase group-hover:text-neutralSofter">
                        {direction}
                    </div>
                    <div className="group-hover:text-neutralSofter text-base">
                        {renderBigFigure(createBigFigure(big, rate))}
                    </div>
                </div>

                <FlashStyle
                    flash={activeFlash}
                    className="group-hover:text-neutralSofter flex text-5xl font-bold m-auto"
                >
                    {renderPips(pip)}
                </FlashStyle>
                <div className="group-hover:text-neutralSofter flex text-xl">
                    {pipFraction}
                </div>
            </div>
        </button>
    )
}

export default PriceButton
