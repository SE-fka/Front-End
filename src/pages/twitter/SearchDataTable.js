import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const TwitterDataTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 15 }}>#</TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Tweet Content</b></TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Username</b></TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Likes</b></TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Retweets</b></TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Sentiment</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: 15 }}>{index + 1}</TableCell>
                <TableCell sx={{ fontSize: 15 }}>{row.tweet}</TableCell>
                <TableCell onClick={() => window.open(`https://twitter.com/${row.username}`, "_blank")} style={{color: 'blue'}} sx={{ fontSize: 15 }}>{row.username}</TableCell>
                <TableCell sx={{ fontSize: 15 }}>{row.likes_count}</TableCell>
                <TableCell sx={{ fontSize: 15 }}>{row.retweets_count}</TableCell>
                <TableCell sx={{ fontSize: 15 }}>{row.sentiment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25,30,50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export { TwitterDataTable };
