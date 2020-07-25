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
import Labels from "../labels";
import MaterialButton from "../components/MaterialButton";
import MaterialPaper from "../components/MaterialPaper";
import React, { useState } from "react";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import MaterialTypography from "../components/MaterialTypography";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ListIcon from "@material-ui/icons/List";
import Skeleton from "@material-ui/lab/Skeleton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MaterialModal from "../components/MaterialModal";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import LogoutModal from "../components/LogoutModal";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";

const Header = (props) => {
  const [formValidate, setFormValidate] = useState(false);
  const formValidateFunction = (trigger) => {
    if (trigger) {
      setFormValidate(true);
    }
  };

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

  return (
    <MaterialPaper paddingRight={3}>
      {!props.userPage && (
        <Box display="flex" p={1}>
          <Box p={1} flexGrow={1}>
            <img src={Logo} width={160} />
          </Box>
          <Box>
            <Link to="/faq">
              <Button size="large" style={{height:"100%", fontSize: "large"}}>
                FAQ
              </Button>
            </Link>
          </Box>
          <Box>
            <Divider color={"#424242"} variant={"vertical"}/>
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
          <Box>
            <PopupState variant="popper" popupId="notification_popper">
              {(popupState) => (
                <ClickAwayListener onClickAway={popupState.close}>
                  <div>
                    <IconButton {...bindToggle(popupState)}>
                      <NotificationsIcon fontSize={"large"} />
                    </IconButton>

                    <Popper {...bindPopper(popupState)} transition>
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper>
                            <MaterialTypography
                              variant={"subtitle1"}
                              text={"Notifications go here"}
                            ></MaterialTypography>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </div>
                </ClickAwayListener>
              )}
            </PopupState>
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
