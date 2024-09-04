import { useMutation, useQuery } from "@tanstack/react-query";
import { CredType } from "../enums/CredTypeEnums";
import { SaveCredFormProps } from "../components/SaveCredForm";
import axios from "axios";
import { AES } from "crypto-js";
import { BrowserProvider } from "ethers";
import { getSignerDetails } from "../utils";

const apiClient = axios.create({
  baseURL: " http://localhost:3000/api",
});

/* export const useQueryGetCredentials = () => {
  const isEmpty = false;
  const isError = false;
  return useQuery({
    queryFn: async () => {
      return new Promise<CredDetails[]>((resolve, reject) => {
        setTimeout(
          () => (isError ? reject() : resolve(isEmpty ? [] : MOCK_CREDS)),
          1000
        );
      });
    },
    queryKey: ["get-credentials"],
  });
}; */

export interface UseQueryGetCredentialsByType {
  type: CredType | "all";
  address: string;
}

export interface IpfsHashData {
  path: string;
}
export interface UseQueryGetCredentialsByTypeRes {
  _id: string;
  publicKey: string;
  address: string;
  ipfsHash: IpfsHashData[];
  encryptedUser: string;
  encryptedPassword: string;
  appLink: string;
  type: CredType;
}
export const useQueryGetCredentialsByType = ({
  type,
  address,
}: UseQueryGetCredentialsByType) => {
  return useQuery({
    queryFn: async () => {
      const response = await apiClient.get("/getEncryptedCred", {
        params: { type, address },
      });
      console.log("response: ", response.data);

      return response.data as UseQueryGetCredentialsByTypeRes[];
    },
    queryKey: ["get-credentials-by-type", type, address],
  });
};

export interface UseMutationSaveCredentialsRes {
  url: string;
  TrxHash: string;
  TrxHashUrl: string;
}

export interface UseMutationSaveCredentials extends SaveCredFormProps {
  provider: BrowserProvider;
  address: string;
}
export const useMutationSaveCredentials = () => {
  const isError = false;
  return useMutation({
    mutationFn: async (data: UseMutationSaveCredentials) => {
      const { url, username, password, type, provider, address } = data;
      const signer = await getSignerDetails(provider);
      const signature = await signer.signMessage(data.url);
      console.log("sign: ", signature);
      const encryptedUser = AES.encrypt(username, signature);
      const encryptedPassword = AES.encrypt(password, signature);
      const encryptedappLink = AES.encrypt(url, signature);
      const response = await apiClient.get("/saveCred", {
        data: {
          publicKey: address,
          address: address,
          appLink: url,
          encryptedUser,
          encryptedPassword,
          encryptedappLink,
          type: type,
        },
      });
      console.log("response: ", response.data);
      return new Promise<UseMutationSaveCredentialsRes>((resolve, reject) => {
        const cipherText = AES.encrypt(data.password, data.username);
        console.log("cipherText: ", cipherText.toString());
        setTimeout(
          () =>
            isError
              ? reject(new Error("Transaction Failed!"))
              : resolve({
                  url: data.url,
                  TrxHash:
                    "0x8bd841fabfbaa599c15c8a1eb33a26a87bbb557ab94e79725699660648a530f1",
                  TrxHashUrl:
                    "https://etherscan.io/tx/0x8bd841fabfbaa599c15c8a1eb33a26a87bbb557ab94e79725699660648a530f1",
                }),
          1000
        );
      });
    },
    mutationKey: ["save-credentials"],
  });
};
