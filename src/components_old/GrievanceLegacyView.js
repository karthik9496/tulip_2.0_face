import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import axios from "axios";

const GrievanceLegacy = () => {
  let { id } = useParams();
  //let history = useHistory();

  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [buttonState, setButtonState] = useState();
  const [reallocatedSectionGroup, setReallocatedSectionGroup] = useState("");
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  //   const {
  //     register,
  //     handleSubmit,
  //     setValue,
  //     formState: { errors },
  //     clearErrors,
  //     reset,
  //   } = useForm({
  //     resolver: yupResolver(schema),
  //   });

  useEffect(() => {
    async function fetchData() {
      let record = "";
      await axios
        .get("/grievanceLegacy/" + id)
        .then((response) => {
          record = response.data;
          setEntity(record);
          console.log("id legacy", record);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }

    fetchData();
  }, []);

  const errorCallback = (err) => {
    setServerErrors(err);
  };
  const myStyleHead = {
    fontSize: "25px",
  };
  const myStyleLabel = {
    fontSize: "17px",
    marginBottom: "5px",
  };
  const myStyle = {
    padding: "5px 12px",
    backgroundColor: "rgb(230,230,230)",
    fontSize: "18px",
    borderRadius: "10px",
  };
  const myStyle1 = {
    width: "200px",
  };
  const myShadow = {
    borderRadius: "20px",
    boxShadow: "",
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="" style={{ boxSizing: "border-box" }}>
      <div>
        <div style={{ ...myShadow }} className="w-9/12 m-auto shadow-2xl p-4">
          <div className="flex justify-between mt-3  mb-10">
            <div>
              <label style={{ ...myStyleHead }}>
                Section: {entity.wing}
                {entity.sectionNo}
              </label>
            </div>

            <div>
              <label style={{ ...myStyleHead }}>
                Name:- {entity.officerName}
              </label>
            </div>
          </div>
          <div className="flex flex-wrap justify-between my-3">
            <div>
              <label style={{ ...myStyleLabel }}>Web Id</label>
              <div style={{ ...myStyle, ...myStyle1 }}>{entity.webId}</div>
            </div>
            <div>
              <label style={{ ...myStyleLabel }}>CDAO No</label>
              <div style={{ ...myStyle, ...myStyle1 }}>{entity.cdacNo}</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between my-3">
            <div>
              <label style={{ ...myStyleLabel }}>Receipt Date</label>
              <div style={{ ...myStyle, ...myStyle1 }}>
                {entity.receiptDate}
              </div>
            </div>
            <div>
              <label style={{ ...myStyleLabel }}>Disposal Date</label>
              <div style={{ ...myStyle, ...myStyle1 }}>{entity.replyDate}</div>
            </div>
          </div>
          {entity?.reference && (
            <div className="my-3">
              <div>
                <label style={{ ...myStyleLabel }}>Reference</label>
                <div style={{ ...myStyle }}>{entity.reference}</div>
              </div>
            </div>
          )}
          <div className="my-3">
            <div>
              <label style={{ ...myStyleLabel }}>Subject</label>
              <div style={{ ...myStyle }} className="w-full">
                {entity.subject}
              </div>
            </div>
          </div>
          <div className="my-3 grid grid-cols-2">
            <div>
              <label style={{ ...myStyleLabel }}>Grievance Brief</label>
              <div style={{ ...myStyle }}>{entity.grievanceBrief}</div>
            </div>
            <div>
              <label style={{ ...myStyleLabel }}>Grievance Reply</label>
              <div style={{ ...myStyle }}>{entity.replyText}</div>
            </div>
          </div>
          {/* <div className="my-3">
            <div>
              <label style={{ ...myStyleLabel }}>Grievance Reply</label>
              <div style={{ ...myStyle }}>{entity.replyText}</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default withRouter(GrievanceLegacy);
