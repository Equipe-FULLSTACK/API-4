import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

interface DataTableProps {
  title: string;
  data: any[];
  columns: string[];
  keys: string[];
}

const DataTable: React.FC<DataTableProps> = ({ title, data, columns, keys }) => {
  return (
    <TableContainer component={Paper} style={{ marginBottom: 20 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {keys.map((key) => (
                <TableCell key={key}>{row[key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
