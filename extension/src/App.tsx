/* eslint-disable @typescript-eslint/no-explicit-any */
import TrustPass from "/trust-pass.svg";
import "./App.css";
import useConnectWallet from "./hooks/useConnectWallet";
import createMetaMaskProvider from "metamask-extension-provider";

function App() {
  const { account, isLoading } = useConnectWallet();

  const onClickConnect = async () => {
    // const [tab] = await chrome.tabs.query({ active: true });
    const provider = createMetaMaskProvider();
    if (provider) {
      console.log("provider detected", provider.chainId);
      /* const eth = new Eth(provider)
      renderText('MetaMask provider detected.')
      eth.accounts()
      .then((accounts) => {
        renderText(`Detected MetaMask account ${accounts[0]}`)
      })
    
      provider.on('error', (error) => {
        if (error && error.includes('lost connection')) {
          renderText('MetaMask extension not detected.')
        }
      }) */
      provider.on("error", (error) => {
        console.log(error);
      });
    } else {
      console.log("MetaMask provider not detected.");
    }
    /* chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: async () => {
        console.log("ethereum: ");
        console.log("windows:", window);

        if ((window as any).ethereum) {
          try {
            const accounts = await (window as any).ethereum.request({
              method: "eth_requestAccounts",
            });
            console.log(accounts[0]);
          } catch (error) {
            console.error("Connection to MetaMask failed:", error);
          }
        } else {
          alert("Please install MetaMask!");
        }
      },
    }); */
  };

  return (
    <>
      <div>
        <img src={TrustPass} className="logo" alt="trust pass logo" />
      </div>
      <h1>Trust Pass</h1>
      <div className="card">
        <button onClick={() => onClickConnect()} disabled={isLoading}>
          {account ? getMaskedAddress(account) : "Connect Wallet"}
        </button>
      </div>
    </>
  );
}

export default App;

const getMaskedAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(38)}`;
};
