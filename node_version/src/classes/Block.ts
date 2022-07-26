import * as c from 'node:crypto'
import { ITransaction as Transaction } from './Transaction'

export interface IBlock {
  prevBlockHash: string
  transaction: Transaction
  timeStamp: Date
  nonce: number
  hash: string
}

export class Block implements IBlock {
  public nonce = Math.round(Math.random() * 1_000_000_000)
  prevBlockHash: string
  transaction: Transaction
  timeStamp: Date

  constructor(_prevBlockHash: string, _transaction: Transaction) {
    this.prevBlockHash = _prevBlockHash
    this.transaction = _transaction
    this.timeStamp = new Date()
  }

  get hash() {
    const str = JSON.stringify(this)
    const hash = c.createHash('SHA256')
    hash.update(str).end()
    return hash.digest('hex')
  }
}
