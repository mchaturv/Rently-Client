import {
  Grid,
  Popper,
  Fade,
  Paper,
  IconButton,
  ClickAwayListener,
  Box,
} from "@material-ui/core";
import Logo from "../images/rentlyLogo.png";
import MaterialInput from "../components/MaterialInput";
import Notifications from "../components/Notifications";
import Labels from "../labels";
import MaterialButton from "../components/MaterialButton";
import MaterialPaper from "../components/MaterialPaper";
import React, { useState } from "react";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import MaterialTypography from "../components/MaterialTypography";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Skeleton from "@material-ui/lab/Skeleton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import LogoutModal from "../components/LogoutModal";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ListIcon from '@material-ui/icons/List';
import Divider from "@material-ui/core/Divider";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const [formValidate, setFormValidate] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const formValidateFunction = (trigger) => {
    if (trigger) {
      setFormValidate(true);
    }

  };

  const history = useHistory();

  const loginState = localStorage.getItem("user") ? (
    <LogoutModal>
      <IconButton>
        <ExitToAppIcon fontSize={"large"} />
      </IconButton>
    </LogoutModal>
  ) : (
      <LoginModal>
        <IconButton>
          <AccountCircleIcon fontSize={"large"} />
        </IconButton>
      </LoginModal>
    );

  const registerState = localStorage.getItem("user") ? (
    <></>
  ) : (
      <RegisterModal>
        <IconButton>
          <PersonAddIcon fontSize={"large"} />
        </IconButton>
      </RegisterModal>
    );

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <MaterialPaper paddingRight={3}>
      {!props.userPage && (
        <Box display="flex" p={1}>
          <Box p={1} flexGrow={1} >
            <img src={Logo} width={160} style={{cursor:"pointer"}} onClick={() => history.push('/')}/>
          </Box>
          <Box>
            <Link to="/faq">
              <Button size="large" style={{ height: "100%", fontSize: "large" }}>
                FAQ
              </Button>
            </Link>
          </Box>
          <Box>
            <Divider color={"#424242"} variant={"vertical"} />
          </Box>
          <Box>
            <PopupState variant="popper" popupId="calendar_popper">
              {(popupState) => (
                <ClickAwayListener onClickAway={popupState.close}>
                  {loginState}
                </ClickAwayListener>
              )}
            </PopupState>
          </Box>

          <Box>
            <PopupState variant="popper" popupId="calendar_popper">
              {(popupState) => (
                <ClickAwayListener onClickAway={popupState.close}>
                  {registerState}
                </ClickAwayListener>
              )}
            </PopupState>
          </Box>

          {localStorage.getItem("user") ? (

          <Box>
            <PopupState variant="popper" popupId="notification_popper">
              {(popupState) => (
                <ClickAwayListener onClickAway={popupState.close}>
                  <div>
                  <IconButton {...bindToggle(popupState)} onClick={handleClick}>
                      <ListIcon fontSize={"large"} />
                    </IconButton>

                    <Menu
                      id="customized-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => history.push('/favourite')}>
                        <ListItemIcon color = "primary">
                          <FavoriteIcon  fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Favourites" />
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon >
                          <IconButton  fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="other goes here" />
                      </MenuItem>

                  </Menu>
                </div>

                </ClickAwayListener>
              )}
            </PopupState>
          </Box>

          ):(<></>)
          }

          <Box>
            <Notifications/>
          </Box>
        </Box>
      )}
      {props.userPage && (
        <Box display="flex" p={1}>
          <Box p={1} flexGrow={1}>
            <img src={Logo} width={160} />
          </Box>
          <Box p={1}>
            <Grid item>
              <MaterialInput text={Labels.user} formValidate={formValidate} />
            </Grid>
          </Box>
          <Box p={1}>
            <Grid item>
              <MaterialInput
                text={Labels.password}
                formValidate={formValidate}
              />
            </Grid>
          </Box>
          <Box p={1}>
            <Grid item>
              <MaterialButton
                text={Labels.login}
                formValidate={formValidate}
                callback={formValidateFunction}
              />
            </Grid>
          </Box>
        </Box>
      )}
    </MaterialPaper>
  );
};

export default Header;
