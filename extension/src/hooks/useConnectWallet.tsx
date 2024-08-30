/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getConnectedAccountAddress } from "../utils";
import { Eip1193Provider } from "ethers";

// import createMetaMaskProvider from "metamask-extension-provider";

const useConnectWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectjs = async () => {
    /* const provider = createMetaMaskProvider();
    if (provider) {
      console.log("provider detected", provider);
      const eth = new Eth(provider)
      renderText('MetaMask provider detected.')
      eth.accounts()
      .then((accounts) => {
        renderText(`Detected MetaMask account ${accounts[0]}`)
      })
    
      provider.on('error', (error) => {
        if (error && error.includes('lost connection')) {
          renderText('MetaMask extension not detected.')
        }
      })
    } else {
      console.log("MetaMask provider not detected.");
    } */
    if ((window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Connection to MetaMask failed:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const connect = async () => {
    setIsLoading(true);
    const ethereum = (window as any).ethereum as Eip1193Provider;
    console.log("ethereum: ", ethereum);

    // Connect wallet
    if (typeof ethereum !== "undefined") {
      try {
        // Create ethers provider and get accounts
        const accountAddress = await getConnectedAccountAddress(ethereum);
        setAccount(accountAddress);
      } catch (error) {
        console.error(error);
        setError("Access denied");
      }
    } else {
      setError(
        "MetaMask is not installed. Please install Metamask to use this app."
      );
      console.error(
        "MetaMask is not installed. Please install Metamask to use this app."
      );
    }
    setIsLoading(false);
  };

  const getConnectedWallet = async () => {
    const _ethereum = (window as any).ethereum;
    if (_ethereum) {
      try {
        const addressArray = await _ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          const accountAddress = await getConnectedAccountAddress(_ethereum);
          setAccount(accountAddress);
        } else {
          setAccount(null);
        }
      } catch (err) {
        console.error(err);
        setError("Access denied");
      }
    } else {
      setError(
        "MetaMask is not installed. Please install Metamask to use this app."
      );
      console.error(
        "MetaMask is not installed. Please install Metamask to use this app."
      );
    }
  };

  const getChangedAccount = async (accounts: string[]) => {
    const _ethereum = (window as any).ethereum;
    if (accounts.length > 0) {
      const accountAddress = await getConnectedAccountAddress(_ethereum);
      setAccount(accountAddress);
    } else {
      setAccount(null);
    }
  };

  useEffect(() => {
    console.log("called!");
    getConnectedWallet();
    // Handles change in the connected account
    if (typeof (window as any).ethereum !== "undefined") {
      (window as any).ethereum.on("accountsChanged", getChangedAccount);
    }
  }, []);

  return {
    connect,
    connectjs,
    account,
    error,
    isLoading,
  };
};

export default useConnectWallet;
