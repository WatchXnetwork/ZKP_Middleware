import { BaseWalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function CustomWalletMultiButton() {
  return (
    <BaseWalletMultiButton
      className='bg-red-900'
      labels={{
        'change-wallet': 'Change wallet',
        connecting: 'Connecting ...',
        'copy-address': 'Copy address',
        copied: 'Copied',
        disconnect: 'Disconnect',
        'has-wallet': 'Connect',
        'no-wallet': 'Select Wallet',
      }}
    />
  );
}
