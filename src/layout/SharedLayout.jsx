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

import SearchBar from "../components/SearchBar";
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

      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;
