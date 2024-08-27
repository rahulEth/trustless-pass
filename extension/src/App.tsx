import TrustPass from "/trust-pass.svg";
import "./App.css";
import useConnectWallet from "./hooks/useConnectWallet";

function App() {
  const { connect, account, isLoading } = useConnectWallet();

  return (
    <>
      <div>
        <img src={TrustPass} className="logo" alt="trust pass logo" />
      </div>
      <h1>Trust Pass</h1>
      <div className="card">
        <button onClick={connect} disabled={isLoading}>
          {account ? getMaskedAddress(account) : "Connect Wallet"}
        </button>
      </div>
    </>
  );
}

export default App;

const getMaskedAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(38)}`;
};
