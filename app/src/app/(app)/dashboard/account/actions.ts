/* eslint-disable no-console */
'use server'


import { PublicKey } from "@solana/web3.js";

import log from "@/lib/helpers/logger.helper";
import { checkProgram, establishConnection, establishPayer, getProgramInfos } from "@/lib/helpers/solana.helper";

import { AccountFormValues } from "@/app/(app)/dashboard/account/account-form";

export async function getProgramData() {
  return getProgramInfos();
}

export async function submitAccountForm(wallet: PublicKey | null, data: AccountFormValues) {
  log("Logging data...")
  log(wallet)
  log(data)
  log("Connecting to blockchain...");
  // Establish connection to the cluster
  const connection = await establishConnection();

  log("Establishing payer...")
  // Determine who pays for the fees
  const payer = await establishPayer(connection);


  // Check if the program has been deployed
  return await checkProgram(connection, payer);
}