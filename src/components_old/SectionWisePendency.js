import { useState, useEffect, useMemo } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Table, { SelectColumnFilter } from "../utils/Table";
import { BasicLoadingIcon } from "../utils/Icons";

const SectionWisePendency = () => {
  const [data, setData] = useState([]);
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchData() {
      setLoading(true);
      if (!fetching)
        await axios
          .get(`/cbillTadaLtcs/twControls/sectionwisePendency`)
          .then((response) => {
            setLoading(false);
            console.log("response>>" + response.data);
            //setSh3List(response.data);
            setData(response.data);
          })
          .catch((error) => {
            setLoading(false);
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Section",
        accessor: "sectionname",
        Filter: SelectColumnFilter,
      },

      {
        Header: "Bills Pending",
        accessor: "count",
      },
      {
        Header: "Oldest Date",
        accessor: "oldestDate",
      },
    ],
    [data]
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className=" ">
          <h1 className="text-xl font-semibold ml-4">
            TWING Section Task Wise Pendency
          </h1>
        </div>
        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-1/2 z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="mt-2 max-h-1 py-0 ml-0">
            <Table
              columns={columns}
              data={data}
              page={50}
              className="table-auto"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default withRouter(SectionWisePendency);
