import styled from 'styled-components'

export const StyledGridElement = styled.div`
    .grid-stack {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .grid-stack > .grid-stack-item {
        display: inline-block;
    }

    .grid-stack > .grid-stack-item > .grid-stack-item-content {
        overflow-x: hidden;
        overflow-y: hidden;
        border: none;
        min-width: clamp(20rem, calc(20rem + 2vw), 22rem);
    }

    .grid-stack > .grid-stack-placeholder > .placeholder-content {
        background-color: ${(props) => props.theme.colors.primaryAlt};
        border: none;
        position: absolute;
        width: auto;
        z-index: 0 !important;
        text-align: center;
    }

    .grid-stack > .grid-stack-item > .ui-icon.ui-resizable-handle {
        background-image: none;
    }
`
