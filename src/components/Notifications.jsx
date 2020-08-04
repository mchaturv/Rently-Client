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
import Button from "@material-ui/core/Button";
import MaterialButton from "./MaterialButton";
import Box from "@material-ui/core/Box";


class Notifications extends Component{

    constructor(props) {
        super(props);
        this.state={
            notifications:[],
            noNewNotifications:true
        }
    }

    returnPostParams(data){
        return {
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
            body: JSON.stringify(data)
        }
    }
    componentDidMount() {
        var auth = JSON.parse(localStorage.getItem('user'));

        if(auth){
            let userID = auth.userID;

            fetch(`${process.env.REACT_APP_API_URL}/notifications/getAllNotifications`, this.returnPostParams({userID: userID}))
                .then(response=>response.json())
                .then(response=>{
                    response.forEach((notification)=>{
                        if(notification.seller._id==userID && notification.actor=="seller"){
                            notification.visible=true;
                            this.setState({noNewNotifications: false});

                        } else if(notification.buyer._id==userID && notification.actor=="buyer"){
                            notification.visible=true;
                            this.setState({noNewNotifications: false});
                        }
                    });

                    this.setState({notifications:response});
                })
                .catch(err=>console.log(err))
        }

    }

    handleAccept(bool, notification){
            fetch(`${process.env.REACT_APP_API_URL}/notifications/updateNotification`, this.returnPostParams({id: notification._id, status:"accept", actor:"buyer"}))
                .then(response=>response.json())
                .then(response=>{
                    notification.visible=false;
                    this.forceUpdate();
                })
                .catch(err=>console.log(err))
    }

    handleDecline(bool, notification){
            fetch(`${process.env.REACT_APP_API_URL}/notifications/updateNotification`, this.returnPostParams({id: notification._id, status:"decline", actor:"buyer"}))
                .then(response=>response.json())
                .then(response=>{
                    notification.visible=false;
                    this.forceUpdate();
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

                                                {
                                                    this.state.noNewNotifications ?
                                                        <MaterialTypography variant={"h6"} text={"No new notifications"}/>
                                                    :
                                                    this.state.notifications.map((notification,index)=>{
                                                            return(
                                                                <React.Fragment>
                                                                    <ListItem alignItems="flex-start" hidden={!notification.visible}>
                                                                        <ListItemAvatar>
                                                                            <Avatar alt="Remy Sharp" src={notification.property.imageurl[0]} />
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            primary={notification.property.title}
                                                                            secondary={
                                                                                <React.Fragment>
                                                                                    {
                                                                                        notification.actor=="seller" &&
                                                                                        "Please accept this request"
                                                                                    }
                                                                                    {
                                                                                        notification.actor=="buyer" && notification.status=="accept" &&
                                                                                        "Your appointment request has been accepted"
                                                                                    }
                                                                                    {
                                                                                        notification.actor=="buyer" && notification.status=="decline" &&
                                                                                        "Your appointment request has been declined"
                                                                                    }
                                                                                </React.Fragment>
                                                                            }
                                                                        />
                                                                    </ListItem>
                                                                    <ListItem hidden={!notification.visible || notification.actor=="buyer"}>
                                                                        <MaterialButton text={"Accept"} color="primary" callback={this.handleAccept.bind(this)} callbackObject={notification}>
                                                                        </MaterialButton><Box pl={2}></Box>
                                                                        <MaterialButton text={"Decline"}color="secondary" callback={this.handleDecline.bind(this)} callbackObject={notification}>
                                                                        </MaterialButton>
                                                                    </ListItem>
                                                                    <Divider variant="inset" component="li" hidden={!notification.visible}/>
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

