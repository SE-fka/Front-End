import React, { useState } from "react";
import { tokens } from "../../styles/theme";
import DownloadIcon from '@mui/icons-material/Download';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  useTheme
} from "@mui/material";

import * as XLSX from 'xlsx';

const HarvestDataTable = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle={border:'null', backgroundColor: colors.greenAccent[400]}
  const btnstylecsv={border:'null', backgroundColor: colors.blueAccent[400]}
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

  const handleExportCSV = () => {
      let csvContent = 'email,source\n';
      data.forEach((row) => {
        const rowData = [row[0], row[1]];
        const rowString = rowData.map((item) => `"${item}"`).join(',');
  
        csvContent += `${rowString}\n`;
      });
  
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'exported_data.csv';
      link.click();
      URL.revokeObjectURL(url);
    }; 

  const handleExportXLSX = () => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
  const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'exported_data.xlsx';
  link.click();
  URL.revokeObjectURL(url);
};

  return (
    <>
      <TableContainer component={Paper}>
      <Button onClick={handleExportXLSX} style={btnstyle}> <DownloadIcon/> Export as XLSX</Button> &nbsp;&nbsp;
      <Button onClick={handleExportCSV} style={btnstylecsv}> <DownloadIcon/> Export as CSV</Button>
      <hr />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 15 }}>#</TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Email</b></TableCell>
              <TableCell sx={{ fontSize: 15 }}><b>Source</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: 15 }}>{index + 1}</TableCell>
                <TableCell sx={{ fontSize: 15 }}>{row[0]}</TableCell>
                <TableCell sx={{ fontSize: 15}} style={{color:'blue'}}>{row[1]}</TableCell>
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

export { HarvestDataTable };
