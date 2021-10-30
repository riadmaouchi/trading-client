import { SVGAttributes } from 'react'

export interface Props extends SVGAttributes<Element> {
    size?: number
}

const Logo: React.FC<Props> = ({ size = 2, style, ...props }) => {
    const viewBox = '0 0 64 64'

    style = {
        width: size + 'rem',
        height: size + 'rem',
        ...style,
    }

    return (
        <svg
            width={style.width}
            height={style.height}
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            style={style}
            {...props}
        >
            <title>RT Trading Logo</title>
            <g transform="translate(0,64) scale(0.1,-0.1)" fillRule="nonzero">
                <path
                    d="M223 616 c-89 -29 -172 -114 -199 -203 -44 -145 23 -299 160 -371 44
-23 63 -27 136 -27 70 0 93 4 130 24 61 32 116 86 148 146 23 43 27 62 27 135
0 97 -19 146 -84 213 -77 82 -213 117 -318 83z m293 -222 l7 -66 -33 17 c-37
19 -31 25 -85 -72 -20 -34 -40 -65 -45 -68 -5 -3 -29 5 -53 19 -24 15 -48 26
-54 26 -5 0 -24 -27 -43 -59 l-33 -60 -29 15 c-15 8 -28 19 -28 24 0 6 23 50
51 99 l50 90 50 -30 c28 -16 53 -29 58 -29 7 0 61 91 61 103 0 2 -14 10 -31
17 -16 7 -26 16 -22 21 4 4 42 21 83 37 l75 30 7 -24 c3 -14 10 -54 14 -90z"
                />
            </g>
        </svg>
    )
}
export default Logo
