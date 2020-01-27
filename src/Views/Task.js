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
import {Cached, CloudDownload, Stop,Delete} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

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
    [1, 'Model Training', 'T1-MRI-1', 'U-net-T1', 'finished'],
    [2, 'Model Prediction', 'T2-Flair', 'Whatever', 'in progress'],
    [3, 'Model Training', 'T1-MRI-1', 'U-net', 'stopped'],
    [4, 'Model Training', 'T1-MRI-1', 'U-net', 'finished'],
    [5, 'Model Training', 'T1-MRI-1', 'U-net', 'timeout'],
];

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
                            <TableCell component="th" scope="row">
                                {row[0]}
                            </TableCell>
                            <TableCell scope="row">
                                {row[1]}
                            </TableCell>
                            <TableCell align="left">{row[2]}</TableCell>
                            <TableCell align="left"> {row[3]}</TableCell>
                            <TableCell align="left">{
                                row[4] === 'finished' ?
                                    <Chip className={classes.chip} label='finished' variant="outlined" color='default'
                                          deleteIcon={<DoneIcon/>}
                                          onDelete={() => {
                                          }}/> : row[4] === 'in progress' ?
                                    <Chip className={classes.chip} label='in progress' variant="outlined"
                                          color="primary" deleteIcon={<Cached/>}
                                          onDelete={() => {
                                          }}/> : row[4] === 'timeout' ?
                                        <Chip className={classes.chip} label='timeout' variant="outlined"
                                              color="secondary" deleteIcon={<Stop/>}
                                              onDelete={() => {
                                              }}/> : <Chip className={classes.chip} label='stopped' variant="outlined"
                                                           color="default" deleteIcon={<Stop/>}
                                                           onDelete={() => {
                                                           }}/>
                            }</TableCell>
                            <TableCell align="left">
                                {
                                    row[4] === 'finished' ?
                                        <IconButton aria-label="delete">
                                            <CloudDownload/>
                                        </IconButton> : null
                                }
                                {
                                    row[4] === 'in progress' ?
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
