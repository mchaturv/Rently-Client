// Author - Vikram Singh (vikram.singh@dal.ca)

import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../molecules/Header";
import Box from "@material-ui/core/Box";
import MaterialTypography from "../components/MaterialTypography";
import FaqComponent from "../components/FaqComponent";

class PostAd extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <Box mt={10} ml={20} mr={20}>
                    <Grid container>
                        <MaterialTypography variant={"h4"} text={"FAQs"}></MaterialTypography>
                    </Grid>
                    <Grid container>
                        <FaqComponent/>
                    </Grid>
                </Box>
            </div>
        )
    }
}

export default PostAd;
