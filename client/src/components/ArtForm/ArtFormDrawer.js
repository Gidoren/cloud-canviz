import React, { Children, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import { AutoScaling } from "aws-sdk";
import Modal from "@material-ui/core/Modal";
import { Grid, Button, Paper } from "@material-ui/core";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const drawerWidth = 150;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36,
    color: "#fff"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(6) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  title: {
    color: "#fff"
  },
  content: {
    overflowY: "auto",
    height: "auto",
    maxHeight: "calc(100vh - 64px)",
    flexGrow: 1
  },
  modal: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[7],
    padding: theme.spacing(2, 2),
    overflow: "hidden",
    borderRadius: "6px"
  },
  modalText: {
    paddingLeft: "5px"
  }
}));

const ArtFormDrawer = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  //Delete Verification Modal vars
  const [openDelModal, setOpenDelModal] = React.useState(false);

  // const [modalState, setModalState] = React.useState({
  //   artId: props.artId,
  //   artTitle: props.arTitle,
  //   artUrl: props.artUrl
  // });

  const [modalState, setModalState] = React.useState({
    artId: null,
    artTitle: null,
    artUrl: null
  });

  useEffect(() => {
    setModalState({
      artId: props.artId,
      artTitle: props.artTitle,
      artUrl: props.artUrl
    });
  }, [props.artId, props.artTitle, props.artUrl]);

  const handleOpenDelModal = () => {
    setOpenDelModal(true);
  };

  const handleCloseDelModal = () => {
    setOpenDelModal(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [removeArt, { data }] = useMutation(REMOVE_ART);

  const handleVerifyDelete = () => {
    if (modalState.artId) {
      handleOpenDelModal();
    }
  };

  const handleDeleteArt = () => {
    removeArt({ variables: { artId: modalState.artId } })
      .then(res => {
        console.log("removeArt gql response: ", res);
        props.handleRefetch();
      })
      .then(() => {
        handleCloseDelModal();
        props.handleHideModal();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          {modalState.artId && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title} noWrap>
            ART FORM
          </Typography>
        </Toolbar>
      </AppBar>
      {modalState.artId && (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button key="Delete" onClick={handleVerifyDelete}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </ListItem>
            <Divider />
          </List>
        </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openDelModal}
        onClose={handleCloseDelModal}
      >
        <div
          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
          className={classes.modal}
        >
          {/* <Paper className={classes.modal}> */}
          <Grid
            container
            spacing={3}
            alignContent="center"
            alignItems="center"
            justify="center"
          >
            <Grid container item xs={5} spacing={2}>
              <img
                style={{ width: "100%", maxHeight: "100%", margin: "0 auto" }}
                src={modalState.artUrl}
              ></img>
            </Grid>
            <Grid
              container
              item
              xs={7}
              direction="column"
              spacing={2}
              alignContent="center"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.modalText}>
                  Are You sure you want to delete {modalState.artTitle}?
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                spacing={2}
                alignContent="center"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleCloseDelModal}
                  >
                    No, Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleDeleteArt}
                  >
                    Yes, DELETE
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

export default ArtFormDrawer;

const REMOVE_ART = gql`
  mutation removeArt($artId: String) {
    removeArt(artId: $artId) {
      _id
      title
      artist
    }
  }
`;
