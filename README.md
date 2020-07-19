<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md ---> 

# Assignment - 2

Rently is a website for real-estate property leasing.

* *Date Created*: 1 JUN 2020
* *Last Modification Date*: 14 JUN 2020

## Authors

[Vikram Singh](vikram.singh@dal.ca)

##Git repository
Rently - [Click here](https://github.com/neatcoder/A2_VIKRAM_SINGH)


## Deployment info
 As a part of this assignment, the following four pages have been developed:
 * [User profile](https://vikramsingh.herokuapp.com/userprofile) - Page where users login and sign up, like Facebook.
 * [Home page](https://vikramsingh.herokuapp.com/home) - Home page which is the main page of the website where users can search properties.
 * [Posting advertisement](https://vikramsingh.herokuapp.com/postad) - On this page users can post advertisement by filling a simple form.
 * [FAQ](https://vikramsingh.herokuapp.com/faq) - FAQs page.


## Built With

* [Create-react-app](https://github.com/facebook/create-react-app) - Set up bioler plate code for a react app
* [ReactJS](https://github.com/facebook/react) - JS library for building webapps
* [Material-UI](https://github.com/mui-org/material-ui) - Material design react components
* [NodeJS](https://nodejs.org/) - JS runtime environment for server side scripting
* [NPM](https://github.com/npm/cli) - Node package manager
* [Heroku](https://heroku.com/) - Cloud platform used for hosting webapps

## Sources Used

###Images: 

Personal photo collection © [Vikram Singh](vikram.singh@dal.ca)

###Logo:
[Vectr.com](https://vectr.com) - Draw SVG

###Header.js

*Lines 35 - 55*

```
<PopupState variant="popper" popupId="calendar_popper">
    {(popupState) => (
        <ClickAwayListener onClickAway={popupState.close}>
            <div>
                <IconButton {...bindToggle(popupState)}>
                    <DateRangeIcon fontSize={"default"}/>
                </IconButton>

                <Popper {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <MaterialTypography variant={"subtitle1"} text={"appointments popper"}></MaterialTypography>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        </ClickAwayListener>
    )}
</PopupState> 

```

The code above was created by adapting the code in [MaterialUI Popper](https://material-ui.com/components/popper/) as shown below: 

```
<PopupState variant="popper" popupId="demo-popup-popper">
  {(popupState) => (
    <div>
      <Button variant="contained" color="primary" {...bindToggle(popupState)}>
        Toggle Popper
      </Button>
      <Popper {...bindPopper(popupState)} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography className={classes.typography}>The content of the Popper.</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  )}
</PopupState>

```

- [MaterialUI Popper](https://material-ui.com/components/popper/) is developed by [Material-UI SAS, Paris](https://material-ui.com/company/about/).
- [MaterialUI Popper](https://material-ui.com/components/popper/) was used because the component snippet was useful for the Notification pop-up. 
- [MaterialUI Popper](https://material-ui.com/components/popper/) code modified by [Vikram Singh](vikram.singh@dal.ca)

## Acknowledgments

* MaterialUI has made the react web development easier by providing a lot of customizable components which fit well in the react eco-system.
