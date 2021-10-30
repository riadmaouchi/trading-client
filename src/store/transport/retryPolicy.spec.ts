import { ReconnectPolicy } from './retryPolicy'

describe('Testing ReconnectPolicy', () => {
    const delay = 100

    const delays = () =>
        Array(10)
            .fill(delay)
            .map((delay) =>
                new ReconnectPolicy(delay).nextRetryDelayInMilliseconds()
            )

    describe('when calling #ReconnectPolicy on the same max delay multiple times', () => {
        it('all the delays should be greater than or equal to 0', () => {
            delays().forEach((value) => expect(value).toBeGreaterThanOrEqual(0))
        })

        it('all the delays should be less than or equal to the original delay', () => {
            delays().forEach((value) =>
                expect(value).toBeLessThanOrEqual(delay)
            )
        })

        it('the delays should be not equal to one another', () => {
            expect(new Set(delays()).size).not.toBe(1)
        })

        it('the delays should be integers', () => {
            delays().forEach((value) =>
                expect(Number.isInteger(value)).toBe(true)
            )
        })
    })
})
