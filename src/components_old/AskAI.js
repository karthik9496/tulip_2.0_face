import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

function AskAI() {
  const [data, setData] = useState({});
  const [askedQues, setAskedQues] = useState({});
  const [validation, setValidation] = useState(false);
  useEffect(() => {
    axios
      .get(`https://192.168.16.185:5000/validation`)
      .then(() => setValidation(true))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function FetchData() {
    await axios
      .post(`https://192.168.16.185:5000/askA`, askedQues)
      .then((response) => {
        console.log("askA data", response.data);
        setData(response.data);
      })
      .catch((error) => console.log("error", error.response));
  }

  return (
    <div
      className="w-6/12 mt-2 mx-auto bg-gray-400 p-3 rounded-3xl shadow-2xl"
      style={{
        fontSize: "19px",
        resize: "horizontal",
        overflow: "auto",
        minWidth: "800px",
      }}
    >
      <div className="text-white">Ask Falcon (Beta Version)</div>

      {validation ? (
        <div>
          <div className=" p-3">
            <input
              className="bg-white py-2 w-full rounded-lg px-3"
              name="askedQues"
              onChange={(e) => {
                setAskedQues({ askedQues: e.target.value });
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  FetchData();
                }
              }}
            />
            <button
              className="w-32 p-1 bg-green-600"
              onClick={() => FetchData()}
            >
              Get Answer
            </button>
          </div>
        </div>
      ) : (
        <div className="text-white hover:text-blue-600">
          <a className="" href="https://192.168.16.185:5000/validation">
            Please click here for validation
          </a>
        </div>
      )}
      {data.answers && data.query ? (
        <div>
          <div className="grid grid-cols-2 text-justify">
            <div className="bg-white m-2 p-3 rounded-md">
              <label>Query</label>
              <div>{data?.query}</div>
            </div>
            <div className="bg-white m-2 p-3 rounded-md">
              <label>Answer</label>
              <div>{data?.answers[0]?.answer}</div>
            </div>
            <div className="bg-white m-2 p-3 rounded-md">
              <label>Meta Query</label>
              <div>{data?.answers[0]?.meta.query}</div>
            </div>
            <div className="bg-white m-2 p-3 rounded-md">
              <label>Context</label>
              <div>{data?.answers[0]?.context}</div>
            </div>
            <div className="bg-white m-2 p-3 rounded-md">
              <label>Score</label>
              <div>{data?.answers[0]?.score}</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default withRouter(AskAI);
