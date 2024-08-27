import { AccountBalanceWallet } from "@mui/icons-material";
import useConnectWallet from "../../hooks/useConnectWallet";
import CustomButton from "../CustomButton";
import { getMaskedAddress } from "../../utils";

const ConnectWallet = () => {
  const { connect, account, isLoading } = useConnectWallet();

  console.log("account: ", account);

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
