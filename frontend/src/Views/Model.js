import React from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {AddBox, Create, Add, Search, Cached, Stop, CloudDownload, Delete} from "@material-ui/icons";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import Switch from '@material-ui/core/Switch';
import Paper from "@material-ui/core/Paper";
import {Box, Table, TableHead, TableRow, TableCell, TableBody, TableContainer} from '@material-ui/core';
import * as FetchData from "../FetchData";

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

class ModelTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rows: []};
  }

  componentDidMount() {
    FetchData.getModelList().then((rows) => {
      this.setState({rows: rows});
    });
  }

  handleChange(id) {
    return event => {
      console.log(id + " " + event.target.checked);
    };
  }

  render() {
    return <TableContainer component={Paper}>
      <Table className={this.props.classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Share</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map(row => (
            <TableRow key={row[0]}>
              <TableCell scope="row">{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>
                <Switch
                  checked={row[2]}
                  onChange={this.handleChange(row[0])}
                  inputProps={{'aria-label': 'secondary checkbox'}}
                />
              </TableCell>
              <TableCell>
                <Button size="small" color="primary">
                  Remove
                </Button>
                <Button size="small" color="primary">
                  Run
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  }
}

export default function Model() {
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
          <Grid item><Button
            variant="outlined"
            color="default"
            className={classes.searchButton}
            startIcon={<Create/>}
          >
            New Model
          </Button>
          </Grid>
        </Grid>
      </Grid>
      <Box mt={2}><ModelTable classes={classes}/></Box>
    </div>
  );
}
