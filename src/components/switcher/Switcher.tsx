export interface Props {
    onClick?: () => void
    checked: boolean
    checkedIcon?: React.ReactChild
    unCheckedIcon?: React.ReactChild
}

const Switcher: React.FC<Props> = ({
    onClick,
    checked,
    checkedIcon,
    unCheckedIcon,
}) => {
    const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        onClick && onClick()
    }

    return (
        <button
            onClick={clickHandler}
            aria-hidden="true"
            className="relative focus:outline-none"
        >
            <div className="w-12 h-6 transition rounded-full outline-none bg-primaryAlt"></div>
            <div
                className={`text-primaryDark bg-primarySofter absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-150 transform scale-110 rounded-full shadow-sm ${
                    checked ? 'translate-x-6 ' : 'translate-x-0 -translate-y-px'
                } `}
            >
                {checkedIcon && unCheckedIcon && checked
                    ? checkedIcon
                    : unCheckedIcon}
            </div>
        </button>
    )
}

export default Switcher
