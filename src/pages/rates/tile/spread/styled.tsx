import { PriceMovements } from '@/api'
import styled from 'styled-components'

export const SpreadDirection = styled.div<{
    direction: PriceMovements
    show: boolean
}>`
    color: ${({ theme, direction }) =>
        direction === PriceMovements.Up
            ? theme.colors.green[500]
            : theme.colors.red[500]};

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 0;
    height: 0;
    border-style: solid;

    border-width: ${({ direction }) =>
        direction === PriceMovements.Up ? '0 5px 5px 5px' : '5px 5px 0 5px'};
    border-color: ${({ theme, direction }) =>
        direction === PriceMovements.Up
            ? `transparent transparent ${theme.colors.green[500]} transparent`
            : `${theme.colors.red[500]} transparent transparent  transparent`};
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`
