/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const useConnectWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    setIsLoading(true);
    const ethereum = (window as any).ethereum;
    // Connect wallet
    if (typeof ethereum !== "undefined") {
      try {
        // Request account access
        await ethereum.request({
          method: "eth_requestAccounts",
        });

        // Create ethers provider and get accounts
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const accountAddress = await signer.getAddress();
        setAccount(accountAddress);
      } catch (error) {
        console.error(error);
        setError("Access denied");
      }
    } else {
      setError(
        "MetaMask is not installed. Please install Metamask to use this app."
      );
    }
    setIsLoading(false);
  };

  // Handles change in the connected account
  useEffect(() => {
    if (typeof (window as any).ethereum !== "undefined") {
      (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts.length > 0 ? accounts[0] : null);
      });
    }
  }, []);

  return {
    connect,
    account,
    error,
    isLoading,
  };
};

export default useConnectWallet;
