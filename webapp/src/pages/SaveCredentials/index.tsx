import { Alert, Card, Snackbar } from "@mui/material";
import MainBody from "../../components/MainBody";
import SaveCredForm, { SaveCredFormProps } from "../../components/SaveCredForm";
import { useMutationSaveCredentials } from "../../api";
import { useEffect, useState } from "react";
import useModal from "../../hooks/useModal";
import SuccessfulTrxModal from "../../components/SuccessfulTrxModal";

const SaveCredentials = () => {
  const {
    mutate,
    isPending,
    status: mutateStatus,
    error: mutateError,
    data: mutateData,
  } = useMutationSaveCredentials();
  const [responseError, setResponseError] = useState<string>("");
  const { open, handleOpen, handleClose } = useModal();

  useEffect(() => {
    if (mutateStatus === "error") {
      console.log("mutateError: ", mutateError);

      setResponseError(mutateError.message);
      return;
    }
    setResponseError("");

    if (mutateStatus === "success" && !!mutateData) {
      console.log("data:", mutateData);
      handleOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutateStatus, mutateData, mutateError]);

  const onSubmit = (data: SaveCredFormProps) => {
    mutate(data);
  };

  const handleCloseError = () => setResponseError("");

  return (
    <MainBody>
      <h1 className="text-2xl font-semibold mb-4">Save Your Credentials</h1>
      <Card className="p-8 rounded-lg border border-sky-500">
        <SaveCredForm isLoading={isPending} onSubmitCred={onSubmit} />
      </Card>
      <Snackbar
        open={!!responseError}
        autoHideDuration={5000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {responseError}
        </Alert>
      </Snackbar>
      <SuccessfulTrxModal
        open={open}
        handleClose={handleClose}
        data={mutateData}
      />
    </MainBody>
  );
};

export default SaveCredentials;
