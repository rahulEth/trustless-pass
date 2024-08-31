import TrustPass from "/trust-pass.svg";
import "./App.css";
import {
  Web3DispatchContext,
  Web3ProviderContext,
} from "./contexts/Web3Context";
import { useContext } from "react";
import { Alert } from "@mui/material";
import { getMaskedAddress } from "./utils";

function App() {
  const { account, isLoading, error } = useContext(Web3ProviderContext) || {};
  const { connect } = useContext(Web3DispatchContext) || {};

  const onClickConnect = async () => {
    if (!!connect) {
      console.log("called");

      await connect();
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
        <button onClick={() => onClickConnect()} disabled={isLoading}>
          {account ? getMaskedAddress(account) : "Connect Wallet"}
        </button>
      </div>
    </>
  );
}

export default App;
