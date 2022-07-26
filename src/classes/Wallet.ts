import * as c from 'node:crypto'
import { Transaction, Chain } from '.'

interface IWallet {
  publicKey: string
  privateKey: string
  transfer: (amount: number, to: string) => void
}

export class Wallet implements IWallet {
  public publicKey: string
  public privateKey: string

  constructor() {
    const keypair = c.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    })

    this.privateKey = keypair.privateKey
    this.publicKey = keypair.publicKey
  }

  transfer(amount: number, payeePublicKey: string) {
    const transaction = new Transaction(amount, this.publicKey, payeePublicKey)

    const sign = c.createSign('SHA256')
    sign.update(transaction.toString()).end()

    const signature = sign.sign(this.privateKey)
    Chain.instance.appendBlock(transaction, this.publicKey, signature)
  }
}
