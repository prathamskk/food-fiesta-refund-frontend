// import * as React  from 'react';
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import {
  Button
  , Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
function Row(props) {
  const { row, stallNo, subtotal, handleRefund, order } = props;
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);
  const handleCloseRefund = () => {
    setOpenRefund(false);
  };
  const handleClickOpen = () => {
    setDisable(false)
    setOpenRefund(true);
  };
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {stallNo}
        </TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{subtotal.subTotalObj[stallNo]}</TableCell>
        <TableCell align="right">
          <Button
            onClick={handleClickOpen}
            variant="contained"
            disabled={row.status !== "cancelled"}
            color="secondary"
          >
            REFUND
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Desc</TableCell>
                    <TableCell>Qty.</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(row.items_ordered).map((itemRow, index) => {
                    const items = row.items_ordered[itemRow];
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {items.name}
                        </TableCell>
                        <TableCell>{items.qty}</TableCell>
                        <TableCell align="right">{items.price}</TableCell>
                        <TableCell align="right">
                          {items.price * items.qty}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={openRefund}
        onClose={handleCloseRefund}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Has the Payment been refunded?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRefund}>Disagree</Button>
          <Button
            disabled={disable}
            onClick={() => {
              setDisable(true)
              handleRefund(order, stallNo)
              setOpenRefund(false);

            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function createTotalObj(rows) {
  const totalObj = {};
  let Total = 0;
  for (let stallid in rows.stall_order) {
    let subtotal = 0;
    for (let itemid in rows.stall_order[stallid]["items_ordered"]) {
      subtotal +=
        rows.stall_order[stallid]["items_ordered"][itemid].price *
        rows.stall_order[stallid]["items_ordered"][itemid].qty;
    }

    totalObj[stallid] = subtotal;
    Total += subtotal;
  }
  return {
    Total: Total,
    subTotalObj: totalObj,
  };
}

export default function CollapsibleTable(props) {
  const { rows, handleRefund } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Stall</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">Refund</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(rows.stall_order).map((row, index) => {
            const rowObject = rows.stall_order[row];
            return (
              <Row
                key={row}
                stallNo={row}
                row={rowObject}
                subtotal={createTotalObj(rows)}
                handleRefund={handleRefund}
                order={rows}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
