import React, { useState, useRef } from "react";
import { Suspense, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import {
  Avatar,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Popover,
  CardHeader,
  Card,
  CardContent,
} from "@mui/material";
import EMobiledataIcon from "@mui/icons-material/EMobiledata";
import { useAuth } from "../context/AuthContext";

import { Stack } from "@mui/system";
const SharedLayout = () => {
  const { user, handleSignOut } = useAuth();
  const [details, setDetails] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <EMobiledataIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cashier App
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button id="profile-button" onClick={handleClick}>
              <Avatar src={user?.photoURL}>{user?.displayName[0]}</Avatar>
            </Button>
          </Stack>
          <Popover
            anchorEl={anchor}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar src={user?.photoURL}>{user?.displayName[0]}</Avatar>
                }
                title={user?.displayName}
                subheader={user?.email}
              />
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button onClick={handleSignOut}>Logout</Button>
              </Box>
            </Card>
          </Popover>
        </Toolbar>
      </AppBar>
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;
