import { GridStack } from 'gridstack'
import { createRef, useEffect, useRef } from 'react'
import 'gridstack/dist/gridstack.min.css'
import 'gridstack/dist/gridstack-extra.min.css'
import 'gridstack/dist/h5/gridstack-dd-native'
import 'gridstack/dist/jq/gridstack-dd-jqueryui'
import TileContainer from '../tile/TileContainer'
import { StyledGridElement } from './styled'

interface Tile {
    id: string
}

interface Props {
    tiles: Tile[]
}

const Card = (id: string) => {
    return (
        <div className="grid-stack-item-content md:w-1/2 lg:w-1/4 items-center justify-center text-center bg-secondary rounded-md mx-auto flex-shrink md:flex-shrink-0">
            <TileContainer id={id} />
        </div>
    )
}

const Item = ({ id }: { id: string }) => Card(id)

const ControlledStack = ({ items }: { items: Tile[] }) => {
    const refs: React.MutableRefObject<any> = useRef({})
    const gridRef: React.MutableRefObject<any> = useRef()

    if (Object.keys(refs.current).length !== items.length) {
        items.forEach(({ id }: { id: string }, i: number) => {
            refs.current[i] = refs.current[i] || createRef()
        })
    }

    useEffect(() => {
        gridRef.current =
            gridRef.current ||
            GridStack.init(
                {
                    float: false,
                    column: 4,
                    maxRow: 0,
                    minRow: 0,

                    animate: true,
                    disableResize: true,
                    disableOneColumnMode: false,
                },
                '.controlled'
            )
        const grid = gridRef.current
        grid.batchUpdate()
        grid.removeAll(false)
        items.forEach(({ id }: { id: string }, i: number) =>
            grid.makeWidget(refs.current[i].current)
        )

        grid.commit()
    }, [items])

    return (
        <div className="grid-stack controlled">
            {items.map((item: Tile, i: number) => (
                <div ref={refs.current[i]} key={i}>
                    <Item {...item} />
                </div>
            ))}
        </div>
    )
}

const Workspace: React.FC<Props> = ({ tiles = [] }) => {
    return (
        <StyledGridElement>
            <div>
                <div className="col-span-2 rounded-md bg-neutralBg">
                    <div className="flex items-center justify-between p-4 border-b border-primary">
                        <h4 className="text-lg font-semibold text-neutralSoft"></h4>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-neutralSoft"></span>
                        </div>
                    </div>

                    <div className="relative p-4">
                        <ControlledStack items={tiles} />
                    </div>
                </div>
            </div>
        </StyledGridElement>
    )
}

export default Workspace
