import React from "react";
import { Box } from "@mui/system";
import GoogleButton from "react-google-button";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  Typography,
  CardActions,
  CardContent,
  Button,
  Grid,
  Container,
  CardHeader,
  IconButton,
  Stack,
} from "@mui/material";
const Login = () => {

  const { handleGoogleLogin, user } = useAuth();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Stack direction="column" justifyContent="center"
        alignItems="center">

        <Typography variant="h2">Zaika</Typography>
        <Typography variant="h6">Cashier Application</Typography>
        <GoogleButton
          onClick={() => handleGoogleLogin()}
        />
      </Stack>
    </Box>
  )
};

export default Login;
