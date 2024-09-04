import { useState } from "react";
import { FieldProps } from "../Field";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CopyBtn from "../CopyBtn";

const PasswordField = ({ name, value }: FieldProps) => {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="flex flex-col font-medium hover:bg-gray-200 rounded p-2">
      <div className="text-slate-500 text-sm">{name}</div>
      <div className="text-slate-900 text-base flex flex-row gap-1 items-center">
        <div className={`flex-grow ${!showPwd ? "password_field" : ""}`}>
          {value}
        </div>
        <IconButton onClick={() => setShowPwd(!showPwd)}>
          {!showPwd ? (
            <VisibilityOff className="!h-5 !w-auto" color="action" />
          ) : (
            <Visibility className="!h-5 !w-auto" color="action" />
          )}
        </IconButton>
        <CopyBtn data={value} />
      </div>
    </div>
  );
};

export default PasswordField;
