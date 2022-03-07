import { rest } from 'msw'

export const handlers = [
    rest.get('http://localhost:8080/api/v1/users/:userId', (req, res, ctx) => {
        const { userId } = req.params

        return res(
            ctx.delay(2000),
            ctx.status(200),
            ctx.json({
                firstName: 'Arvel',
                lastName: 'Crynyd',
                code: 'ACR',
                avatar: `${window.location.origin}/five.png`,
            })
        )
    }),
]
