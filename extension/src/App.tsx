import TrustPass from "/trust-pass.svg";
import "./App.css";
import {
  Web3DispatchContext,
  Web3ProviderContext,
} from "./contexts/Web3Context";
import { useContext } from "react";
import { Alert } from "@mui/material";
import { getMaskedAddress } from "./utils";
import { useMutationGetCredentials } from "./api";

function App() {
  const { account, isLoading, error } = useContext(Web3ProviderContext) || {};
  const { connect } = useContext(Web3DispatchContext) || {};
  const { mutate, isPending } = useMutationGetCredentials();

  const onClickConnect = async () => {
    if (!!connect) {
      console.log("called");

      await connect();
    }
  };

  const onCheckCred = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    console.log("active url: ", tab.url);
    if (!!tab.url && !!account) {
      const url = new URL(tab.url);
      const appLink = url.hostname;
      console.log("appLink: ", appLink);
      mutate({ appLink, address: account });
    }
  };

  return (
    <>
      <div>
        <img src={TrustPass} className="logo mx-auto" alt="trust pass logo" />
      </div>
      <h1 className="text-3xl font-semibold">Trust Pass</h1>
      <div className="card">
        {!!error && (
          <Alert severity="error" className="mb-2">
            {error}
          </Alert>
        )}
        <button
          onClick={() => onClickConnect()}
          disabled={isLoading || isPending}
        >
          {account ? getMaskedAddress(account) : "Connect Wallet"}
        </button>
        <button onClick={() => onCheckCred()} disabled={isLoading || isPending}>
          Check Cred for this Tab
        </button>
      </div>
    </>
  );
}

export default App;
