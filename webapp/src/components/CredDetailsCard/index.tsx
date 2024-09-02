import { Card } from "@mui/material";
import { CredType } from "../../enums/CredTypeEnums";
import CredIcon from "../CredIcon";
import Field from "./components/Field";
import PasswordField from "./components/PasswordField";
import "./style.css";
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
