import { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import axios from "axios";
import { BasicLoadingIcon } from "../utils/Icons";

const IrlaDownloadAllCsv = () => {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState();

  const onError = (errors, e) => console.log(errors, e);

  const generateCsv = () => {
    let saving = false;
    setLoading(true);
    async function csvFile() {
      if (!saving)
        axios
          .get(`/ndcs/download/irlaCsv/all`)
          .then((response) => {
            setLoading(false);
            console.log(response.data);
            console.log("List of CSV Files", response.data);
            let fileList = response.data;
            fileList.map((file) =>
              window.open(`${process.env.REACT_APP_BASE_URL}/files/${file}`)
            );
          })
          .catch((error) => {
            console.log(
              error.response.status + " : " + error.response.statusText
            );
            setLoading(false);
            setServerErrors(
              error.response.status +
                " : " +
                error.response.statusText +
                ". Please Contact EDP."
            );
          });
    }
    csvFile();

    return () => {
      saving = true;
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <main
        className="w-96 mx-auto px-4 sm:px-6 lg:px-8 pt-4 shadow-md p-4"
        style={loading ? { pointerEvents: "none", opacity: "0.7" } : {}}
      >
        <div className=" ">
          <h1 className="text-xl text-black ">
            Download All IRLA Csv -- 5 Files
          </h1>
          <h6 className=" ">To be processed in Sulekha Closing</h6>
          <p className="text-red-500">{serverErrors}</p>
          <div className="flexContainer p-0">
            <button
              type="submit"
              onClick={generateCsv}
              className="w-32 mt-8 p-0"
            >
              Generate CSV
            </button>
          </div>
        </div>
      </main>

      {loading ? (
        <div className="flex justify-center items-center fixed top-1/3 w-full z-50">
          <p className="mr-2 text-2xl text-green-600">Generating Files</p>
          <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default withRouter(IrlaDownloadAllCsv);
