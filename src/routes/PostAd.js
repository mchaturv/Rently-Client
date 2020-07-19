import React, {Component, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../molecules/Header";
import Box from "@material-ui/core/Box";
import MaterialCard from "../components/MaterialCard";
import MaterialTypography from "../components/MaterialTypography";
import MaterialButton from "../components/MaterialButton";
import MaterialInput from "../components/MaterialInput";
import MaterialSelect from "../components/MaterialSelect";
import MaterialButtonGroup from "../components/MaterialButtonGroup";
import DateRangeIcon from '@material-ui/icons/DateRange';
import IconButton from "@material-ui/core/IconButton";
import {Modal} from "@material-ui/core";
import MaterialModal from "../components/MaterialModal";

class PostAd extends Component {
    constructor(props) {
        super(props);
        this.state={formValidate:false};
    }
    formValidateFunction (trigger){
        if(trigger){
            this.setState({formValidate:true});
        }
    }
    render() {
        return (
            <div>
                <Header></Header>
                <Box m={3} pt={2}>
                </Box>
                <Grid container justify={"center"}>
                    <MaterialCard width={"40%"} raised={true}>
                        <div style={{textAlign: "center"}}>
                            <MaterialTypography paddingBottom={1} variant={"h4"} text={"Create an advertisement"}/>
                            <MaterialTypography paddingTop={1} paddingBottom={1} variant={"subtitle1"} text={"Fill all the details"} color={"textSecondary"}/>
                            <MaterialInput text={"Street Address"} marginTop={2} formValidate={this.state.formValidate}></MaterialInput>
                            <MaterialInput text={"Street Address"} marginTop={3} formValidate={this.state.formValidate}></MaterialInput>

                            <Grid container spacing={3}>
                                <Grid item xs={7}>
                                    <MaterialInput text={"City"} marginTop={3} formValidate={this.state.formValidate}/>
                                </Grid>
                                <Grid item xs={5}>
                                    <MaterialInput text={"State/Province"} marginTop={3} formValidate={this.state.formValidate}/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <MaterialInput text={"Postal/Zip Code"} marginTop={3} formValidate={this.state.formValidate}></MaterialInput>
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialSelect text={"Country"} marginTop={3} formValidate={this.state.formValidate}></MaterialSelect>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={3}>
                                            <MaterialSelect text={""} marginTop={3} formValidate={this.state.formValidate}></MaterialSelect>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <MaterialInput text={"Amount"} marginTop={3} formValidate={this.state.formValidate}></MaterialInput>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialButtonGroup paddingLeft={1} paddingTop={3}></MaterialButtonGroup>
                                </Grid>
                            </Grid>
                            <Grid container alignItems={"center"}>
                                <span>Schedule visit hours:</span>
                                <MaterialModal>
                                    <IconButton type="submit" style={{position:"relative"}}>
                                        <DateRangeIcon />
                                    </IconButton>
                                </MaterialModal>
                            </Grid>
                        </div>
                        <div style={{textAlign:"right"}}>
                            <MaterialButton text={"Create"} formValidate={this.state.formValidate} callback={this.formValidateFunction.bind(this)}/>
                        </div>
                    </MaterialCard>
                </Grid>
            </div>
        )
    }
}

export default PostAd;