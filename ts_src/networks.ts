// https://en.bitcoin.it/wiki/List_of_address_prefixes
// Dogecoin BIP32 is a proposed standard: https://bitcointalk.org/index.php?topic=409731
export interface Network {
  messagePrefix: string;
  bech32: string;
  bip32: Bip32;
  pubKeyHash: number;
  scriptHash: number;
  wif: number;
}

interface Bip32 {
  public: number;
  private: number;
}

export const junkcoin: Network = {
  messagePrefix: 'Junkcoin Signed Message:\n',
  bech32: 'jkc',
  bip32: {
    public: 0x0488b21e,  // Standard BIP32 public prefix
    private: 0x0488ade4, // Standard BIP32 private prefix
  },
  pubKeyHash: 0x10, // 16 (0x10) from chainparams
  scriptHash: 0x05, // 5 (0x05) from chainparams
  wif: 0x90, // 144 (0x90) from chainparams
};
