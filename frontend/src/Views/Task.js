import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from "@material-ui/core/Chip";
import DoneIcon from '@material-ui/icons/Done';
import {Cached, CloudDownload, Stop, Delete} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {green} from '@material-ui/core/colors';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import * as FetchData from "../FetchData";
import {Message} from "./Message";


const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  chip: {
    width: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
}));


const handleDelete = () => {
};

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green["500"],
    },
  },
});

class TaskTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rows: []};
  }

  fetchData() {
    FetchData.getTaskList().then((rows) => {
      this.setState({rows: rows});
    });
  }

  componentDidMount() {
    this.fetchData()
  }

  removeCallback(id) {
    return () => {
      FetchData.deleteTask(id).then(() => {
        this.props.sendMessage(["success", "Task Removed!"]);
        this.fetchData();
      });
    }
  }

  stopCallback(id) {
    return () => {
      FetchData.stopTask(id).then(() => {
        this.props.sendMessage(["success", "Task Stoped!"]);
        this.fetchData();
      });
    }
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table className={this.props.classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id </TableCell>
              <TableCell>Type </TableCell>
              <TableCell align="left">Data</TableCell>
              <TableCell align="left">Model</TableCell>
              <TableCell align="left">Progress</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => (
              <TableRow key={row[0]}>
                <TableCell scope="row">{row[0]}</TableCell>
                <TableCell>{row[1] === "training" ? "Training" : "Prediction"}</TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell>{
                  row[2] === 'success' ?
                    <ThemeProvider theme={innerTheme}>
                      <Chip className={this.props.classes.chip} label='Finished' variant="outlined" color='primary'
                            deleteIcon={<DoneIcon/>} onDelete={handleDelete}/>
                    </ThemeProvider> :
                    row[2] === 'inProgress' ?
                      <Chip className={this.props.classes.chip} label='In progress' variant="outlined"
                            color="primary" deleteIcon={<Cached/>} onDelete={handleDelete}/> :
                      row[2] === 'pending' ?
                        <Chip className={this.props.classes.chip} label='Pending' variant="outlined"
                              color="primary" deleteIcon={<Cached/>} onDelete={handleDelete}/> :
                        row[2] === 'failed' ?
                          <Chip className={this.props.classes.chip} label='Failed' variant="outlined"
                                color="secondary" deleteIcon={<Stop/>} onDelete={handleDelete}/> :
                          <Chip className={this.props.classes.chip} label='Stopped' variant="outlined"
                                color="default" deleteIcon={<Stop/>} onDelete={handleDelete}/>
                }</TableCell>
                <TableCell>
                  {
                    row[2] === 'success' && row[1] === "prediction" ?
                      <IconButton aria-label="delete">
                        <CloudDownload/>
                      </IconButton> : null
                  }
                  {
                    (row[2] === 'inProgress' || row[2] === 'pending') ?
                      <IconButton aria-label="delete" onClick={this.stopCallback(row[0])}>
                        <Stop/>
                      </IconButton> : null
                  }
                  {
                    (row[2] !== "pending" && row[2] !== "inProgress") ?
                      <IconButton aria-label="delete" onClick={this.removeCallback(row[0])}>
                        <Delete/>
                      </IconButton> : null
                  }
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default function Task() {
  const classes = useStyles();
  const [message, setMessage] = React.useState(["", ""]);
  const messageRef = React.useRef();
  const sendMessage = (m) => {
    setMessage(m);
    messageRef.current.setOpen(true);
  };
  return (
    <div>
      <TaskTable classes={classes} sendMessage={sendMessage}/>
      <Message ref={messageRef} severity={message[0]} value={message[1]}/>
    </div>
  )
}
