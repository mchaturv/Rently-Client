import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MaterialTypography from "./MaterialTypography";
import EventIcon from '@material-ui/icons/Event';
import Box from "@material-ui/core/Box";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import MaterialModal from "./MaterialModal";

const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
        margin:16
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto'
    },
    cover: {
        width: 151
    }
})
);

const MaterialButton = (props) => {
    const classes=useStyles();

    return (
        <Card className={classes.root} >
            <CardMedia
                className={classes.cover}
                image={props.picture}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        Amazing location on the outskirts of Halifax
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <Box display="flex" p={1} >
                        <Box p={1} flexGrow={1} >
                            <MaterialTypography variant="h5" paddingTop={1} paddingBottom={1} color="textSecondary" text={"$1000"}/>
                        </Box>
                        <Box p={1}>
                            <MaterialModal>
                                <IconButton>
                                    <EventIcon/>
                                </IconButton>
                            </MaterialModal>
                        </Box>
                        <Box p={1}>
                            <MaterialModal>
                                <IconButton>
                                    <ChatBubbleIcon/>
                                </IconButton>
                            </MaterialModal>
                        </Box>
                    </Box>
                </div>
            </div>
        </Card>
    )
};

export default MaterialButton;