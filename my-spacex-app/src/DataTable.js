import "./dataTable.css";

import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DataRow from "./DataRow";
import Pagination from "./Pagination";
import functionsList from "./functions";

const FIND_ROCKET_VARIABLE = gql`
  {
    launches {
      mission_name
      rocket {
        rocket_name
        rocket_type
      }
      launch_date_local
    }
  }
`;

function DataTable() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [findCondition, setFindCondition] = useState("");
  const { data, loading, error } = useQuery(FIND_ROCKET_VARIABLE);
  const [mutatedData, setMutatedData] = useState([]);
  const [displayTableData, setDisplayTableData] = useState([]);
  const [reverseSort, setReverseSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [nPages, setNPages] = useState(0);

  const recordsPerPage = 20;
  const indexOfLastRecord = currentPage * 20;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  useEffect(() => {
    if (data) {
      setMutatedData(data.launches);
      setNPages(Math.ceil(data.launches.length / recordsPerPage));
    }
  }, [data]);

  useEffect(() => {
    const currentRecords = mutatedData.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
    setDisplayTableData(currentRecords);
  }, [mutatedData, indexOfFirstRecord, indexOfLastRecord]);

  useEffect(() => {
    if (data) {
      const filteredList = functionsList.handleSearch(findCondition, data);
      if (filteredList) {
        setMutatedData(filteredList);
        setNPages(Math.ceil(filteredList.length / recordsPerPage));
      }
    }
  }, [findCondition, data]);

  if (loading) return <div className="fetch-message">Loading...</div>;
  if (error)
    return (
      <div className="fetch-message">
        Oops, something went wrong, please try again later
      </div>
    );

  return (
    <div id="datatable-wrapper">
      <div>
        <label htmlFor="search-input">Search:</label>
        <input
          id="search-input"
          alt="searching"
          type="text"
          value={findCondition}
          onChange={(e) => setFindCondition(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            {Object.keys(functionsList.headerVariablesInData).map(
              (titleName, index) => (
                <th className="th-head" key={index}>
                  <div className="th-head-titles">
                    <div>{titleName} </div>
                    <ArrowDropDownIcon
                      className={`arrowIcon ${
                        index === activeTabIndex && reverseSort
                          ? "active-tab-rotate"
                          : ""
                      } `}
                      value={titleName}
                      onClick={() => {
                        functionsList.handleSorting(
                          titleName,
                          setMutatedData,
                          reverseSort
                        );
                        setReverseSort(!reverseSort);
                        setActiveTabIndex(index);
                      }}
                    />
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {displayTableData
            ? displayTableData.map((res, index) => (
                <DataRow res={res} key={index} />
              ))
            : null}
        </tbody>
      </table>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default DataTable;
