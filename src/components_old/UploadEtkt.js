import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BasicLoadingIcon } from "../utils/Icons";

const UploadEtkt = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [lightTheme, setLightTheme] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile, setSelectedFile]);

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(e);
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
  };

  const fileChangeHandler = () => {
    console.log(selectedFile);
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    //ApiService.upload(formData)
    axios
      .post("/dtsRailTransactions/upload/etkt", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data[0]);

        if (res.data[1] != null) {
          const fileList = res.data[1];
          fileList.map((fileName) =>
            window.open(`${process.env.REACT_APP_BASE_URL}/files/${fileName}`)
          );
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
        setLoading(false);
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        /*
			if (error.response)
				setServerErrors(error.response.data.error);
			else
				setServerErrors(error.Error);
			*/
      });
  };

  return (
    <div
      className={lightTheme ? "theme-light" : "theme-dark"}
      style={loading ? { pointerEvents: "none", opacity: "0.6" } : {}}
    >
      <form>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group files color">
                <label>Upload E-Ticketing Data </label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-40">
            <button type="button" onClick={fileChangeHandler}>
              Upload
            </button>
          </div>
        </div>
      </form>
      {loading ? (
        <div className="flex flex-col justify-center items-center fixed top-1/4 w-full z-50">
          <div className="flex">
            <p className="mr-2 text-green-600 font-bold text-4xl">Processing</p>
            <BasicLoadingIcon className="ml-1 h-12 w-12 animate-spin text-green-600 " />
          </div>
          <p className="mr-2 mt-8 text-2xl text-green-600">Please Wait ...</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default withRouter(UploadEtkt);
