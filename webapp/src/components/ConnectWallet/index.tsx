import { AccountBalanceWallet } from "@mui/icons-material";
import useConnectWallet from "../../hooks/useConnectWallet";
import CustomButton from "../CustomButton";

const ConnectWallet = () => {
  const { connect, account, isLoading } = useConnectWallet();

  return (
    <>
      <CustomButton
        startIcon={<AccountBalanceWallet />}
        onClick={connect}
        disabled={isLoading}
      >
        {account ? getMaskedAddress(account) : "Connect Wallet"}
      </CustomButton>
    </>
  );
};

export default ConnectWallet;

const getMaskedAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(38)}`;
};
