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

const FacebookDataTable = ({ data }) => {
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
              <TableCell sx={{ fontSize: 15}}><b>Post By</b></TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Post Content</b></TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Likes</b></TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Comments</b></TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Shares</b></TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Time</b></TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Post Link</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: 15 }}>{index + 1}</TableCell>
                <TableCell sx={{ fontSize: 15 }}>{row.nameOfPoster}</TableCell>
                <TableCell sx={{ fontSize: 15 }}>{row.postContent}</TableCell>
                <TableCell sx={{ fontSize: 15 }}>{row.numberOfLikes}</TableCell>
                <TableCell sx={{ fontSize: 15 }}>{row.numberOfComments}</TableCell>
                <TableCell sx={{ fontSize: 15 }}>{row.numberOfShares}</TableCell>
                <TableCell sx={{ fontSize: 15 }}>{row.timeOfPost}</TableCell>
                <TableCell onClick={() => window.open(`${row.postLink}`, "_blank")} style={{color: 'blue'}} sx={{ fontSize: 15 }}>View on Facebook</TableCell>
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

export { FacebookDataTable };
