'use client';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { AnchorProvider } from '@coral-xyz/anchor';
import { WalletError } from '@solana/wallet-adapter-base';
import {
  AnchorWallet,
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { ReactNode, useCallback, useMemo } from 'react';

import {
  ClusterNetwork,
  toWalletAdapterNetwork,
  useCluster,
} from './cluster-data-access';

require('@solana/wallet-adapter-react-ui/styles.css');

export const WalletButton = WalletMultiButton;

export function SolanaProvider({ children }: { children: ReactNode }) {
  const { cluster } = useCluster();
  const endpoint = useMemo(() => cluster.endpoint, [cluster]);
  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter({
        // network: toWalletAdapterNetwork(cluster.network),
        network: toWalletAdapterNetwork(ClusterNetwork.Devnet),
      }),
    ],
    [cluster]
  );

  const onError = useCallback((error: WalletError) => {
    console.log('solana wallet error');
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function useAnchorProvider() {
  const { connection } = useConnection();
  const wallet = useWallet();

  return new AnchorProvider(connection, wallet as AnchorWallet, {
    commitment: 'confirmed',
  });
}
