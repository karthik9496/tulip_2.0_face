/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const IrlaDebitCsv = () => {
  const [serverErrors, setServerErrors] = useState([]);

  const [me, setMe] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleInputChange = (e) => {
    setMe(e.target.value);
  };

  const generateCsv = () => {
    setDisabled(true);
    async function csvFile() {
      axios
        .get(`/ndcs/csv/irlaDebit/${me}`)
        .then((response) => {
          setDisabled(false);
          console.log(response.data);

          let fileList = response.data;
          fileList.map((file) =>
            window.open(`${process.env.REACT_APP_BASE_URL}/files/${file}`)
          );
        })
        .catch((error) => {
          setDisabled(false);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    csvFile();
  };

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900"
      style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className=" ">
          <h1 className="text-2xl font-semibold ml-4">IRLA Debit CSV</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder="Month(mmyyyy)"
              onChange={(e) => handleInputChange(e)}
              className="pl-2 -ml-2 inputField flex-initial"
            />
            <button
              type="submit"
              onClick={generateCsv}
              className="w-32 m-0 p-0"
            >
              Generate CSV
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(IrlaDebitCsv);
