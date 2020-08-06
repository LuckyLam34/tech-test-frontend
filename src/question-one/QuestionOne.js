import React, { useState } from "react";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";

import "./QuestionOne.css";

export const QuestionOne = ({ service }) => {
  const [data, setData] = useState([]);

  const search = (keyword) => {
    if (!keyword) {
      setData([]);

      return;
    }

    if (keyword.length >= 3) {
      service.getJobsWithSearchTerm(keyword).then((res) => {
        setData(res);
      });
    }
  };

  return (
    <SectionGroup>
      <SectionPanel>
        <form>
          <input
            onChange={(e) => search(e.target.value)}
            type="text"
            placeholder="Search..."
          />
        </form>
        <table>
          {data.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.start}</td>
              <td>{item.end}</td>
            </tr>
          ))}
        </table>
      </SectionPanel>
    </SectionGroup>
  );
};
