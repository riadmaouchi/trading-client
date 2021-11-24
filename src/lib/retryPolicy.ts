export interface RetryPolicy {
    nextRetryDelayInMilliseconds(): number
}

export class ReconnectPolicy implements RetryPolicy {
    public delay: number

    public constructor(delay: number) {
        this.delay = delay
    }

    public nextRetryDelayInMilliseconds(): number {
        return Math.round(Math.random() * this.delay)
    }
}
