import { useState } from "react";
import CredDetailsCard, { CredDetails } from "../../components/CredDetailsCard";
import CredInfoCard from "../../components/CredInfoCard";
import MainBody from "../../components/MainBody";
import SearchForm from "../../components/SearchForm";
import { useQueryGetCredentials } from "../../api";
import Loading from "../../components/Loading";
import NoResultFound from "./assets/no-result.svg?react";
import SomethingWentWrong from "./assets/something-went-wrong.svg?react";
import ErrorCard from "./ErrorCard";

const CheckCredentials = () => {
  const [selectedCred, setSelectedCred] = useState<CredDetails>();

  const { isLoading, data, isError } = useQueryGetCredentials();

  const onSelectCred = (cred: CredDetails) => {
    setSelectedCred(selectedCred == cred ? undefined : cred);
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MainBody className="!col-span-full">
          <h1 className="text-4xl font-semibold mb-4">
            Check Your Credentials
          </h1>
          <SearchForm className="mb-6" />

          {isError ? (
            <ErrorCard>
              <SomethingWentWrong className="w-80 h-80 mx-auto" />
              <div className="text-center text-slate-500 flex flex-col gap-2">
                <div className="text-lg font-semibold">
                  Something Went Wrong!
                </div>
                <div className="text-sm font-semibold">Please Try Again</div>
              </div>
            </ErrorCard>
          ) : data?.length ? (
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-full md:col-span-3 flex flex-col gap-4">
                {data?.map((cred) => (
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
          ) : (
            <ErrorCard>
              <NoResultFound className="w-80 h-80 mx-auto" />
              <div className="text-center text-lg font-semibold text-slate-500">
                Results Not Found
              </div>
            </ErrorCard>
          )}
        </MainBody>
      )}
    </>
  );
};

export default CheckCredentials;
