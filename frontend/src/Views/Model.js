import React, {forwardRef, useRef} from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {AddBox, Create, Add, Search, Cached, Stop, CloudDownload, Delete, CloudUpload} from "@material-ui/icons";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import Switch from '@material-ui/core/Switch';
import Paper from "@material-ui/core/Paper";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Dialog,
  DialogTitle, DialogContent, DialogContentText, TextField, DialogActions
} from '@material-ui/core';
import * as FetchData from "../FetchData";
import {Message} from "./Message";
import DropArea from "./DropArea";

const useStyles = makeStyles(theme => ({
  grid: {
    //backgroundColor:'red',
  },
  searchButton: {
    position: 'relative',
  },
  main: {
    paddingTop: 24,
  },
  media: {
    height: 240,
  },
  card: {
    margin: 16
  },
  date: {
    textAlign: 'left',
    paddingLeft: 12,
  }

}));

const MyDialog = forwardRef((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [callback, setCallback] = React.useState(null);
  const [data, setData] = React.useState("");

  const handleDataIdChange = (event) => {
    setData(event.target.value);
  };

  React.useImperativeHandle(ref, () => ({
    handleClickOpen(callback) {
      setCallback(() => callback);
      setOpen(true);
    }
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    handleClose();
    callback(data);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">Upload Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.text}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={props.label}
            fullWidth
            onChange={handleDataIdChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

class ModelTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rows: []};
    this.runDialog = React.createRef();
    this.renameDialog = React.createRef();
  }

  fetchData() {
    FetchData.getModelList().then((rows) => {
      this.setState({rows: rows});
    });
  }

  removeCallback(id) {
    return () => {
      FetchData.deleteModel(id).then(() => {
        this.props.sendMessage(["success", "Model Removed!"]);
        this.fetchData();
      });
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  shareCallback(id) {
    return event => {
      FetchData.shareModel(id, event.target.checked).then(() => {
        this.props.sendMessage(["success", "Model Sharing Setting Changed!"]);
        this.fetchData();
      });
    };
  }

  runModelCallback(id) {
    return (dataId) => {
      FetchData.createTask("prediction", dataId, id).then(() => {
        this.props.sendMessage(["success", "Prediction Task Created!"]);
      }).catch((error) => {
        this.props.sendMessage(["error", "Invalid Data ID"]);
      });
    };
  }

  renameCallback(id) {
    return (name) => {
      FetchData.renameModel(id, name).then(() => {
        this.props.sendMessage(["success", "Model Renamed!"]);
        this.fetchData();
      }).catch((error) => {
        this.props.sendMessage(["error", "Rename Failed"]);
      });
    };
  }

  render() {
    return <TableContainer component={Paper}>
      <Table className={this.props.classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Onwer</TableCell>
            <TableCell align="left">Share</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map(row => (
            <TableRow key={row[0]}>
              <TableCell scope="row">{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[3] ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Switch
                  disabled={!row[3]}
                  checked={Boolean(row[2])}
                  onChange={this.shareCallback(row[0])}
                  inputProps={{'aria-label': 'secondary checkbox'}}
                />
              </TableCell>
              <TableCell>
                <Button size="small" color="primary" onClick={
                  () => {
                    this.runDialog.current.handleClickOpen(this.runModelCallback(row[0]))
                  }
                }>
                  Run
                </Button>
                <Button size="small" color="primary" onClick={
                  () => {
                    this.renameDialog.current.handleClickOpen(this.renameCallback(row[0]))
                  }
                } disabled={!row[3]}>
                  Rename
                </Button>
                <Button size="small" color="primary" onClick={this.removeCallback(row[0])} disabled={!row[3]}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MyDialog text="Please enter the Data ID that is used for making prediction."
                label="Data ID" ref={this.runDialog}/>
      <MyDialog text="Please enter the new name of this model."
                label="Name" ref={this.renameDialog}/>
    </TableContainer>
  }
}

export default function Model() {
  const [message, setMessage] = React.useState(["", ""]);
  const messageRef = React.useRef();
  const tableRef = useRef();
  const dialogRef = useRef();
  const sendMessage = (m) => {
    setMessage(m);
    messageRef.current.setOpen(true);
  };

  const createNewModel = (dataId) => {
    FetchData.createTask("training", dataId).then(() => {
      sendMessage(["success", "Model Created!"]);
      tableRef.current.fetchData();
    }).catch((error) => {
      sendMessage(["error", "Invalid Data ID"]);
    });
  };

  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item xs={4} justify={'flex-start'} container>
          <Grid><Typography variant={'h4'}>&nbsp;&nbsp;Models</Typography></Grid>
        </Grid>
        <Grid container item spacing={1} alignItems="flex-end" justify={'flex-end'} xs={8}>
          <Grid item>
            <FormControl className={classes.margin} variant='outlined'>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <Search/>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Grid>
          <Grid>
            <Button
              variant="outlined"
              color="default"
              className={classes.searchButton}
              startIcon={<Create/>}
              onClick={() => {
                return dialogRef.current.handleClickOpen(createNewModel);
              }}
            >
              New Model
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <MyDialog text="Please enter the Data ID that is used for training a new model."
                label="Data ID" ref={dialogRef}/>
      <Box mt={2}><ModelTable classes={classes} sendMessage={sendMessage} ref={tableRef}/></Box>
      <Message ref={messageRef} severity={message[0]} value={message[1]}/>
    </div>
  );
}
