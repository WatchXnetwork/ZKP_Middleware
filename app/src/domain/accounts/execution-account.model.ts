/**
 * The state of an execution account managed by the solana program
 */
export class ExecutionAccount {
    counter = 0;
    constructor(fields: { counter: number } | undefined = undefined) {
        if (fields) {
            this.counter = fields.counter;
        }
    }
}