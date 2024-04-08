/* eslint-disable no-console */
'use server'


import { PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";

import log from "@/lib/helpers/logger.helper";
import { establishConnection, establishPayer } from "@/lib/helpers/solana.helper";

import { getProgramData } from "@/app/(app)/dashboard/account/actions";
import { HealthData } from "@/domain/data/health-data.model";


export async function submitPrivateData(data: Record<string, any>) {
  log("Connecting to blockchain...");
  // Establish connection to the cluster
  const connection = await establishConnection();

  log("Establishing payer...")
  // Determine who pays for the fees
  const payer = await establishPayer(connection);

  log("Getting program infos");
  const { programId } = await getProgramData();

  const myInstructionData = new HealthData(data as never);
  log(myInstructionData)
  // const serializedData = btoa(JSON.stringify(myInstructionData));
  const programDataAccount = new PublicKey(process.env.DATA_ACCOUNT_PUBKEY as string);
  const transaction = new Transaction().add({
    keys: [
      { pubkey: programDataAccount, isSigner: false, isWritable: true },
    ],
    programId: new PublicKey(programId),
    // data: Buffer.from(serializedData, "base64"),
  });
  // const blockhash = (await connection.getLatestBlockhash('finalized'))
  //   .blockhash;
  // log('block hash => ', blockhash);
  // transaction.recentBlockhash = blockhash;
  // await sendAndConfirmRawTransactio(connection, transaction);
  await sendAndConfirmTransaction(connection, transaction, [payer]);
}