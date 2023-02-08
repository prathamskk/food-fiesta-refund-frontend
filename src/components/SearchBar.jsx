import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { MenuItem, Modal, Select } from "@mui/material";
import QrReader from "react-qr-scanner";

const SearchBar = (props) => {
  const { handleChangeIndex, searchValue, setSearchValue } = props;
  const handleChange = (event) => {
    setSearchValue(event.target.value);
    handleChangeIndex(0);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [error, setError] = useState();
  const handleError = (errorobj) => {
    // setError(errorobj);
    console.log(errorobj);
  };
  const [result, setResult] = useState();
  const handleScan = (resultobj) => {
    // console.log(resultobj);

    if (resultobj === null) {
      return;
    }
    handleClose();
    handleChangeIndex(0);
    setSearchValue(resultobj?.text);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
  };
  const previewStyle = {
    height: "auto",
    width: "100%",
  }

  return (
    <Box>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Order"
          inputProps={{ "aria-label": "search order id" }}
          value={searchValue}
          onChange={handleChange}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => {
            handleChangeIndex(0);
          }}
        >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={handleOpen}
        >
          <CameraAltIcon />
        </IconButton>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <QrReader onError={handleError} onScan={handleScan} style={previewStyle} />
        </Box>
      </Modal>
    </Box>
  );
};

export default SearchBar;
