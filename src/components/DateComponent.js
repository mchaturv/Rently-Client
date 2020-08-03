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

export var selectedDates = [];
export var fromTime = "07:30";
export var toTime = "08:30";

const DateComponent = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const [dateopen, setDateOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected dates= " + selectedDates);
    console.log("Selected time= " + fromTime + " to " + toTime);
    handleClose();
    // create visit hours table with propertyid
    // call api to add time hours to database
  };

  const handleFromTimeChange = (e) => {
    console.log("From time: " + e.target.value);
    fromTime = e.target.value;
  };
  const handleToTimeChange = (e) => {
    console.log("To time: " + e.target.value);
    toTime = e.target.value;
  };

  const handleDateSubmit = (dates) => {
    console.log("selected dates", dates);
    selectedDates = dates;
    setDateOpen(false);
  };

  const body = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Set Visit Hours
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setDateOpen(!dateopen)}
            className={classes.submit}
          >
            Select Dates
          </Button>

          <MultipleDatesPicker
            open={dateopen}
            selectedDates={selectedDates}
            onCancel={() => setDateOpen(false)}
            onSubmit={(dates) => handleDateSubmit(dates)}
          />

          <Typography component="h3">Set Hours</Typography>

          <TextField
            id="time"
            label="From"
            type="time"
            defaultValue={fromTime}
            onChange={(e) => {
              handleFromTimeChange(e);
            }}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />

          <TextField
            id="time"
            label="To"
            type="time"
            defaultValue={toTime}
            className={classes.textField}
            onChange={(e) => {
              handleToTimeChange(e);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Set
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
export default DateComponent;
