import React, {Component} from "react";
import Header from "../molecules/Header";
import {Box, Grid} from "@material-ui/core";
import MaterialTypography from "../components/MaterialTypography";
import Labels from "../labels";
import MainSearchField from "../components/MainSearchField";
import Collapse from "@material-ui/core/Collapse";
import PropertyCard from "../components/PropertyCard";
import Picture1 from "../images/IMG_1187.JPG";
import Picture2 from "../images/IMG_2221.JPG";
import Picture3 from "../images/IMG_2224.JPG";
import Picture4 from "../images/room.jpeg";
import PictureMap from "../images/map.png";
import Divider from "@material-ui/core/Divider";
import MaterialButtonGroup from "../components/MaterialButtonGroup";
import MaterialRangeSlider from "../components/MaterialRangeSlider";
import MaterialNormalSlider from "../components/MaterialNormalSlider";
class Homepage extends Component{
    constructor(props) {
        super(props);
        this.state={
            showTitle: true
        };
    }

    toggleTitle() {
        this.setState({showTitle:false})
    }

    render() {
        return(
            <div>
                <Header></Header>
                <Grid container>
                    <Box m={2} pt={3}>
                    </Box>
                </Grid>
                <Grid container justify={"center"}>
                    <Collapse in={this.state.showTitle}>
                        <MaterialTypography variant="h4" component="h4" paddingTop={4} paddingBottom={4} align={"center"} text={Labels.searchHomes}>
                        </MaterialTypography>
                    </Collapse>
                </Grid>
                <Grid container justify={"center"}>
                            <MainSearchField placeholder={Labels.search} widthPercent={75} callback={this.toggleTitle.bind(this)}></MainSearchField>
                </Grid>
                <Grid container>
                    <Box m={2} pt={3}>
                    </Box>
                </Grid>
                <Grid container>
                    <Grid item xs={7}>
                        <MaterialTypography variant={"h4"} text={"Search results for 'Halifax' location"}></MaterialTypography>
                        <Divider variant="middle" />
                        <Box m={2} style={{height:"75vh", overflowY:"scroll"}}>
                            <PropertyCard picture={Picture1}></PropertyCard>
                            <PropertyCard picture={Picture2}></PropertyCard>
                            <PropertyCard picture={Picture3}></PropertyCard>
                            <PropertyCard picture={Picture4}></PropertyCard>
                            <PropertyCard picture={Picture1}></PropertyCard>
                            <PropertyCard picture={Picture2}></PropertyCard>
                            <PropertyCard picture={Picture3}></PropertyCard>
                            <PropertyCard picture={Picture4}></PropertyCard>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box m={2}>
                        <img src={PictureMap} width="100%"/>
                        </Box>
                        <Grid container>
                            <MaterialTypography variant={"h6"} text={"Property type:"} paddingBottom={1}></MaterialTypography>
                        </Grid>
                        <Grid container>
                            <MaterialButtonGroup paddingTop={1}></MaterialButtonGroup>
                        </Grid>
                        <Grid container>
                            <MaterialNormalSlider></MaterialNormalSlider>
                        </Grid>
                        <Grid container>
                            <MaterialRangeSlider></MaterialRangeSlider>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Homepage;