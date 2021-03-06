// Author - Anshdeep Singh (an450723@dal.ca)

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { userService } from "../services/user.service";
import { useLocation, useHistory } from "react-router-dom";
import MultipleDatesPicker from "@randex/material-ui-multiple-dates-picker";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import * as PropertyDetails from "../Property/propertydetails";
import { appointmentService } from "../services/appointment.service";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "40%",
    backgroundColor: theme.palette.background.paper,
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 4, 3),
    justifyContent: "center",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

var selectedSlot = "";

const BookingComponent = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSlot.length == 0) {
      alert("Please select the time slot");
    } else {
      let user = JSON.parse(localStorage.getItem("user"));

      if (user != null) {
        console.log("token: " + user.token);
        var jwt = require("jsonwebtoken");

        var userId = jwt.decode(user.token).sub;

        appointmentService
          .makeAppointment(PropertyDetails.propertyId, userId, selectedSlot)
          .then(
            () => {
              alert("Appointment booked for this property!");
            },
            (error) => alert(error)
          );
      } else {
        alert("You need to login to make an appointment!");
      }
    }
    handleClose();
  };

  const [slot, setSlot] = React.useState("");

  //set slot values from api
  const handleChange = (event) => {
    setSlot(event.target.value);
    selectedSlot = event.target.value;
  };

  const body = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Schedule a Visit
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <br />
          <InputLabel id="demo-simple-select-required-label">
            Select an available time slot
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={slot}
            onChange={handleChange}
          >
            <MenuItem value={"Fri Aug 07 2020, 07:30 to 10:30"}>
              Fri Aug 07 2020, 07:30 to 10:30
            </MenuItem>
            <MenuItem value={"Sat Aug 08 2020, 07:30 to 10:30"}>
              Sat Aug 08 2020, 07:30 to 10:30
            </MenuItem>
            <MenuItem value={"Sun Aug 09 2020, 07:30 to 10:30"}>
              Sun Aug 09 2020, 07:30 to 10:30
            </MenuItem>
          </Select>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send request
          </Button>
          <Grid container>
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  return (
    <div>
      <div onClick={handleOpen}>{props.children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default BookingComponent;
