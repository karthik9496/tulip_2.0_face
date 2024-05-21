import React, { useState, useEffect } from "react";

import axios from 'axios';

function HookAx() {
  //const [data, setData] = useState({ hits: [] });
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('react');

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      //const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query);
      const result = await axios('http://localhost:3000/usrs');
      if (!ignore) setData(result.data);
    }

    fetchData();
    return () => { ignore = true; }
  }, []);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <a href={item.url}>{item.usrName} {}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default HookAx;
