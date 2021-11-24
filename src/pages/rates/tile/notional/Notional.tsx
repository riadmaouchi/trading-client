import React, {
    ChangeEventHandler,
    FocusEventHandler,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { CurrencyPairNotional } from '@/api'
import numeral from 'numeral'

interface Props {
    currencyPairBase: string
    currencyPairSymbol: string
    notional: number
    updateNotional: (notional: CurrencyPairNotional) => void
}

const INPUT_FORMAT = '0,000,000[.]00'

const Notional: React.FC<Props> = ({
    currencyPairSymbol,
    currencyPairBase,
    notional,
    updateNotional,
}) => {
    const [notionalValue, setNotionalValue] = useState(
        numeral(notional).format(INPUT_FORMAT)
    )

    useEffect(() => {
        setNotionalValue(numeral(notional).format(INPUT_FORMAT))
    }, [notional])

    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value
        if (value !== '' && value.match(/^([0-9],?){0,11}(\.[0-9]{0,2})?$/)) {
            const newNumericValue = numeral(value).value() ?? 0
            if (newNumericValue !== notional) {
                updateNotional({
                    currencyPair: currencyPairSymbol,
                    notional: newNumericValue,
                })
                return
            }
        }

        setNotionalValue(numeral(notional).format(INPUT_FORMAT))
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value

        if (value.match(/^([0-9],?){0,11}(\.[0-9]{0,3})?$/)) {
            setNotionalValue(value)
        }

        if (
            value !== '' &&
            (value.match(/^([0-9],?){0,11}(\.[0-9]{2})?$/) ||
                value.match(/^([0-9],?){0,6}(\.[0-9]{0,3})?[km]$/))
        ) {
            updateNotional({
                currencyPair: currencyPairSymbol,
                notional: numeral(value).value() ?? 0,
            })
        }
    }

    return useMemo(() => {
        return (
            <div className="py-2 items-center justify-center text-center">
                <div className="inline-block align-middle px-2 w-4/5">
                    <div className="flex flex-wrap items-stretch relative">
                        <input
                            type="text"
                            className="flex-shrink flex-grow leading-normal w-px flex-1 h-8 px-3 relative appearance-none focus:outline-none border-b-2 border-gray-400 focus-within:border-blue-500 bg-secondary"
                            placeholder="Notional"
                            value={notionalValue}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div className="flex -mr-px">
                            <button className="flex items-center leading-normal rounded rounded-l-none px-3 whitespace-no-wrap text-gray-400 text-sm">
                                {currencyPairBase}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }, [notionalValue])
}

export default Notional
