# Evmos Mobile Wallet

## Inspiration

Nowadays, most wallet UX only contains an asset page. This can provide simple UI for users, however it cannot take advantage of the whole ecosystem of a blockchain. Evmos Mobile Wallet, apart from basic DeFi features such as Sending, Staking, Receiving, will integrate the Swap token from EvmoSwap, and will also plan to integrate different elements of Evmos ecosystem in the future. We provide Evmos Mobile Wallet, an one-stop wallet that allows users only stay in 1 app to interact with all services of Evmos Ecosystem.

## What it does
DeFi services: 
- Staking: Let users view all validators of Evmos, including their status (Active, Inactive, Jailed) and allow users to stake Evmos
- Send/Receive tokens
- Swapping: Integrate EvmosSwap DEX smart contracts and SDK to perform AMM on Evmos (currently supported ATOM, EVMOS, WEVMOS, EMO)

## How we built it
- Technology:
+ Expo, React Native, Typescript
+ CosmJs, EvmosJs
+ EvmoSwap SDK
+ ethers.js

## Challenges we ran into
- The EvmosJS is still under development, so I need to figure out by reading also other cosmjs libraries to understand how to perform transaction on Evmos
- Interact with GRPC, JSON-RPC and Cosmos REST
- Understand EvmoSwap SDK by comparing with Uniswap V2 SDK (since EvmoSwap is a fork of Uniswap V2)

## Accomplishments that we're proud of
- Build a nice UI wallet on Evmos system
- Understand how to use EvmosJs and CosmJs to interact with Evmos and Cosmos blockchain in general

## What we learned
- GRPC, JSON-RPC and Cosmos REST Evmos interaction
- EvmoSwap SDK

## What's next for Evmos Mobile Wallet
- Integrate Voting/Governance
- Integrate other DEX into the wallet
- Integrate NFT Marketplace into the wallet
- Integrate some game play (GameFi, NFT game) that is developed on Evmos blockchain.

