import React, { useState, useEffect,useMemo } from 'react';
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from './Table'  // new
import axios from "axios";

//const API_URL = "http://localhost:3000/usrs";




function TableEx() {

  const [data, setData] = useState([]);
  //const [query, setQuery] = useState('react');
  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      //const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query);
      const result = await axios('/usrs');
      console.log(result.data);
      if (!ignore) setData(result.data);
    }

    fetchData();
    return () => { ignore = true; }
  }, []);

	const columns = useMemo(() => [
		{
			Header: "Name",
			accessor: 'usrName',
		},
		{
			Header: "Designation",
			accessor: 'dadDesignation.designationAbbr',	
		},
		{
			Header: "Login Name",
			accessor: 'loginName',
			Filter: SelectColumnFilter,  // new
			filter: 'includes',
		},
	], [])

	//const data = React.useMemo(() => getData(), [])
/*
  return (
    <>
      <h1>Hello React!</h1>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </>
  );
  */	

 return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">React Table + Tailwind CSS</h1>
        </div>
        <div className="mt-6 max-h-1">
          <Table columns={columns} data={data} className="table-auto"/>
        </div>
      </main>
    </div>
  );
 
 

  
}

export default TableEx;


