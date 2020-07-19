import React, {Component, useState} from 'react';
import '../App.css';
import MaterialButton from '../components/MaterialButton';
import Labels from '../labels';
import MaterialInput from "../components/MaterialInput";
import {Box, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import MaterialCard from "../components/MaterialCard";
import MaterialTypography from "../components/MaterialTypography";
import MainSearchField from "../components/MainSearchField";
import Header from "../molecules/Header";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state={formValidate:false};
    }
    toggleTitle() {
        this.setState({showTitle:false})
    }
    formValidateFunction (trigger){
        if(trigger){
            this.setState({formValidate:true});
        }
    }
    render() {
        return (
            <div>
                <Header userPage></Header>
                <Grid container>
                    <Box m={2} pt={3}>
                    </Box>
                </Grid>
                <Grid container>
                    <Grid item xs={5}>
                        <MaterialTypography variant="h4" component="h4" paddingTop={4} paddingBottom={4} align={"center"} text={Labels.searchHomes}>
                        </MaterialTypography>
                        <Grid container justify={"center"}>
                            <MainSearchField placeholder={Labels.search} widthPercent={75} callback={this.toggleTitle.bind(this)}></MainSearchField>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={5}>
                        <MaterialCard raised={true}>
                            <CardContent>
                                <Typography variant="h4" component="h4">
                                    {Labels.signUp}
                                </Typography>
                                <Typography variant="subtitle1" component="span">
                                    {Labels.createAccountSubtitle}
                                </Typography>
                            </CardContent>
                            <CardContent><MaterialInput text={Labels.userEmail} formValidate={this.state.formValidate}/></CardContent>
                            <CardContent><MaterialInput text={Labels.password} formValidate={this.state.formValidate}/></CardContent>
                            <CardContent><MaterialInput text={Labels.confirmPassword} formValidate={this.state.formValidate}/></CardContent>
                            <CardContent>
                                <MaterialButton text={Labels.signUp} formValidate={this.state.formValidate} callback={this.formValidateFunction.bind(this)}></MaterialButton>
                            </CardContent>
                        </MaterialCard>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default UserProfile;