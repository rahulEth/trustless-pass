import { useMutation, useQuery } from "@tanstack/react-query";
import { CredType } from "../enums/CredTypeEnums";
import { CredDetails } from "../components/CredDetailsCard";
import { SaveCredFormProps } from "../components/SaveCredForm";

const MOCK_CREDS: CredDetails[] = [
  {
    url: "Amazon.com",
    username: "Test",
    type: CredType.SOCIAL,
    password: "Test@123",
  },
  {
    url: "Bank.com",
    username: "TestBank",
    type: CredType.BANKING,
    password: "Test@123",
  },
  {
    url: "Personal.com",
    username: "TestPersonal",
    type: CredType.PERSONAL,
    password: "Test@123",
  },
  {
    url: "other.com",
    username: "TestOther",
    type: CredType.OTHER,
    password: "Test@123",
  },
];

export const useQueryGetCredentials = () => {
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
};

export interface UseMutationSaveCredentialsRes {
  url: string;
  TrxHash: string;
  TrxHashUrl: string;
}

export const useMutationSaveCredentials = () => {
  const isError = false;
  return useMutation({
    mutationFn: (data: SaveCredFormProps) => {
      return new Promise<UseMutationSaveCredentialsRes>((resolve, reject) => {
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
