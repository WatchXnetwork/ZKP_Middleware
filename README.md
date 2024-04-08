## Project Setup

- Install pnpm [installation link](https://pnpm.io/installation)
- Install dependencies `pnpm install`

## Configuration

- Make sure that solana is well configured
- Set the cluster url `solana config set --url http://127.0.0.1:8899`
- Create a `.env` file. Refer to the `.env.example` file for the content
- Make sure to put your own keys in the `.env` file.
- Edit PROGRAM_ID in `.env` put the value that you will get in the console after solana running the demo

## Run demo

- Run demo `pnpm run demo`
