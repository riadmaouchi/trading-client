import { GridStack } from 'gridstack'
import 'gridstack/dist/h5/gridstack-dd-native'
import React, { createRef, useEffect, useRef } from 'react'
import 'gridstack/dist/gridstack.min.css'
import 'gridstack/dist/gridstack-extra.min.css'

interface Tile {
    id: string
}

export interface Props {
    tiles: Tile[]
}

const Card = (id: string) => {
    return (
        <div className="grid-stack-item-content md:w-1/2 lg:w-1/4 items-center justify-center text-center bg-primaryAlt">
            <div id={id}>Hello {id}</div>
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
                    animate: true,
                    row: 2,

                    disableResize: true,
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
        <div>
            <div className="grid-stack controlled">
                {items.map((item: Tile, i: number) => (
                    <div ref={refs.current[i]} key={i}>
                        <Item {...item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

const Workspace: React.FC<Props> = ({ tiles = [] }) => {
    return <ControlledStack items={tiles} />
}

export default Workspace
