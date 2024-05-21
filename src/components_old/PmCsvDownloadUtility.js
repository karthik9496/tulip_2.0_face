import { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { BasicLoadingIcon } from "../utils/Icons";

const PmCsvDownloadUtility = () => {
  const [serverErrors, setServerErrors] = useState([]);

  const [me, setMe] = useState("");

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setMe(e.target.value);
  };

  const downloadCsv = () => {
    setLoading(true);
    async function generateCsv() {
      axios
        .get(`/pms/generateCsv?me=${me}`)
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          window.open(
            `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
          );
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    generateCsv();
  };

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900"
      style={loading ? { pointerEvents: "none", opacity: "0.8" } : {}}
    >
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className=" ">
          <h1 className="text-xl font-semibold ml-4">Download PM Csv</h1>
          <hr />
          <div className="flexContainer mt-2">
            <input
              type="text"
              name="search"
              placeholder="Month(mm/yyyy)"
              onChange={(e) => handleInputChange(e)}
              className="pl-2 ml-2 inputField flex-initial"
            />
            <button
              type="submit"
              onClick={downloadCsv}
              className="w-32 m-0 p-0"
            >
              Generate
            </button>
          </div>
          <div className="text-red-500">
            <i>
              **Download PM CSV Utility is only available for TSS and Account
              Section
            </i>
          </div>
        </div>
      </main>
      {loading ? (
        <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
          <p className="mr-2 text-2xl text-green-600">Generating File</p>
          <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default withRouter(PmCsvDownloadUtility);
