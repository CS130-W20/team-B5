import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {CloudUpload, Search} from "@material-ui/icons";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import {CardHeader} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import {TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {Radio, RadioGroup, FormHelperText, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';

import * as FetchData from "../FetchData"

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


function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="default"
        className={classes.searchButton}
        startIcon={<CloudUpload/>}
        onClick={handleClickOpen}
      >
        Upload
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select the data file to upload.
          </DialogContentText>
          <Button
            variant="outlined"
            color="default"
            component="label"
            startIcon={<CloudUpload/>}
          >
            Upload File
            <input
              type="file"
              style={{display: "none"}}
            />
          </Button>
        </DialogContent>

        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Please specify the type of the data.</FormLabel>
            <RadioGroup defaultValue="training">
              <FormControlLabel value="training" control={<Radio />} label="Training Data" />
              <FormControlLabel value="prediction" control={<Radio />} label="Prediction Data" />
            </RadioGroup>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

class DataTable extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {rows: []};
  }
  componentDidMount()
  {
    FetchData.getDataList().then((rows)=>
    {
      this.setState({rows: rows});
    });
  }
  render() {
    return (
      <Grid item xs={12} container className={this.props.classes.main}>
        {this.state.rows.map(row =>
          <Grid item xs={12} sm={6} md={4} lg={3} key={row[0]}>
            <Card className={this.props.classes.card}>
              <CardHeader
                title={row[1]}
                subheader={row[2]}
              />
              <CardActionArea>
                <CardMedia
                  className={this.props.classes.media}
                  image={row[3]}
                  title={row[1]}
                />
                {/*<Typography variant={'subtitle2'} color={"textSecondary"} className={classes.date}>{row[5]}</Typography>*/}
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Remove
                </Button>
                <Button size="small" color="primary">
                  Download
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default function Data() {
  const classes = useStyles();
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={4} justify={'flex-start'} container>
          <Typography variant={'h4'}>&nbsp;&nbsp;Data</Typography>
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
          <Grid item>
            <FormDialog/>
          </Grid>
        </Grid>
        <DataTable classes={classes}/>
      </Grid>
    </div>
  );
}
