import { Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import { NextResponse } from 'next/server';

import log from '@/lib/helpers/logger.helper';
import { establishConnection } from '@/lib/helpers/solana.helper';

import { HealthData } from '@/domain/data/health-data.model';

export async function GET() {
  log("Connecting to blockchain...");
  // Establish connection to the cluster
  const connection = await establishConnection();


  /*
  Get our program's public key
  */
  log("Getting program infos");
  const secretKey = Uint8Array.from(JSON.parse(process.env.PROGRAM_KEY_PAIR as string));
  // const programKeypair = Keypair.fromSecretKey(secretKey);
  const programId: PublicKey = new PublicKey(process.env.PROGRAM_ID as string);
  // const programKeypair = Keypair.fromSecretKey(secretKey);
  // const programId: PublicKey = programKeypair.publicKey;

  /*
 Generate an account (keypair) to transact with our program
 */
  const triggerKeypair = Keypair.fromSecretKey(secretKey);//Keypair.generate();
  const airdropRequest = await connection.requestAirdrop(
    triggerKeypair.publicKey,
    LAMPORTS_PER_SOL,
  );
  await connection.confirmTransaction(airdropRequest);


  /*
Conduct a transaction with our program
*/
  log('--Pinging Program ', programId.toBase58());
  const data = [
    {
      operation_type: "insert",
      health_data_list: [
        new HealthData({ id: triggerKeypair.publicKey.toBase58(), first_name: "first_name", last_name: "last_name", blood_oxygen: 20, pulse: 1 })
      ]
    }
  ]
  const serializedData = Buffer.from(JSON.stringify(data));
  const transaction = new Transaction().add({
    keys: [
      { pubkey: triggerKeypair.publicKey, isSigner: false, isWritable: true },
    ],
    programId,
    data: serializedData,
  });
  await sendAndConfirmTransaction(connection, transaction, [triggerKeypair]);

  return NextResponse.json({
    data: {
      status: "Success"
    }
  });
}
