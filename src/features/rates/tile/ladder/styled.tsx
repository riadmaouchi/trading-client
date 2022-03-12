import styled from 'styled-components'
import { Theme } from 'themes'

export const StyledLadder = styled.div<{ theme: Theme }>`
    overflow: auto;

    ::-webkit-scrollbar {
        width: 0em;
        height: 0em;
    }
`
