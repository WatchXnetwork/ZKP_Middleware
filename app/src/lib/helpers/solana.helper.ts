/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import fs from 'mz/fs';

import { EXECUTION_SIZE, PROGRAM_KEYPAIR_PATH } from '@/constants/solana.config';


/**
 * @private
 */
async function getConfig(): Promise<any> {
  return {
    key_pair_string: process.env.PROGRAM_KEY_PAIR,
    json_rpc_url: process.env.NETWORK_CLUSTER_URL
  }
}
/**
 * Load and parse the Solana CLI config file to determine which RPC url to use
 */
export async function getRpcUrl(): Promise<string> {
  try {
    const config = await getConfig();
    if (!config.json_rpc_url) throw new Error('Missing RPC URL');
    return config.json_rpc_url;
  } catch (err: any) {

    console.warn(
      'Failed to read RPC url from CLI config file, falling back to localhost',
    );
    console.log(err)
    return 'http://127.0.0.1:8899';
  }
}

/**
 * Load and parse the Solana CLI config file to determine which payer to use
 */
export async function getPayer(): Promise<Keypair> {
  try {
    const config = await getConfig();
    if (!config.key_pair_string) throw new Error('Missing keypair string');
    return await createKeypairFromString(config.key_pair_string);
  } catch (err) {
    console.log(err)
    console.warn(
      'Failed to create keypair from CLI config file, falling back to new random keypair',
    );
    return Keypair.generate();
  }
}

/**
 * Create a Keypair from a secret key stored in file as bytes' array
 */
export async function createKeypairFromFile(
  filePath: string,
): Promise<Keypair> {
  const secretKeyString = await fs.readFile(filePath, { encoding: 'utf8' });
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  return Keypair.fromSecretKey(secretKey);
}


/**
 * Create a Keypair from a secret key stored in file as bytes' array
 */
export async function createKeypairFromString(
  secretKeyString: string
): Promise<Keypair> {
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  return Keypair.fromSecretKey(secretKey);
}

/**
 * Establish a connection to the cluster
 */
export async function establishConnection(): Promise<Connection> {
  const rpcUrl = await getRpcUrl();
  const connection = new Connection(rpcUrl, 'confirmed');
  const version = await connection.getVersion();
  console.log('Connection to cluster established:', rpcUrl, version);
  return connection;
}

/**
 * Establish an account to pay for everything
 */
export async function establishPayer(connection: Connection): Promise<Keypair> {


  let fees = 0;

  const { feeCalculator } = await connection.getRecentBlockhash();

  // Calculate the cost to fund the greeter account
  fees += await connection.getMinimumBalanceForRentExemption(EXECUTION_SIZE);

  // Calculate the cost of sending transactions
  fees += feeCalculator.lamportsPerSignature * 100; // wag

  const payer = await getPayer();


  let lamports = await connection.getBalance(payer.publicKey);
  if (lamports < fees) {
    // If current balance is not enough to pay for fees, request an airdrop
    const sig = await connection.requestAirdrop(
      payer.publicKey,
      fees - lamports,
    );
    await connection.confirmTransaction(sig);
    lamports = await connection.getBalance(payer.publicKey);
  }

  console.log(
    'Using account',
    payer.publicKey.toBase58(),
    'containing',
    lamports / LAMPORTS_PER_SOL,
    'SOL to pay for fees',
  );

  return payer;
}


/**
 * Check if the solana BPF program has been deployed
 */
export async function getProgramInfos(): Promise<{ programId: string, programPubkey: string }> {
  // Read program id from keypair file
  try {
    const programKeypair = await createKeypairFromString(process?.env?.PROGRAM_KEY_PAIR as string);
    return {
      programId: programKeypair.publicKey.toString(),
      programPubkey: programKeypair.publicKey.toString()
    }
  } catch (err) {
    const errMsg = (err as Error).message;
    throw new Error(
      `Failed to read program keypair at '${PROGRAM_KEYPAIR_PATH}' due to error: ${errMsg}. Program may need to be deployed with \`solana program deploy dist/program/smartwatch.so\``,
    );
  }
}

export async function getProgramInfosWithExecutionAccount(connection: Connection, payer: Keypair): Promise<{ programId: PublicKey, executionPubkey: PublicKey }> {
  // Read program id from keypair file
  try {
    const programKeypair = await createKeypairFromString(process?.env?.PROGRAM_KEY_PAIR as string);
    const programId = programKeypair.publicKey;
    const EXECUTION_SEED = 'privacy';
    const executionPubkey = await PublicKey.createWithSeed(
      payer.publicKey,
      EXECUTION_SEED,
      programId,
    );
    // Check if the execution account has already been created
    const executionAccount = await connection.getAccountInfo(executionPubkey);
    if (executionAccount === null) {
      console.log(
        'Creating execution account',
        (executionAccount as any)?.toBase58(),
        'to send data',
      );
      const lamports = await connection.getMinimumBalanceForRentExemption(
        EXECUTION_SIZE,
      );

      const transaction = new Transaction().add(
        SystemProgram.createAccountWithSeed({
          fromPubkey: payer.publicKey,
          basePubkey: payer.publicKey,
          seed: EXECUTION_SEED,
          newAccountPubkey: executionPubkey,
          lamports,
          space: EXECUTION_SIZE,
          programId,
        }),
      );
      await sendAndConfirmTransaction(connection, transaction, [payer]);
    }
    return {
      programId,
      executionPubkey
    }
  } catch (err) {
    const errMsg = (err as Error).message;
    throw new Error(
      `Failed to read program keypair at '${PROGRAM_KEYPAIR_PATH}' due to error: ${errMsg}. Program may need to be deployed with \`solana program deploy dist/program/smartwatch.so\``,
    );
  }
}
/**
 * Check if the solana BPF program has been deployed
 */
export async function checkProgram(connection: Connection, payer: Keypair): Promise<{ programId: PublicKey, programPubkey: PublicKey }> {
  /**
   * Solana's program id
   */
  let programId: PublicKey;



  // Read program id from keypair file
  try {
    const programKeypair = await createKeypairFromString(process?.env?.PROGRAM_KEY_PAIR as string);
    programId = programKeypair.publicKey;
  } catch (err) {
    const errMsg = (err as Error).message;
    throw new Error(
      `Failed to read program keypair at '${PROGRAM_KEYPAIR_PATH}' due to error: ${errMsg}. Program may need to be deployed with \`solana program deploy dist/program/smartwatch.so\``,
    );
  }


  // Check if the program has been deployed
  const programInfo = await connection.getAccountInfo(programId);
  console.log(programInfo);
  // if (programInfo === null) {
  //   throw new Error('Program needs to be built and deployed');
  // } else if (!programInfo.executable) {
  //   throw new Error(`Program is not executable`);
  // }
  console.log(`Using program ${programId.toBase58()}`);
  // return {} as never;
  // Derive the address (public key) of a greeting account from the program so that it's easy to find later.
  const ACCOUNT_SEED = 'privacy';
  const programPubkey = await PublicKey.createWithSeed(
    payer.publicKey,
    ACCOUNT_SEED,
    programId,
  );

  // Check if the greeting account has already been created
  const programAccount = await connection.getAccountInfo(programPubkey);
  console.log(programAccount)
  console.log(
    'Creating program account',
    programPubkey.toBase58()
  );
  const lamports = await connection.getMinimumBalanceForRentExemption(
    EXECUTION_SIZE,
  );

  const transaction = new Transaction().add(
    SystemProgram.createAccountWithSeed({
      fromPubkey: payer.publicKey,
      basePubkey: payer.publicKey,
      seed: ACCOUNT_SEED,
      newAccountPubkey: programPubkey,
      lamports,
      space: EXECUTION_SIZE,
      programId,
    }),
  );
  const execution = await sendAndConfirmTransaction(connection, transaction, [payer]);
  console.log("Transaction id => ", execution)


  return { programId, programPubkey }
}

