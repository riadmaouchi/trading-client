import { useContext, useEffect, useRef } from 'react'
import last from 'lodash-es/last'
import { Price } from '@/api'
import { createChart } from 'lightweight-charts'

import { ThemeContext } from 'styled-components'
import { StyledHistory } from './styled'

export interface Props {
    priceHistory: Price[]
    id: string
    width?: number
    height?: number
}

const HistoryChart: React.FC<Props> = ({
    width = 200,
    height = 60,
    id,
    priceHistory,
}) => {
    const areaSeries: any = useRef(null)
    const chart: any = useRef()

    const themeContext = useContext(ThemeContext)

    useEffect(() => {
        const ref = document.getElementById(`chart-${id}`)
        chart.current = createChart(ref as HTMLElement)
        const lineColor = themeContext.colors.green[500]
        const r = parseInt(lineColor.slice(1, 3), 16)
        const g = parseInt(lineColor.slice(3, 5), 16)
        const b = parseInt(lineColor.slice(5, 7), 16)

        areaSeries.current = chart.current.addAreaSeries({
            topColor: `rgba(${r}, ${g}, ${b}, 0.56)`,
            bottomColor: `rgba(${r}, ${g}, ${b}, 0.04)`,
            lineColor: lineColor,
            lineWidth: 3,
            priceLineVisible: false,
            priceFormat: { type: 'price', precision: 5, minMove: 0.00001 },
        })

        const options = {
            width,
            height,
            priceScale: {
                visible: false,
                autoScale: true,
                invertScale: false,
                alignLabels: false,
                borderVisible: false,

                scaleMargins: {
                    top: 0.1,
                    bottom: 0.2,
                },
            },
            timeScale: {
                rightOffset: 5,
                fixLeftEdge: false,
                lockVisibleTimeRangeOnResize: true,
                rightBarStaysOnScroll: false,
                borderVisible: false,
                visible: false,
                timeVisible: false,
            },

            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    visible: false,
                },
            },
            crosshair: {
                vertLine: {
                    visible: false,
                    labelVisible: false,
                },
                horzLine: {
                    visible: false,
                    labelVisible: false,
                },
                mode: 1,
            },
            layout: {
                backgroundColor: 'transparent',
            },
            localization: {
                priceFormatter: function (price: number) {
                    return `$${price.toFixed(5)}`
                },
            },
        }

        chart.current.applyOptions(options)

        /* areaSeries.current.setData(
            priceHistory.map((p) => {
                return {
                    time: Math.floor(p.time / 1000),
                    value: p.mid,
                }
            })
        )*/
        document.getElementById(`chart-${id}`)!.style.position = 'relative'
    }, [])

    useEffect(() => {
        const p = last(priceHistory)
        if (p) {
            areaSeries.current.update({
                time: Math.floor(p.time / 1000),
                value: p.mid,
            })
        }
    }, [priceHistory])

    return (
        <StyledHistory>
            <div id={`chart-${id}`}></div>
        </StyledHistory>
    )
}
export default HistoryChart
