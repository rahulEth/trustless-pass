import { AccountCircle, Http } from "@mui/icons-material";
import {
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import PasswordInput from "../../components/PasswordInput";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { ROUTING_PATH } from "../../constants";
import MainBody from "../../components/MainBody";
import { useState } from "react";
import { CredType } from "../../enums/CredTypeEnums";

const SaveCredentials = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

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
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              onChange={handleChange}
              label="type"
            >
              <MenuItem value={CredType.SOCIAL}>Social</MenuItem>
              <MenuItem value={CredType.PERSONAL}>Personal</MenuItem>
              <MenuItem value={CredType.BANKING}>Banking</MenuItem>
              <MenuItem value={CredType.OTHER}>Other</MenuItem>
            </Select>
          </FormControl>
          <CustomButton className="!rounded-full !text-lg !py-3" type="submit">
            Submit
          </CustomButton>
          <CustomButton
            variant="outlined"
            className="!rounded-full !text-lg !py-3"
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
