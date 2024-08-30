import { AccountCircle, Http } from "@mui/icons-material";
import { Card, InputAdornment, TextField } from "@mui/material";
import PasswordInput from "../../components/PasswordInput";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { ROUTING_PATH } from "../../constants";
import MainBody from "../../components/MainBody";

const SaveCredentials = () => {
  const navigate = useNavigate();
  return (
    <MainBody>
      <h1 className="text-2xl font-semibold mb-4">Save Your Credentials</h1>
      <Card className="p-6 rounded-lg border border-sky-500">
        <div className="flex flex-col gap-4">
          <TextField
            id="url"
            label="Website URL"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Http />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            type="url"
          />
          <TextField
            id="username"
            label="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            type="text"
          />
          <PasswordInput id="password" label="Password" />
          <CustomButton className="!rounded-full !text-lg">Submit</CustomButton>
          <CustomButton
            variant="outlined"
            className="!rounded-full !text-lg"
            onClick={() => navigate(ROUTING_PATH.HOME)}
          >
            Back to Home
          </CustomButton>
        </div>
      </Card>
    </MainBody>
  );
};

export default SaveCredentials;
