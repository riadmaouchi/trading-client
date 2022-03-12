import styled from 'styled-components'

export const StyledHistory = styled.div`
    .legend {
        position: absolute;
        left: 12px;
        top: 12px;
        z-index: 1;
        font-size: 12px;
        line-height: 18px;
        font-weight: 300;
    }

    .tv-lightweight-charts {
        background-color: ${({ theme }) => theme.colors.primarySoft};
    }
`
