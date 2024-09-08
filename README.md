# trustless-pass

A never-before-seen Web2 credentials management application. Store and access your credentials in a purely non-custodial and trustless way.

## Getting Started

First, set the correct Node.js version using `nvm` and run the development server:
```bash
nvm use v18.19.1

```

# back-end
```
cd api

copy .env.example to .env 

setup all the environment variables including moralis ipfs key, app-wallet private key
& wallet address, mongodb url.

npm run start

```
server would start on localhost:3000

# front-end
```
cd webapp

npm run build

npm run dev

```
Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

# browser-extension


![top](./docs/dashboard.png)


![top](./docs/save-creds.png)


![top](./docs/get-creds.png)


## Description

Trustless-Pass is a web app and browser extension designed to store and access users' Web2 credentials in a trustless manner. When users secure their credentials, Trustless-Pass prompts them to provide their signature to encrypt and store the information. We issue a proof of security on the Hedera blockchain, allowing users to verify and ensure the safety of their data. No one other than the user can view or access the credentials, as everything is encrypted using the user's MetaMask wallet signature.

For example, when a user wants to log in to Amazon.com, our browser extension will prompt them to provide their signature to access and decrypt their Amazon.com credentials.

## Save Creds Flow

![architecture](./docs/trustless-pass.jpg)

## Get Creds Flow

![architecture](./docs/trustless-pass-2.png)



## Deployed Contract for Trsutless-Pass dapp on Hedera Blockchain

### TrsutlessProof

- https://hashscan.io/testnet/contract/0.0.4807203