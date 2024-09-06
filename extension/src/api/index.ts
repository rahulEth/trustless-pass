import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const apiClient = axios.create({
  baseURL: " http://localhost:3000",
});

export enum CredType {
  BANKING = "banking",
  PERSONAL = "personal",
  SOCIAL = "social",
  OTHER = "other",
}

export interface UseMutationGetCredentials {
  appLink: string;
  address: string;
}

export interface IpfsHashData {
  path: string;
}

export interface UseMutationGetCredentialsRes {
  _id: string;
  publicKey: string;
  address: string;
  ipfsHash: IpfsHashData[];
  encryptedUser: string;
  encryptedPassword: string;
  appLink: string;
  type: CredType;
}

export const useMutationGetCredentials = () => {
  return useMutation({
    mutationFn: async ({ appLink, address }: UseMutationGetCredentials) => {
      const response = await apiClient.get("/api/getEncryptedCred", {
        params: { appLink, address },
      });
      console.log("response: ", response.data);

      return response.data as UseMutationGetCredentialsRes;
    },
    mutationKey: ["get-credentials"],
  });
};
