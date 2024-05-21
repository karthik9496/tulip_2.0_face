import { useState, useEffect } from "react";
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);

	useEffect(() => {
		let isCancelled = false;

		async function fetchData(url) {
			await axios.get(url)
			.then((result) =>{
				if (!isCancelled) setData(result.data);
			})
			.catch((error)=> {
						//console.log(error);
						//console.log(error.response.status);
						//console.log(error.response.headers);
						if(error.response)
							//setServerErrors(error.response.data.error);
							;
						else
							//setServerErrors(error.Error);
							;
			});
			
		}

		fetchData(url);
		return () => { isCancelled = true; }
	}, [url]);

  return [data];
};

export default useFetch;

