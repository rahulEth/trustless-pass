import { Card } from "@mui/material";
import MainBody from "../../components/MainBody";
import SaveCredForm from "../../components/SaveCredForm";

const SaveCredentials = () => {
  return (
    <MainBody>
      <h1 className="text-2xl font-semibold mb-4">Save Your Credentials</h1>
      <Card className="p-6 rounded-lg border border-sky-500">
        <SaveCredForm />
      </Card>
    </MainBody>
  );
};

export default SaveCredentials;
