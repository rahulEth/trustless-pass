import { Card } from "@mui/material";

import SecurityFlag from "./assets/security-flag.svg?react";
import { useNavigate } from "react-router-dom";
import { ROUTING_PATH } from "../../constants";

const Home = () => {
  const navigate = useNavigate();

  const onClickSaveCredentials = () => {
    // TODO: Check login, if not show pop up
    navigate(ROUTING_PATH.SAVE_CREDS);
  };
  const onClickCheckCredentials = () => {
    // TODO: Check login, if not show pop up
    navigate(ROUTING_PATH.CHECK_CREDS);
  };
  return (
    <div className="col-span-full">
      <div className="flex flex-col md:flex-row items-stretch">
        <div className="basis-1/2">
          <SecurityFlag className="h-96 w-96" />
        </div>
        <div className="basis-1/2 text-3xl md:text-5xl p-4 text-center md:text-right">
          {" "}
          Secure Your Credentials with Precision
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 !bg-sky-100 p-6 -mx-6">
        <Card
          className="p-4 !bg-gradient-to-r from-cyan-500 to-blue-500 !text-white font-semibold cursor-pointer"
          onClick={onClickCheckCredentials}
        >
          Check Your Credentials
        </Card>
        <Card
          className="p-4 !bg-gradient-to-r from-cyan-500 to-blue-500 !text-white font-semibold cursor-pointer"
          onClick={onClickSaveCredentials}
        >
          Save Your Credentials
        </Card>
      </div>
    </div>
  );
};

export default Home;
