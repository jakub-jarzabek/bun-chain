import * as c from 'node:crypto'
import { Block, IBlock, Transaction } from '.'

export interface IChain {
  chain: IBlock[]
  lastBlock: Block
  mine: (nonce: number) => void
  appendBlock: (
    transaction: Transaction,
    fromPK: string,
    signature: Buffer
  ) => void
}

export class Chain {
  public static instance = new Chain()

  chain: Block[]

  constructor() {
    this.chain = [new Block('', new Transaction(100, 'genesis', 'First'))]
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1]
  }

  mine(nonce: number) {
    let guess = 1

    while (true) {
      const hash = c.createHash('MD5')
      hash.update((nonce + guess).toString()).end()

      if (hash.digest('hex').substr(0, 4) === '0000') {
        return
      }

      guess++
    }
  }

  appendBlock(
    transaction: Transaction,
    fromPublicKey: string,
    signature: Buffer
  ) {
    const verify = c.createVerify('SHA256')
    verify.update(transaction.toString())

    const isValid = verify.verify(fromPublicKey, signature)

    if (isValid) {
      const newBlock = new Block(this.lastBlock.hash, transaction)
      this.mine(newBlock.nonce)
      this.chain.push(newBlock)
    }
  }
}
