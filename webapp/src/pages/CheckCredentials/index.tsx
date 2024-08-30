import { useState } from "react";
import CredDetailsCard, { CredDetails } from "../../components/CredDetailsCard";
import CredInfoCard from "../../components/CredInfoCard";
import MainBody from "../../components/MainBody";
import SearchForm from "../../components/SearchForm";
import { CredType } from "../../enums/CredTypeEnums";

const MOCK_CREDS: CredDetails[] = [
  {
    url: "Amazon.com",
    username: "Test",
    type: CredType.SOCIAL,
    password: "Test@123",
  },
  {
    url: "Bank.com",
    username: "TestBank",
    type: CredType.BANKING,
    password: "Test@123",
  },
  {
    url: "Personal.com",
    username: "TestPersonal",
    type: CredType.PERSONAL,
    password: "Test@123",
  },
  {
    url: "other.com",
    username: "TestOther",
    type: CredType.OTHER,
    password: "Test@123",
  },
];

const CheckCredentials = () => {
  const [selectedCred, setSelectedCred] = useState<CredDetails>();

  const onSelectCred = (cred: CredDetails) => {
    setSelectedCred(selectedCred == cred ? undefined : cred);
  };
  return (
    <MainBody className="!col-span-full">
      <h1 className="text-4xl font-semibold mb-4">Check Your Credentials</h1>
      <SearchForm className="mb-6" />

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-full md:col-span-3 flex flex-col gap-4">
          {MOCK_CREDS.map((cred) => (
            <CredInfoCard
              {...cred}
              onCardClick={() => onSelectCred(cred)}
              className={`${
                selectedCred == cred ? "outline outline-blue-500/50" : ""
              }`}
            />
          ))}
        </div>
        <div className="hidden md:!col-span-2 md:!block">
          <CredDetailsCard creds={selectedCred} />
        </div>
      </div>
    </MainBody>
  );
};

export default CheckCredentials;
