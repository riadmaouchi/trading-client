export interface Rate {
    bigFigure: number
    rate: number
    pipFraction: number
    pips: number
}

export function toRate(rate = 0, ratePrecision = 0, pipPrecision = 0): Rate {
    const rateString = rate.toFixed(ratePrecision)
    const priceParts = rateString.split('.')
    const bigFigure = priceParts[0]
    const fractions = priceParts[1] || '00000'
    return {
        rate,
        bigFigure: Number(
            bigFigure + '.' + fractions.substring(0, pipPrecision - 2)
        ),
        pips: Number(fractions.substring(pipPrecision - 2, pipPrecision)),
        pipFraction: Number(
            fractions.substring(pipPrecision, pipPrecision + 1)
        ),
    }
}
