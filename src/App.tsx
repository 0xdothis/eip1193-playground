import React from "react";
import { Button } from "./components/ui/button";

//Declare a global Window interface to help clear window.ethereum error in the IDE
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

function App() {
  const [method, setMethod] = React.useState<string[]>([]);
  const [networkInfo, setNetworkInfo] = React.useState<string>("");

  // checks
  const isWindowEthereum = typeof window.ethereum !== "undefined";

  // A simple function to detect providers
  async function detectProviders() {
    if (isWindowEthereum) {
      const ethereum = window.ethereum as EthereumProvider;
      console.log("Ethereum provider detected");

      const methods = ["eth_accounts", "eth_chainId", "hello"];

      const results = Promise.all(
        methods.map((method) =>
          ethereum
            .request({ method })
            .then(() => `${method}: supported`)
            .catch(() => `${method}: Not supported`),
        ),
      );

      setMethod(await results);
    } else {
      console.error("No etherem provider detected");
    }
  }

  // FUnction to get chain ID
  async function getChainId() {
    if (isWindowEthereum) {
      const ethereum = window.ethereum as EthereumProvider;

      try {
        const id = Promise.resolve(
          ethereum
            .request({ method: "eth_chainId" })
            .then((chainId) => setNetworkInfo(chainId as string)),
        );

        return Number(id);
      } catch (err) {
        console.error(err, "ChainId doesn't exists");
      }
    }
  }
  return (
    <div className="max-w-[1024px] mx-auto font-mono px-4 py-5 mt-20">
      <h1 className="text-4xl font-bold">EIP 1193 Playground</h1>
      <p className="text-slate-500 tracking-wider ">
        A simple playground to understand the fundamentals
      </p>
      <p className="mt-10 space-y-3">
        Methods that was set by the developer on this provider:{" "}
        {method.map((data) => (
          <span
            key={crypto.randomUUID()}
            className="first:mr-2 text-md font-bold block max-w-fit  rounded-lg bg-slate-900 text-slate-300 p-4"
          >
            {data}
          </span>
        ))}
      </p>
      <p className="mt-5 text-2xl font-bold">
        ChainId of connected network:{" "}
        <span className="text-slate-500">{Number(networkInfo)}</span>
      </p>
      <div className="flex flex-row gap-8 mt-20">
        <Button
          className="mt-4 px-12 py-6 text-lg rounded-lg"
          onClick={detectProviders}
        >
          Check for providers methods
        </Button>
        <Button
          className="mt-4 px-12 py-6 text-lg rounded-lg"
          onClick={getChainId}
        >
          Get Network ChainId
        </Button>
      </div>
    </div>
  );
}

export default App;
