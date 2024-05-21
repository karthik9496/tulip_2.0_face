/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import TablePage, { SelectColumnFilter } from "../utils/TablePage";

const schema = yup.object({});

const DakListEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  let { id } = useParams();
  //console.log(id);

  let history = useHistory();

  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});

  const [dakList, setDakList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [mesg, setMesg] = useState();

  const [key, setKey] = useState("Page1");
  const [disabled, setDisabled] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchData() {
      if (!fetching)
        //console.log(secId);
        await axios
          .get(`/daks/dakLists`)
          .then((response) => {
            //console.log("response>>" + response.data);
            setDakList(response.data);

            if (!unmounted) {
              setLoading(false);
            }
          })
          .catch((error) => {
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

  const createTopList = () => {
    if (disabled) return;

    setDisabled(true);

    axios.put("/daks/generateDakList", dakList).then((response) => {
      //const url = window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);

      const url = window.open(
        `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
      );
      //history.push("/daks/view/"+response.data);
      //history.replace({pathname:'/daks/new/'+response.data});

      setDakList([]);
    });
  };
  const onSubmit = (data, event) => {
    event.preventDefault();
    data = dakList;
    console.log(data);
    console.log("data id--------------" + data.id);

    axios
      .put("/daks/generateDakList", data)
      .then((response) => {
        console.log(
          "reponse status--------------" +
            response.status +
            "--" +
            response.statusText +
            "----" +
            "-h--" +
            response.headers +
            "--" +
            response.data
        );
        if (response.status === 200) {
          setMesg(response.data);
          setDakList([]);
          //history.push("/daks/view/"+response.data);
          //history.replace({pathname:'/daks/new/'+response.data});
        }
      })
      .catch((error) => {
        //console.log(error.response.data);
        console.log("response--------" + error.response.status);
        if (error.response.status !== 200) history.push("/daks");
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data);
        else setServerErrors(error);
      });

    //history.push("/daks");
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleCheckBox = (index) => (e) => {
    dakList[index].select = e.target.checked;
  };
  const updateCheckBox = (e) => {
    if (e.target.checked) return true;
    return false;
  };

  const updateCheckBoxAll = (e) => {
    let newData = [...dakList];
    for (var k in newData) {
      newData[k].select = e.target.checked;
    }
    setDakList(newData);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    //	console.log("handle input change");
  };

  const ShowTopList = () => {
    const handleCallBack = (pp) => {
      console.log(pp);
      setPage(pp);
    };

    //pcdao added below method
    const handlePageSize = (pp) => {
      console.log(pp);
      setPageSize(pp);
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
                checked={dakList[row.index]["select"]}
              />
            </div>
          ),
        },
        {
          Header: "Sl.No",
          Cell: ({ row }) => <div>{row.index + 1}</div>,
        },
        {
          Header: "DakId",
          accessor: "dakidNo",
        },

        {
          Header: "section",
          accessor: "section.sectionName",
        },
        {
          Header: "DakType",
          accessor: "dakType.description",
        },
        {
          Header: "RefNo",
          accessor: "referenceNo",
        },
        {
          Header: "Reference Date",
          accessor: "referenceDate",
        },
      ],
      [dakList]
    );

    return (
      <div className="min-h-screen bg-green-100 text-gray-700">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className="-mt-2 max-h-1 py-0 ml-0">
            <TablePage
              columns={columns}
              data={dakList}
              newpage={page}
              parentCallback={handleCallBack}
              newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}
              className="table-auto"
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className=" ">
          <h1 className="text-xl font-semibold ml-4">Top List Generation</h1>
          <div className="text-blue-500">{mesg}</div>
          <div className=" ml-2 flex flex-wrap content-start ...">
            <div>
              <button
                type="submit"
                onClick={createTopList}
                className=" mt-3  w-40  "
              >
                Generate Top List
              </button>
            </div>
          </div>
        </div>
        <div className="-mt-2 max-h-1 py-0 ml-0">
          <ShowTopList />
        </div>
      </main>
    </div>
  );
};

export default withRouter(DakListEdit);
