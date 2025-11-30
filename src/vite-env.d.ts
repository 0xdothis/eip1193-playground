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

interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

interface EthereumProvider {
  request: (args: RequestArguments) => Promise<unknown>;
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

interface ProviderRpcError extends Error {
  code: number;
  data?: unknown;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
