import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid'; //datagrid is from mui
import Paper from '@mui/material/Paper';
import SearchBar from "material-ui-search-bar";
import { Button } from "@mui/material";


const columns = [
  { field: 'title', headerName: 'Title', width: 400 },
  { field: 'platform', headerName: 'Platfrom', width: 250, align: 'center', headerAlign: 'center' },
  { field: 'score', headerName: 'Score', width: 250, align: 'center', headerAlign: 'center' },
  { field: 'genre', headerName: 'Genre', width: 250, align: 'center', headerAlign: 'center' },
  { field: 'editors_choice', headerName: 'Editors_choice', width: 250, align: 'center', headerAlign: 'center' },
];

export default function Tables() {

  const [users, setUser] = useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [searched, setSearched] = useState("");

  //function to fetch api
  const fetchData = () => {
    fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json")
      .then((response) => {
        return response.json();
      }).then((data) => {
        //this function for adding unique id to each object of api
        function addId(id) {
          return function iter(o) {
            if ('title' in o) {
              o.id = id++;
            }
            Object.keys(o).forEach(function (k) {
              Array.isArray(o[k]) && o[k].forEach(iter);
            });
          };
        }
        data.forEach(addId(1))
        //this one is to remove the first object of api
        data.splice(0, 1);
        setUser(data)
        // console.log(data);

      })
  }
  useEffect(() => {
    fetchData();
  }, [])
  // data triming
  const rows = users?.map(user => {
    return {
      title: user?.title,
      score: user?.score,
      platform: user?.platform,
      id: user?.id,
      genre: user?.genre,
      editors_choice: user?.editors_choice,
    }
  })
  // console.log(rows);

  //Search fuctionality
  const requestSearch = (searchedVal) => {
    const filteredRows = users.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setUser(filteredRows);
    // console.log(filteredRows);
  };

  //function for refreshing 
  function refreshPage() {
    window.location.reload();
  }

  return (
    <div>
      <div className="search">
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: "#96bba9",
            fontFamily: 'Monospace'
          }} >
          <SearchBar
            sx={{ fontFamily: 'Monospace'}}
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() =>  refreshPage()}
          />
          <Button 
          sx={{
            borderRadius: "100px",
            backgroundColor: "#e4f0e2",
            color: "black",
            fontFamily: 'Monospace'
          }}
          variant="contained"
          onClick={ refreshPage }>
          Refresh
          </Button>
        </Paper>
      </div>
      <div className="tbbg" style={{ height: 450, width: '100%', margin: '20px', padding: '15px' }}>
        <DataGrid
        sx={{ fontFamily: 'Monospace'}}
          rows={rows}
          getRowId={(row) => row.id}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />
      </div>
    </div>
  );
}
