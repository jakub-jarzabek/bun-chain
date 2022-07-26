import { Wallet } from './classes'
// Test Case
const testCase = () => {
  const me = new Wallet()
  const bob = new Wallet()
  const alice = new Wallet()
  me.transfer(50, bob.publicKey)
  bob.transfer(23, alice.publicKey)
  alice.transfer(5, bob.publicKey)
}

// Test Case Time
const startDate = new Date()
testCase()
const endDate = new Date()
const miningTime = endDate.getTime() - startDate.getTime()
console.log('Operatiom took ' + miningTime / 1000 + ' seconds')
