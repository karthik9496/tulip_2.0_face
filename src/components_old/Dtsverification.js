import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const DtsVerification = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [lightTheme, setLightTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile, setSelectedFile]);

  useEffect(() => {
    if(isLoading){
          document.getElementById("loadingDiv").style.display="block";
          document.getElementById("uploadFileBtn").style.display="none";
        }else{
          document.getElementById("loadingDiv").style.display="none";
          document.getElementById("uploadFileBtn").style.display="block";
        }

  },[isLoading])

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log("abd", e);
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
  };

  const fileChangeHandler = () => {
    console.log(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    setIsLoading(true);

    //ApiService.upload(formData)
    axios
      .post("/dtsverification/upload/dtsVerification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        alert("File uploaded successfully.");
        if(response.data[1])
          window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data[1]}`);
      })
      .catch((error) => {
        console.log(error.response.data[0]);
        setIsLoading(false);
        alert(error.response.data[0]);
      });
  };

  return (
    <div className={lightTheme ? "theme-light" : "theme-dark"}>
      <form>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group files color">
                <label>Upload DTS csv File </label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-40" id="uploadFileBtn">
            <button type="button" onClick={fileChangeHandler}>
              Upload
            </button>
          </div>
          <div className="flex justify-center items-center" >
              <div
                className="flex justify-center items-center" id="loadingDiv"
                style={{ display: isLoading ? "block" : "none" }}
              >
                <div
                  class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(DtsVerification);
