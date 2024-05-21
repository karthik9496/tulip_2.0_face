import { Alert, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import messageFile from "../MessageTrigger";
import hny from "../files/hny.jpg";

import Modal from "../utils/Modal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";


export default function Todos({ isLoggedIn }) {
  const [fileMessage, setFileMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [quickLinks, setQuickLinks] = useState([]);

  const [pendencyDetails, setPendencyDetails] = useState([]);
  const [loggedInUsr, setLoggedInUsr] = useState();
  const [isFirstJan, setIsFirstJan] = useState(false);

  const quickLinksList = [
    {
      menuName: "Bill Processing",
      link: "/cbilltadaltcs",
      role: "ROLE_TWING",
      class: "bg-green-200",
      maxDesignationLevel: 40,
    },
    {
      menuName: "T-Wing Reports",
      link: "/twing/reports",
      role: "ROLE_TWING",
      class: "bg-red-400 ",
      maxDesignationLevel: 40,
    },
    {
      menuName: "Demand Register",
      link: "/demandRegisters",
      role: "ROLE_TWING",
      class: "bg-yellow-200",
      maxDesignationLevel: 90,
    },
    {
      menuName: "Outstanding Advances",
      link: "/outstandingAdvances",
      role: "ROLE_TWING",
      class: "bg-red-200",
      maxDesignationLevel: 90,
    },
    {
      menuName: "Grievances",
      link: "/grievances",
      role: "ROLE_GRIEVANCE",
      class: "bg-blue-200",
      maxDesignationLevel: 90,
    },
    {
      menuName: "User Management",
      link: "/usrs",
      role: "ROLE_SYSADMIN",
      class: "bg-yellow-200",
      maxDesignationLevel: 40,
    },
    {
      menuName: "User Section",
      link: "/usrSections",
      role: "ROLE_SYSADMIN",
      class: "bg-pink-200",
      maxDesignationLevel: 40,
    },
    {
      menuName: "Dak",
      link: "/daks",
      role: "ROLE_RSEC",
      class: "bg-yellow-200",
      maxDesignationLevel: 40,
    },

    {
      menuName: "Web Reports",
      link: "/reports/0/webReports",
      role: "ROLE_WEBUSER",
      class: "bg-red-200",
      maxDesignationLevel: 40,
    },
    {
      menuName: "Import Grievance JSON",
      link: "/onlineGrievanceInput",
      role: "ROLE_WEBUSER",
      class: "bg-green-200",
      maxDesignationLevel: 40,
    },
    {
      menuName: "Download Grievance Reply JSON",
      link: "/downloadGrievanceReply",
      role: "ROLE_WEBUSER",
      class: "bg-yellow-200",
      maxDesignationLevel: 40,
    },
    {
      menuName: "Download Message Reply JSON",
      link: "/downloadMessageReply",
      role: "ROLE_WEBUSER",
      class: "bg-blue-200",
      maxDesignationLevel: 40,
    },
    {
      menuName: "Generate PM Txt",
      link: "/pmUploadControls",
      role: "ROLE_NCS",
      class: "bg-red-200",
      maxDesignationLevel: 40,
    },
    {
      menuName: "View PM Month Wise",
      link: "/pmCsv",
      role: "ROLE_ACCOUNT",
      class: "bg-yellow-200",
      maxDesignationLevel: 40,
    },
    {
      menuName: "CMP File Generation",
      link: "/schedule3s/cmpGen",
      role: "ROLE_D",
      class: "bg-red-200",
      maxDesignationLevel: 40,
    },
  ];

  useEffect(() => {
    let today = new Date();
    if (today.getDate() === 1 && today.getMonth() + 1 == 1) setIsFirstJan(true);

    //setTimeout(() => setOpenModal(true), 500);
    fetch(messageFile)
      .then((content) => content.text())
      .then((messageText) => {
        setFileMessage(messageText);
      });
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn")) {
      const usr = JSON.parse(sessionStorage.getItem("usr"));
      setLoggedInUsr(usr);
      setQuickLinks(
        quickLinksList.filter(
          (menu) =>
            usr?.rolsNameList.includes(menu.role) &&
            usr?.designation?.designationLevel <= menu.maxDesignationLevel
        )
      );
    }
  }, []);

  useEffect(async () => {
    if (sessionStorage.getItem("isLoggedIn")) {
      try {
        const response = await axios.get(`/reports/home/pendency`);
        console.log(response.data);
        setPendencyDetails(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
  }, []);

  const QuickLinks = () => (
    <>
      {quickLinks.length > 0 ? (
        <div className="fixed left-0 z-50">
          <h2 className="w-36 mt-4 rounded-lg p-2 shadow-md flex items-center justify-center bg-orange-100 font-bold">
            Quick Links
          </h2>
          {quickLinks?.map((menu, index) => (
            <Link
              key={index}
              to={menu.link}
              className={`${
                menu.class ? menu.class : "bg-red-200"
              } text-sm text-center font-semibold w-36 h-20 mt-4 rounded-2xl p-2 shadow-md hover:bg-green-400 flex items-center justify-center transition-transform transform duration-200 hover:scale-105 hover:text-white`}
            >
              {menu.menuName}
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );

  const ShowPendencyDetails = () => (
    <>
      {pendencyDetails.length > 0 ? (
        <div className="fixed right-0 flex flex-col z-50">
          <div className=" ">
            {pendencyDetails[0]?.length > 0 ? (
              <div className="my-4  bg-red-200 p-2 rounded-md shadow-md">
                <h3 className="text-xl font-semibold ">Bill Pendency</h3>
                <table className="table-auto mt-2 mx-auto ">
                  <thead>
                    <tr>
                      <th className="border-1 border-red-400 px-1">
                        SectionName
                      </th>
                      <th className="border-1 border-red-400 px-1">Task</th>
                      <th className="border-1 border-red-400 px-1"> Count</th>
                      <th className="border-1 border-red-400 px-1">
                        Oldest Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendencyDetails[0]?.map((pendency, index) => (
                      <tr key={index}>
                        <td className="border-1 border-red-400 px-1 text-center">
                          {pendency.sectionname}
                        </td>
                        <td className="border-1 border-red-400 px-1 text-center">
                          {pendency.task ? pendency.task : "--"}
                        </td>
                        <td className="border-1 border-red-400 px-1 text-center">
                          {pendency.count}
                        </td>
                        <td className="border-1 border-red-400 px-1 text-center">
                          {pendency.oldestDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {pendencyDetails[1]?.length > 0 ? (
              <div className="my-4 bg-blue-200 p-2 rounded-md shadow-md">
                <h3 className="text-xl font-semibold ">Grievance Pendency</h3>
                <table class="table-auto mt-2 mx-auto">
                  <thead>
                    <tr>
                      <th className="border-1 border-blue-400 px-1">
                        SectionName
                      </th>
                      <th className="border-1 border-blue-400 px-1">Task</th>
                      <th className="border-1 border-blue-400 px-1">Count</th>
                      <th className="border-1 border-blue-400 px-1">
                        Oldest Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendencyDetails[1]?.map((pendency, index) => (
                      <tr key={index}>
                        <td className="border-1 border-blue-400 px-1 text-center">
                          {pendency.sectionname}
                        </td>
                        <td className="border-1 border-blue-400 px-1 text-center">
                          {pendency.task ? pendency.task : "--"}
                        </td>
                        <td className="border-1 border-blue-400 px-1 text-center">
                          {pendency.count}
                        </td>
                        <td className="border-1 border-blue-400 px-1 text-center">
                          {pendency.oldestDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}

            {pendencyDetails[2]?.length > 0 ? (
              <div className="my-4 bg-green-200 p-2 rounded-md shadow-md">
                <h3 className="text-xl font-semibold ">Message Pendency</h3>
                <table className="table-auto mt-2 mx-auto w-full">
                  <thead>
                    <tr>
                      <th className="border-1 border-blue-400 px-1">
                        Section Name
                      </th>
                      <th className="border-1 border-blue-400 px-1">Count</th>
                      <th className="border-1 border-blue-400 px-1">
                        Oldest Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendencyDetails[2]?.map((pendency, index) => (
                      <tr key={index}>
                        <td className="border-1 border-blue-400 px-1 text-center">
                          {pendency.sectionname}
                        </td>
                        <td className="border-1 border-blue-400 px-1 text-center">
                          {pendency.count}
                        </td>
                        <td className="border-1 border-blue-400 px-1 text-center">
                          {pendency.oldestDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );

  return (
    <div className="p-0">
      <div className="flex justify-between overflow-hidden p-0">
        <QuickLinks />

        <Container className="w-1/2">
          <br />

          {/*}
        <ReactPaginator columns={this.state.columns} data={this.state.data} />

      <ReactFilter columns={this.state.columns} data={this.state.data}/>

      <Deductions /> */}
          {isFirstJan && hny ? (
            <img className="mb-4" src={hny} alt="Happy New Year" />
          ) : (
            ""
          )}
          <Alert variant="success">
            <Alert.Heading>Overview</Alert.Heading>
            <hr />
            <p>
              The Tulip 2.0 project is for maintaining the Pay and Allowances of
              the Defence Civilians and employees of Defence Accounts Department
            </p>
            <br />
          </Alert>
          {/* <Alert variant="warning">
            <Alert.Heading>Progress</Alert.Heading>
            <hr />
            <ul className="list-disc">
              <li>Database Design </li>
              <li>Live hosting on WAN for quick feedback from PCDA(O)</li>
            </ul>
          </Alert> */}

          <Alert variant="warning">
            <Alert.Heading>Updates</Alert.Heading>
            <hr />
            <ul className="list-disc ml-2">
              <li>Development in Progress</li>
            </ul>
          </Alert>

          <Alert variant="danger">
            <Alert.Heading>Bugs</Alert.Heading>
            <hr />
            <ul className="list-disc">
              <li>No known bugs</li>
            </ul>
          </Alert>

          {/* <Alert variant="success">
            <Alert.Heading>Todos</Alert.Heading>
            <hr />

            <ul className="list-disc">
              <li>Dynamic Menu and Layout</li>
              <li>Search, Sort, Pagination</li>
            </ul>
          </Alert> */}

          <Alert variant="primary">
            <Alert.Heading>Technology Stack</Alert.Heading>
            <hr />
            <ul className="list-disc">
              This project is being developed on Spring Boot Java and React
              front-end.
              <p />
              <br />
              <h5 className="font-extrabold">OS</h5>
              <ul className="list-disc">
                <li>Linux</li>
              </ul>
              <br />
              <h5 className="font-extrabold">Front End </h5>
              <ul className="list-disc">
                <li>React</li>
                <li>Bootstrap for UI</li>
                <li>Tailwind CSS for styling</li>
                <li>React-hook-form for forms </li>
                <li>Yup for form validation </li>
                <li>Axios HTTP Client for REST API</li>
                <li>Apollo Client for GraphQL (Experimental)</li>
              </ul>
              <br />
              <h5 className="font-extrabold">Back End</h5>
              <ul className="list-disc">
                <li>Spring Boot : Java</li>
                <li>Uses REST API</li>
                <li>GraphQL support</li>
                <li>Database : PostgreSQL</li>
                <li>Requires Java 11 or higher.</li>
              </ul>
              <br />
              <h5 className="font-extrabold">Tools</h5>
              <ul className="list-disc">
                <li>IDE: Spring Tool Suite</li>
                <li>Code Generation : JPA, Python </li>
                <li>Firefox Browser</li>
              </ul>
            </ul>
          </Alert>

          <Alert variant="dark">
            <Alert.Heading>The Team</Alert.Heading>
            <hr />
            <ul className="list-disc">
              <li>
                <b>Domain</b>: 
              </li>
              <li>
                <b>Development</b>: ITSDC, Secunderabad{" "}
              </li>
            </ul>
          </Alert>
        </Container>
        <ShowPendencyDetails />

        {openModal && (
          <Modal
            setOpenModal={setOpenModal}
            heading="Important Message"
            className="w-1/3 text-black bg-gray-50 font-medium font-mono"
          >
            <li className="font-semibold">
              Falcon Server will be unavailable from 02:45 pm.
              {/* DP Sheet Menu and Omro Approval Button will be available from
              01/12/2023 9:30 AM. */}
              <p className="mt-2">Regards,</p>
              <p>EDP</p>
              <p>PCDA(O)</p>
            </li>
          </Modal>
        )}

        {/* {openModal && (
          <Modal
            setOpenModal={setOpenModal}
            heading="Important Message"
            className="w-1/3 text-black bg-gray-50 font-medium font-mono"
          >
            <li className="font-semibold">
              Rail Fare Pdf available under Help {">"} User Manual {">"} Rail
              Fare
              <p className="mt-2">Regards,</p>
              <p>EDP</p>
              <p>PCDA(O)</p>
            </li>
          </Modal>
        )} */}
      </div>
    </div>
  );
}
