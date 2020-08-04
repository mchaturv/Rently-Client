import React, { Component, useState } from "react";
import "../App.css";
import MaterialButton from "../components/MaterialButton";
import Labels from "../labels";
import MaterialInput from "../components/MaterialInput";
import {
  Box,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import MaterialCard from "../components/MaterialCard";
import MaterialTypography from "../components/MaterialTypography";
import MainSearchField from "../components/MainSearchField";
import Header from "../molecules/Header";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { formValidate: false };
  }
  toggleTitle() {
    this.setState({ showTitle: false });
  }
  formValidateFunction(trigger) {
    if (trigger) {
      this.setState({ formValidate: true });
    }
  }
  render() {
    return (
      <div>
        <Header userPage></Header>
        <Grid container>
          <Box m={2} pt={3}></Box>
        </Grid>

        <Grid container>
          <Grid item xs={5}></Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
