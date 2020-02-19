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


const rows = [
  [1, 'Prediction', 'T2-Flair', 'U-net', 'Finished'],
  [2, 'Training', 'T1-MRI-1', 'U-net-T1', 'Finished'],
  [3, 'Prediction', 'T2-Flair', 'U-net', 'In progress'],
  [4, 'Training', 'T1-MRI-1', 'U-net', 'Stopped'],
  [5, 'Training', 'T1-MRI-1', 'U-net', 'Timeout'],
];
const handleDelete = () => {
  console.info('You clicked the delete icon.');
};

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: green["500"],
    },
  },
});

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
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
          {rows.map(row => (
            <TableRow key={row[0]}>
              <TableCell scope="row">{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
              <TableCell>{row[3]}</TableCell>
              <TableCell>{
                row[4] === 'Finished' ?
                  <ThemeProvider theme={innerTheme}>
                    <Chip className={classes.chip} label='Finished' variant="outlined" color='primary'
                          deleteIcon={<DoneIcon/>} onDelete={handleDelete}/>
                  </ThemeProvider> : row[4] === 'In progress' ?
                  <Chip className={classes.chip} label='In progress' variant="outlined"
                        color="primary" deleteIcon={<Cached/>} onDelete={handleDelete}/> : row[4] === 'Timeout' ?
                    <Chip className={classes.chip} label='Timeout' variant="outlined"
                          color="secondary" deleteIcon={<Stop/>} onDelete={handleDelete}/> :
                    <Chip className={classes.chip} label='Stopped' variant="outlined"
                          color="default" deleteIcon={<Stop/>} onDelete={handleDelete}/>
              }</TableCell>
              <TableCell>
                {
                  row[4] === 'Finished' && row[1] === "Prediction" ?
                    <IconButton aria-label="delete">
                      <CloudDownload/>
                    </IconButton> : null
                }
                {
                  row[4] === 'In progress' ?
                    <IconButton aria-label="delete">
                      <Stop/>
                    </IconButton> : null
                }

                <IconButton aria-label="delete">
                  <Delete/>
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
