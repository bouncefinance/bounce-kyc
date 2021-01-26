import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'

export const useActivePlatform = () => {
  const context = useWeb3ReactCore()
  let symbol = 'ETH'
  if (context.chainId === 97 || context.chainId === 56) {
    symbol = 'BNB'
  }
  // let symbol = {}
  return { Psymbol: symbol }
}
