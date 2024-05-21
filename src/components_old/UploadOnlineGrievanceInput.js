import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BasicLoadingIcon } from "../utils/Icons";

const UploadOnlineGrievanceInput = () => {
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
    setLoading(true);
    console.log(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post("/onlineGrievanceInput/upload/grievanceInput", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        alert(res.data[0]);
        console.log(res.data);
        if (res.data[1]) {
          window.open(
            `${process.env.REACT_APP_BASE_URL}/files/${res.data[1]}?path=uploads/grievances/import/error`
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        alert(error.response.data[0]);
        //console.log(error.response);
        /*  console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers); */
        /*
			if (error.response)
				setServerErrors(error.response.data.error);
			else
				setServerErrors(error.Error);
			*/
      });
  };

  return (
    <div className={lightTheme ? "theme-light" : "theme-dark"}>
      {loading ? (
        <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
          <p className="mr-2 text-2xl text-green-600">Uploading File</p>
          <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
        </div>
      ) : (
        <form style={loading ? { pointerEvents: "none", opacity: "0.2" } : {}}>
          <div className="container pb-2">
            <div className="row">
              <div className="col-md-6 mb-2 mt-3">
                <div className="form-group files color">
                  <label>Import Online Grievance JSON</label>
                  <input
                    type="file"
                    className="form-control mt-4"
                    name="file"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="w-40 ml-2">
              <button type="button" onClick={fileChangeHandler}>
                Upload
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default withRouter(UploadOnlineGrievanceInput);
