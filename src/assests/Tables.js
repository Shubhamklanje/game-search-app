import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

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

  //function to fetch api
  const fetchData = () => {
    fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json")
      .then((response) => {
        return response.json();
      }).then((data) => {

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
        data.splice(0, 1);
        setUser(data)
        console.log(data);

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
  console.log(rows);

  return (
    <div >
      <div className="search">
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          backgroundColor: "#96bba9"
        }} >
        <InputBase
          sx={{
            ml: 1, flex: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: "#96bba9"
          }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      </div>
      <div className="tbbg" style={{ height: 450, width: '100%', margin: '20px', padding: '15px'}}>
        <DataGrid
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
