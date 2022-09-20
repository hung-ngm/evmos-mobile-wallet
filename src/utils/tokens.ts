import { ChainId, Token } from 'evmoswap-sdkv2';
import { BigNumber, Contract, utils, providers, Signer, BigNumberish } from 'ethers'
import { TokenWithContract } from '../types/token';

export const ERC20_ABI = [
  'function allowance(address, address) external view returns (uint256)',
  'function approve(address, uint) external returns (bool)',
  'function balanceOf(address) external view returns(uint256)',
]

const buildERC20TokenWithContract = (
  address: string,
  name: string,
  symbol: string,
  decimals: number,
): TokenWithContract => {
  return {
    contract: (provider) => {
      return new Contract(address, ERC20_ABI, provider)
    },

    walletHas: async (signer, requiredAmount) => {
      const contract = new Contract(address, ERC20_ABI, signer.provider)
      const signerBalance = await contract
        .connect(signer)
        .balanceOf(await signer.getAddress())

      return signerBalance.gte(BigNumber.from(requiredAmount))
    },

    token: new Token(ChainId.EVMOS, address, decimals, symbol, name),
  }
}

export const EMO = buildERC20TokenWithContract(
    '0x181C262b973B22C307C646a67f64B76410D19b6B',
    'EvmoSwap Token',
    'EMO',
    18,
)

export const WETH = buildERC20TokenWithContract(
    '0x5842C5532b61aCF3227679a8b1BD0242a41752f2',
    'Wrapped Ether',
    'WETH',
    18,
)

export const USDC = buildERC20TokenWithContract(
  utils.getAddress('0x51e44ffad5c2b122c8b635671fcc8139dc636e82'),
  'USD Coin',
  'USDC',
  6,
)

export const WEVMOS = buildERC20TokenWithContract(
  '0xD4949664cD82660AaE99bEdc034a0deA8A0bd517',
  'Wrapped Evmos',
  'WEVMOS',
  18,
)

export const ATOM = buildERC20TokenWithContract(
  '0xC5e00D3b04563950941f7137B5AfA3a534F0D6d6',
  'Cosmos',
  'ATOM',
  6,
)

export const SWAP_ROUTER_ABI = [
  'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
]