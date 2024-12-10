'use client'
 
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const doop = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: 'rgb(101, 115, 195)',
      paper: 'rgb(44, 56, 126)',
    },
    text: {
      primary: '#fff',
      disabled: '#fff',
    },
  }
});

export default function NewsTable({data}) {
  return (
    // only updates quickly for state variables
    <section>
    <ThemeProvider theme={doop}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className="NewsTable">

        <TableHead>
          <TableRow>
            <TableCell align="right" width="10%">Date</TableCell>
            <TableCell align="right" width="50%">Title</TableCell>
            <TableCell align="right" width="20%">Domain</TableCell>
            <TableCell align="right" width="20%">Tags</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="right">{row.date}</TableCell>
            <TableCell align="right">{row.title}</TableCell>
            <TableCell align="right">{row.domain}</TableCell>
            <TableCell align="right">{row.keywords}</TableCell>
          </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
    </ThemeProvider>
    </section>
  );
}