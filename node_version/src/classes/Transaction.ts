export interface ITransaction {
  amount: number
  from: string
  to: string
  parseJson: () => string
}

export class Transaction implements ITransaction {
  public amount: number
  public from: string
  public to: string
  constructor(_amount: number, _from: string, _to: string) {
    this.amount = _amount
    this.from = _from
    this.to = _to
  }

  parseJson() {
    return JSON.stringify(this)
  }
}
