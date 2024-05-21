import { useState, useEffect, useMemo } from 'react';
import Table from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import TableCopy from '../utils/TableCopy';

function StopPaymentList() {
    const [data, setData] = useState([]);
    const [serverErrors, setServerErrors] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        console.log("stp");
        let fetching = false;
        async function fetchData() {
            if (!fetching)
                await axios.get('/stopPayments?search=' + search)
                    .then((response) => {
                        setData(response.data);
                        console.log("stop payment list>>>", response.data);
                    })
                    .catch((error) => {
                        if (error.response)
                            setServerErrors(error.response.data.error);
                        else
                            setServerErrors(error.Error);
                    })
        }
        fetchData();
        return () => { fetching = true; }

    }, [search]);

    const columns = useMemo(() => [
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <div>
                    <Link to={"/stopPaymentEdit/" + row.original.letterNo}>
                        <button className=" w-16 m-0 p-0 " > Edit </button>
                    </Link>
                </div>
            )
        },
        {
            Header: "Letter No",
            accessor: 'letterNo',
        },
        {
            Header: "Letter Date",
            accessor: 'letterDate',
        },
        {
            Header: "CDAO No",
            accessor: 'employee.cdaoNo',
        },
        {
            Header: "IC No",
            accessor: 'employee.icNo',
        },
        {
            Header: "DOB",
            accessor: 'employee.dateOfBirth',
        },
        {
            Header: "DOC",
            accessor: 'employee.dateOfCommission',
        },
        {
            Header: "Stop Date",
            accessor: 'stopDate',
        },
        {
            Header: "Stop ME",
            accessor: 'stopMe',
        },
        {
            Header: "Stop CSCD",
            accessor: 'stopPaymentCscd',
        },
        {
            Header: "Remarks",
            accessor: 'remarks',
        },

    ], [data])

    return (
        <div>
            <TableCopy data={data} columns={columns} />
        </div>
    )
}
export default StopPaymentList;
