/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Table, { SelectColumnFilter } from "../utils/Table";
import { BasicLoadingIcon } from "../utils/Icons";

const CmpGeneration = () => {
  let { id } = useParams();

  let history = useHistory();

  const [data, setData] = useState([]);
  const [serverErrors, setServerErrors] = useState();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [lightTheme, setLightTheme] = useState(true);
  const [generatingCmp, setGeneratingCmp] = useState(false);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchData() {
      setLoading(true);
      console.log("useEWffect");
      if (!fetching)
        //console.log(secId);
        await axios
          .get(`/schedule3s/cmpGen`)
          .then((response) => {
            //console.log("response>>" + response.data);
            //setSh3List(response.data);
            setData(response.data);
            if (!unmounted) {
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(
              error.response.status + " : " + error.response.statusText
            );
            setServerErrors(
              error.response.status +
                " : " +
                error.response.statusText +
                ". Please Contact EDP."
            );
            setLoading(false);
          });
    }
    fetchData();

    return () => {
      fetching = true;
      unmounted = true;
    };
  }, []);

  const handleCheckBox = (index) => (e) => {
    console.log(e.target.checked);
    let item = data[index];

    item["select"] = e.target.checked;
    let newData = [...data];
    newData[index] = item;
    setData(newData);
    //	console.log(data);
  };

  const updateCheckBoxAll = (e) => {
    let newData = [...data];
    for (var k in newData) {
      newData[k].select = e.target.checked;
    }
    setData(newData);
  };

  const createCmpFile = () => {
    if (disabled) return;
    //console.log(data);

    setDisabled(true);
    let saving = false;
    //console.log(id);
    async function cmpGen() {
      setLoading(true);
      setGeneratingCmp(true);
      if (!saving)
        axios
          .put("/schedule3s/0/generateCmp", data)
          .then((response) => {
            const url = window.open(
              `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
            );
            setData([]);
            setDisabled(false);
            setLoading(false);
            setGeneratingCmp(false);
          })
          .catch((error) => {
            console.log(
              error.response.status + " : " + error.response.statusText
            );
            setServerErrors(
              error.response.status +
                " : " +
                error.response.statusText +
                ". Please Contact EDP."
            );
            setLoading(false);
            setGeneratingCmp(false);
          });
    }
    cmpGen();

    return () => {
      saving = true;
    };
  };

  const columns = useMemo(
    () => [
      {
        Header: <input type="checkbox" onChange={updateCheckBoxAll} />,

        accessor: "select",
        Cell: ({ row }) => (
          <div>
            <input
              type="checkbox"
              onChange={handleCheckBox(row.index)}
              checked={data[row.index]["select"]}
            />
          </div>
        ),
      },
      {
        Header: "Section Code",
        accessor: "sectionCode",
      },
      {
        Header: "Section Name",
        accessor: "sectionName",
      },
      {
        Header: "DP Sheet No",
        accessor: "dpSheetNo",
      },

      {
        Header: "Dp Sheet Date",
        accessor: "dpSheetDate",
      },
      {
        Header: "Dp Sheet Amt",
        accessor: "dpSheetAmount",
      },
      {
        Header: "Dps Month",
        accessor: "dpsMonth",
      },
    ],
    [data]
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className={lightTheme ? "theme-light" : "theme-dark"}>
          <h1 className="text-xl font-semibold ml-4">CMP File Generation</h1>
          <p className="text-red-500 font-semibold ml-4">{serverErrors}</p>
          <div
            style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
          >
            <div className=" ml-2 flex flex-wrap content-start ...">
              <div>
                <button
                  type="submit"
                  onClick={createCmpFile}
                  className=" mt-3  w-40  "
                >
                  Generate CMP File
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center fixed top-1/4 w-full z-50 left-0">
                <p className="mr-2 text-2xl text-green-600">
                  {generatingCmp ? (
                    <p className="text-blue-500">Generating CMP File</p>
                  ) : (
                    "Fetching Data"
                  )}
                </p>
                <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
              </div>
            ) : (
              <div className="-mt-2 max-h-1 py-0 ml-0">
                <Table columns={columns} data={data} className="table-auto" />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default withRouter(CmpGeneration);
