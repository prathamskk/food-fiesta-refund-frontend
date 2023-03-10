import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import React, { useEffect, useState } from "react";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import CollapsibleTable from "./OrderTable";
import { useMenu } from "../context/MenuContext";
import { getFirebase } from "../utils/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
const OrderCard = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { order } = props;
  const handleRefund = async (order, stallID) => {
    const { firestore } = getFirebase();
    const docRef = doc(firestore, "orders", order.id);
    const updatedOrder = order;
    delete updatedOrder.id;
    updatedOrder.stall_order[stallID].status = "refunded"

    console.log("updating to ", updatedOrder.stall_order[stallID].status);
    await updateDoc(docRef, updatedOrder);
    setOpen(false);
  }

  const paidstyleobject = {
    bgcolor: "#d4edda",
    color: "#155724",
    textOverflow: "ellipsis",
  }

  const unpaidstyleobject = {
    bgcolor: "#f8d7da",
    color: "#721c24",
    textOverflow: "ellipsis",
  }


  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardHeader
        sx={order.payment_status === "unpaid" || order.payment_status === "cancelled" ? unpaidstyleobject : paidstyleobject}
        title={
          <Stack justifyContent="flex-start" alignItems="flex-start">
            <Container maxWidth={false} disableGutters>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Button color="inherit">#{order.order_id}</Button>
                <Button color="inherit" startIcon={order.payment_status === "unpaid" ? <MoneyOffIcon /> : order.payment_status === "paid" ? <CurrencyRupeeIcon /> : <DoDisturbIcon />}>
                  {order.payment_status}
                </Button>
              </Stack>
            </Container>

            <Typography variant="body2">{order.user_info.name}</Typography>
            <Typography variant="caption">{order.user_info.email}</Typography>
            <Typography variant="caption">{order.user_info.phoneNumber}</Typography>
          </Stack>
        }
      />
      <CardContent sx={{ p: 0 }}>
        <CollapsibleTable rows={order} handleRefund={handleRefund} />
      </CardContent>
    </Card>
  );
};

export default OrderCard;
