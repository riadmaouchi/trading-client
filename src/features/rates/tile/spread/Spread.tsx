import { PriceMovements } from '@/services'
import React, { useEffect, useRef, useState } from 'react'
import { SpreadDirection } from './styled'

interface Props {
    spread: string
}

const Spread: React.FC<Props> = ({ spread }) => {
    const [spreadValue, setSpreadValue] = useState(spread)
    const spreadValueRef = useRef('-')
    const previousSpreadValue = spreadValueRef.current
    const [direction, setDirection] = useState(PriceMovements.None)

    if (spread !== previousSpreadValue && spread !== spreadValue) {
        setSpreadValue(spread)
        const hasPrice = Boolean(spread)
        setDirection(
            hasPrice
                ? spread > spreadValueRef.current
                    ? PriceMovements.Up
                    : PriceMovements.Down
                : PriceMovements.None
        )
    }

    useEffect(() => {
        spreadValueRef.current = spread
    })

    return (
        <div>
            <SpreadDirection
                direction={direction}
                show={direction === PriceMovements.Up}
            ></SpreadDirection>
            <span className="align-middle items-center text-center text-sm text-gray-400">
                {spread}
            </span>
            <SpreadDirection
                direction={direction}
                show={direction === PriceMovements.Down}
            ></SpreadDirection>
        </div>
    )
}

export default Spread
