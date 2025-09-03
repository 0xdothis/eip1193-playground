/// <reference types="vite/client" />

//
interface ProvideMessage {
  readonly type: string;
  readonly data: unknown;
}

// connected wallet chainId type
interface ProviderConnectionInfo {
  readonly chainId: string;
}

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (eventName: string, listeners: (...args: unknown[]) => void) => void;
  removeListener?: (
    eventName: string,
    listeners: (...args: unknown[]) => void,
  ) => void;
  isMetamask?: boolean;
  providers?: EthereumProvider[];
  chainId?: ProviderConnectionInfo;
}

interface ProviderMethods {
  methods: string[];
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
