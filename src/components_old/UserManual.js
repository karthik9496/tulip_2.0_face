import { useState } from "react";

import trRule from "../files/TravelRule.pdf";
import userManual from "../files/UserManual.pdf";
import cmpRejectionManual from "../files/CmpRejectionManual.pdf";
import railFare from "../files/Rail_Fare.pdf";

export default function UserManual() {
  const [pdf, setPdf] = useState();
  const [title, setTitle] = useState("");
  return (
    <div className="p-8">
      <br />

      <u>
        <p className=" mb-2 text-3xl font-bold">
          Utility to View/Download Manuals and Other Files.
        </p>
      </u>

      <div className="mb-4 text-2xl text-green-500 ">
        <li>
          <a
            href="#"
            className="hover:text-red-500"
            onClick={() => setPdf(trRule)}
          >
            TR Rule
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-red-500"
            onClick={() => {
              setPdf(userManual);
            }}
          >
            User Manual for Bill Processing.
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-red-500"
            onClick={() => {
              setPdf(cmpRejectionManual);
            }}
          >
            CMP Rejection Manual
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-red-500"
            onClick={() => {
              setPdf(railFare);
            }}
          >
            Rail Fare
          </a>
        </li>
      </div>
      {pdf && (
        <div className="flex flex-col justify-center items-center">
          <div className="w-3/4" style={{ boxShadow: "2px 2px 20px" }}>
            <embed
              className="pt-2"
              src={`${pdf}`}
              type="application/pdf"
              height={700}
              width="100%"
            />
          </div>
        </div>
      )}
    </div>
  );
}
