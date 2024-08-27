import { Eip1193Provider } from "ethers";
import { ethers } from "ethers";

export const getSignerDetails = async (ethereum: Eip1193Provider) => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  return signer;
};

export const getConnectedAccountAddress = async (ethereum: Eip1193Provider) => {
  const signer = await getSignerDetails(ethereum);
  const accountAddress = await signer.getAddress();
  return accountAddress;
};

export const getMaskedAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(38)}`;
};
