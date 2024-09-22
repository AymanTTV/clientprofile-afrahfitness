import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button, TablePagination, TextField, useMediaQuery
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

export default function Reports() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]); // For search functionality
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios.get('https://clientprofile.afrahfitness.com/api/get-clients.php')
      .then(response => {
        setRows(response.data);
        setFilteredRows(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleViewOpen = (row) => {
    setSelectedRow(row);
    setOpenView(true);
  };

  const handleViewClose = () => {
    setOpenView(false);
  };

  const handleDeleteOpen = (row) => {
    setSelectedRow(row);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleDeleteConfirm = () => {
    axios.delete(`https://clientprofile.afrahfitness.com/api/delete-client.php?id=${selectedRow.id}`)
      .then(() => {
        const updatedRows = rows.filter((row) => row.id !== selectedRow.id);
        setRows(updatedRows);
        setFilteredRows(updatedRows);
        setOpenDelete(false);
      })
      .catch((error) => console.error('Error deleting client:', error));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredData = rows.filter(row => row.name.toLowerCase().includes(term));
    setFilteredRows(filteredData);
  };

  return (
    <Paper sx={{ width: '100%', padding: isMobile ? '10px' : '20px' }}>
      <TextField
        label="Search by Name"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        sx={{ marginBottom: '20px' }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleViewOpen(row)}><Visibility /></IconButton>
                  <IconButton><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteOpen(row)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ padding: '10px 0' }}
      />
      {/* View Dialog */}
      <Dialog open={openView} onClose={handleViewClose}>
        <DialogTitle>View Client</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Name: {selectedRow?.name} <br />
            Phone: {selectedRow?.phone}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <DialogTitle>Delete Client</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete {selectedRow?.name}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
