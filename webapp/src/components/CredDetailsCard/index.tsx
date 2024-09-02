import { Card, IconButton } from "@mui/material";
import CredIcon from "../CredIcon";
import { CredType } from "../../enums/CredTypeEnums";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import "./style.css";
import CopyBtn from "./CopyBtn";
export interface CredDetails {
  url: string;
  username: string;
  type: CredType;
  password: string;
}

export interface CredDetailsCardProps {
  creds?: CredDetails;
  onCardClick?: () => void;
  className?: string;
}

export interface FieldProps {
  name: string;
  value: string;
}

const Field = ({ name, value }: FieldProps) => {
  return (
    <div className="flex flex-col font-medium hover:bg-gray-200 rounded p-2">
      <div className="text-slate-500 text-sm">{name}</div>
      <div className="text-slate-900 text-base">{value}</div>
    </div>
  );
};

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

const CredDetailsCard = ({ creds, className = "" }: CredDetailsCardProps) => {
  return (
    <Card className={`cursor-pointer p-6 w-full ${className}`}>
      {!!creds ? (
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex flex-row items-center gap-4 p-2">
            <CredIcon type={creds.type} />
            <div className="text-slate-900 font-bold text-lg">{creds.url}</div>
          </div>
          <Field name="Username" value={creds.username} />
          <PasswordField name="Password" value={creds.password} />
          <Field name="Website" value={creds.url} />
        </div>
      ) : (
        <div className="text-center text-slate-500 min-h-72">
          Please Select Creds to see details
        </div>
      )}
    </Card>
  );
};

export default CredDetailsCard;
