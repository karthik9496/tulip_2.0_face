import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Table from "../utils/Table";


function BListingProcessed() {
    const [bData, setBData] = useState([]);
    const [aData, setAData] = useState([]);
    const [searchB, setSearchB] = useState("");
    const [searchA, setSearchA] = useState("");
    const [avarData, setAvarData] = useState([]);
    const [bvarData, setBvarData] = useState([]);



    function FetchProcessed() {


        axios.get(`/blisting/processed?search=${searchA}`)
            .then((response) => {
                console.log(response.data);
                // if (response.data.bList) setBData(response.data.bList);
                // if (response.data.aList) setAData(response.data.aList);
                setBData(response.data[0]);
                setAData(response.data[1]);
                setAvarData(response.data[1]);

            })
    }

    useEffect(() => {
        FetchProcessed();
    }, [])
    const handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.which === 13) {
            FetchProcessed();

        }

    }
    // function FetchProcessed1() {


    //     axios.get(`/blisting/processed?search=${searchB}`)
    //         .then((response) => {
    //             console.log(response.data);
    //             // if (response.data.bList) setBData(response.data.bList);
    //             // if (response.data.aList) setAData(response.data.aList);
    //             //setBData(response.data[0]);
    //             setBvarData(response.data[0]);

    //         })
    // }


    const bColumns = useMemo(() => [
        {
            Header: "CDAO No",
            accessor: 'cdaoNo',
        },
        {
            Header: "Officer Name",
            accessor: 'employee.officerName',
        },
        {
            Header: "From Section",
            accessor: 'fromSection.sectionName',
        },
        {
            Header: "To Section",
            accessor: 'toSection.sectionName',
        },
        {
            Header: "AAO approval date",
            accessor: 'aaoDate',
        },
        {
            Header: "Approved By AAO",
            accessor: 'aao.usrName',
        },
        {
            Header: "AO approval Date",
            accessor: 'aoDate',
        },
        {
            Header: "Approved By AO",
            accessor: 'ao.usrName',
        },

    ], [bvarData])

    const aColumns = useMemo(() => [
        {
            Header: "CDAO No",
            accessor: 'cdaoNo',
        },
        {
            Header: "Officer Name",
            accessor: 'employee.officerName',
        },
        {
            Header: "From Section",
            accessor: 'fromSection.sectionName',
        },
        {
            Header: "To Section",
            accessor: 'toSection.sectionName',
        },
        {
            Header: "AAO approval date",
            accessor: 'aaoDate',
        },
        {
            Header: "Approved By AAO",
            accessor: 'aao.usrName',
        },
        {
            Header: "AO approval Date",
            accessor: 'aoDate',
        },
        {
            Header: "Approved By AO",
            accessor: 'ao.usrName',
        },

    ], [avarData])

    return (
        <div className="mt-2">
            <div>
                <div className="mx-2">
                    <h1> Processed B Listing List</h1>
                </div>
                <div>
                    <input className="m-2 bg-gray-200 focus:bg-yellow-100 px-2"
                        placeholder="Enter CDAO No"
                        onChange={(e) => {
                            setSearchB(e.target.value);
                            // setBvarData(
                            //     bvarData.filter((item, index) => {
                            //         if (String(item.cdaoNo).includes(String(e.target.value))
                            //         ) {

                            //             return item;

                            //         }
                            //     }

                            //     ));

                        }
                        }

                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div>
                    <button className="px-2 w-32" onClick={() => {
                        //console.log(searchB);
                        //FetchProcessed1();
                        setBvarData(
                            bvarData.filter((item, index) => {
                                if (String(item.cdaoNo).includes(String(searchB))
                                ) {
                                    console.log(searchB);
                                    return item;
                                }
                            }

                            ));

                    }} >Search</button>
                </div>
                <div>
                    <Table data={bData} columns={bColumns} />
                </div>
            </div>
            {aData?.length > 0 && <div>
                <div className="mx-2">
                    <h1> Processed A Listing List</h1>
                </div>
                <div className="flex">
                    <input className="m-2 bg-gray-200 focus:bg-yellow-100 px-2"
                        placeholder="Enter CDAO No"

                        onChange={(e) => {
                            setSearchA(e.target.value);
                        }
                        }
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div>
                    <button className="px-2 w-32" onClick={() => {
                        console.log(searchA);
                        FetchProcessed();
                        // setAData(
                        //     aData.filter((item, index) => {
                        //         if (String(item.cdaoNo).includes(String(searchA))
                        //         ) {

                        //             return item;

                        //         }
                        //     }

                        //     ));
                    }} >Search</button>
                </div>
                <div>
                    <Table data={aData} columns={aColumns} />
                </div>
            </div>}
        </div>
    )
}
export default BListingProcessed;