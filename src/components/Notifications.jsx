// Author - Vikram Singh (vikram.singh@dal.ca)

import React, {Component} from "react";
import {ClickAwayListener, Fade, IconButton, Paper, Popper} from "@material-ui/core";
import PopupState, {bindPopper, bindToggle} from "material-ui-popup-state";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MaterialTypography from "./MaterialTypography";
import {makeStyles} from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         maxWidth: '36ch',
//         backgroundColor: theme.palette.background.paper,
//     },
//     inline: {
//         display: 'inline',
//     },
// }));
//
// const classes = useStyles();

class Notifications extends Component{

    constructor(props) {
        super(props);
        this.state={notifications:[]}
    }
    componentDidMount() {
        let userID = "5f1a2685a6e8c002481bcb6e";

        fetch(`${process.env.REACT_APP_API_URL}/notifications/getAllNotifications`,{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({userID: userID})
        })
            .then(response=>response.json())
            .then(response=>{
                response.forEach((notification)=>{
                    if(notification.seller._id==userID && notification.actor=="seller"){
                        notification.visible=true;
                    } else if(notification.buyer._id==userID && notification.actor=="buyer"){
                        notification.visible=true;
                    }
                });

                this.setState({notifications:response});
            })
            .catch(err=>console.log(err))
    }

    render() {
        return(
            <PopupState variant="popper" popupId="notification_popper">
                {(popupState) => (
                    <ClickAwayListener onClickAway={popupState.close}>
                        <div>
                            <IconButton {...bindToggle(popupState)}>
                                <NotificationsIcon fontSize={"large"}/>
                            </IconButton>

                            <Popper {...bindPopper(popupState)} transition>
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Paper>
                                            <List>

                                                {/*<ListItem alignItems="flex-start">*/}
                                                {/*    <ListItemAvatar>*/}
                                                {/*        <Avatar alt="Remy Sharp" src={require('../images/search.png')} />*/}
                                                {/*    </ListItemAvatar>*/}
                                                {/*    <ListItemText*/}
                                                {/*        primary={"sdfsdfsfsff"}*/}
                                                {/*        secondary={*/}
                                                {/*            <React.Fragment>*/}
                                                {/*                {"Please accept this request"}*/}
                                                {/*            </React.Fragment>*/}
                                                {/*        }*/}
                                                {/*    />*/}
                                                {/*</ListItem>*/}
                                                {/*<Divider variant="inset" component="li" />*/}

                                                {
                                                    this.state.notifications.map((notification,index)=>{
                                                        return(
                                                            <React.Fragment>
                                                                <ListItem alignItems="flex-start">
                                                                    <ListItemAvatar>
                                                                        <Avatar alt="Remy Sharp" src={notification.property.imageurl[0]} />
                                                                    </ListItemAvatar>
                                                                    <ListItemText
                                                                        primary={notification.property.title}
                                                                        secondary={
                                                                            <React.Fragment>
                                                                                {"Please accept this request"}
                                                                            </React.Fragment>
                                                                        }
                                                                    />
                                                                </ListItem>
                                                                <Divider variant="inset" component="li" />
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </List>
                                        </Paper>
                                    </Fade>
                                )}
                            </Popper>
                        </div>
                    </ClickAwayListener>
                )}
            </PopupState>
        )
    }
}

export default Notifications;

