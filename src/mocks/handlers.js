import { rest } from 'msw'

export const handlers = [
    rest.get('http://localhost:8080/api/v1/users/:userId', (req, res, ctx) => {
        const { userId } = req.params
        console.log('userId', userId)
        ctx.delay(2000)
        return res(
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
