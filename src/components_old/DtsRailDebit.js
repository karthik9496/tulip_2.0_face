import { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const DtsRailDebit = () => {
  const [serverErrors, setServerErrors] = useState([]);

  const [me, setMe] = useState("");

  const [disabled, setDisabled] = useState(false);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setMe(e.target.value);
  };

  const dtsRailDebit = () => {
    setDisabled(true);
    async function generateCsv() {
      axios
        .get(`/dtsRailTransactions/dtsRailDebit/download?me=${me}`)
        .then((response) => {
          setDisabled(false);
          console.log(response.data);
          window.open(
            `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
          );
        })
        .catch((error) => {
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    generateCsv();
  };

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900"
      style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className=" ">
          <h1 className="text-xl font-semibold ml-4">Download DTS Debit Csv</h1>
		  <hr/>
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
              onClick={dtsRailDebit}
              className="w-32 m-0 p-0"
            >
              Generate
            </button>
          </div>
          <div className="text-red-500"><i>**Utility for EDP only</i></div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(DtsRailDebit);
