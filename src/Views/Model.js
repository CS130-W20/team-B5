import React from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {AddBox, Create, Add, Search} from "@material-ui/icons";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import {CardHeader} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Switch from '@material-ui/core/Switch';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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

                <Grid item xs={12} container className={classes.main}>
                    {[1, 2, 3, 4, 5].map(x =>
                        x > 3 ? <Grid item xs={12} sm={6} md={4} lg={4} key={x}>
                            <Card className={classes.card}>
                                <CardHeader
                                    title="Model ID"
                                    subheader="shared model"
                                />
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Effective_T2-weighted_MRI_of_hemosiderin_deposits_after_subarachnoid_hemorrhage.png/200px-Effective_T2-weighted_MRI_of_hemosiderin_deposits_after_subarachnoid_hemorrhage.png"
                                        title="Contemplative Reptile"
                                    />
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Remove
                                    </Button>
                                    <Button size="small" color="primary">
                                        Run
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid> : <Grid item xs={12} sm={6} md={4} lg={4} key={x}>
                            <Card className={classes.card}>
                                <CardHeader
                                    title="Model ID"
                                    subheader="Description"
                                />
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/T1-weighted-MRI.png/200px-T1-weighted-MRI.png"
                                        title="Contemplative Reptile"
                                    />


                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Remove
                                    </Button>
                                    <Button size="small" color="primary">
                                        Run
                                    </Button>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Switch value="checkedA" />
                                            }
                                            label="Share"
                                        /></FormGroup>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
