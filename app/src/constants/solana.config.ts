
import * as borsh from 'borsh';
import path from 'path';

import { ExecutionAccount } from '@/domain/accounts/execution-account.model';


/**
 * Path to program files
 */
export const PROGRAM_PATH = path.resolve('../smartwatch/dist/program');

/**
 * Path to program shared object file which should be deployed on chain.
 * This file is created when running either:
 *   - `npm run build:program-c`
 *   - `npm run build:program-rust`
 */
export const PROGRAM_SO_PATH = path.join(PROGRAM_PATH, 'smartwatch.so');

/**
 * Path to the keypair of the deployed program.
 * This file is created when running `solana program deploy dist/program/smartwatch.so`
 */
export const PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, 'smartwatch-keypair.json');


/**
 * Borsh schema definition for greeting accounts
 */
const ExecutionSchema = new Map([
  [ExecutionAccount, { kind: 'struct', fields: [['counter', 'u32']] }],
]);

/**
* The expected size of each execution account.
*/
export const EXECUTION_SIZE = borsh.serialize(
  ExecutionSchema,
  new ExecutionAccount(),
).length;

export const PAYMENT_RECIPIENT_PUBLIC_KEY = "7CTVE1vojWjxfz88ukVgF7DJbzdsh9jdm3By4MvQGPTQ"
