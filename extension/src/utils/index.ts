import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from "ethers";

export const getSignerDetails = async (ethereum: MetaMaskInpageProvider) => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  return signer;
};

export const getConnectedAccountAddress = async (
  ethereum: MetaMaskInpageProvider
) => {
  const signer = await getSignerDetails(ethereum);
  const accountAddress = await signer.getAddress();
  return accountAddress;
};

export const getMaskedAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(38)}`;
};
