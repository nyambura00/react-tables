import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';

import Table from "./Table";

import styled from 'styled-components'

function App() {

  //dealing with data
  const [data, setData] = useState([]); //initial data state for storing API data

  //Once mounted, useEffect initiates the API to set data
  useEffect(() => {
    (async () => {
      const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
      setData(result.data);
    })();
  }, []);

  //the column object
  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "TV Show",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "show.name"
          },
          {
            Header: "Type",
            accessor: "show.type"
          }
        ]
      },
      {
        // Second group - Details
        Header: "Details",
        // Second group columns
        columns: [
          {
            Header: "Language",
            accessor: "show.language"
          },
          {
            Header: "Genre(s)",
            accessor: "show.genres"
          },
          {
            Header: "Runtime",
            accessor: "show.runtime"
          },
          {
            Header: "Status",
            accessor: "show.status"
          }
        ]
      }
    ],
    []
  );

  //styling the table
  const StyledTable = styled.div`
    table {
      width: 100%;
      border-spacing: 0;
      border: 1px solid black;
      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }
      th,
      td {
        margin: 0;
        padding: 1rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        :last-child {
          border-right: 0;
        }
      }
    }
  `

  return (
    <div className="App">
      <StyledTable>
        <Table columns={columns} data={data} />
      </StyledTable>
    </div>
  );
}

export default App;
