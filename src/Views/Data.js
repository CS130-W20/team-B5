import React from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {CloudUpload, Search} from "@material-ui/icons";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import {CardHeader} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
                    <Grid item><Button
                        variant="outlined"
                        color="default"
                        className={classes.searchButton}
                        startIcon={<CloudUpload/>}
                    >
                        Upload
                    </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12} container className={classes.main}>
                    {[1, 2, 3, 4, 5].map(x =>
                        x % 2 === 0 ? <Grid item xs={12} sm={6} md={4} lg={3} key={x}>
                            <Card className={classes.card}>
                                <CardHeader
                                    title="T2 flair axial"
                                    subheader="prediction Set"
                                />
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Effective_T2-weighted_MRI_of_hemosiderin_deposits_after_subarachnoid_hemorrhage.png/200px-Effective_T2-weighted_MRI_of_hemosiderin_deposits_after_subarachnoid_hemorrhage.png"
                                        title="Contemplative Reptile"
                                    />
                                    <Typography variant={'subtitle2'} color={"textSecondary"}
                                                className={classes.date}>10/12/2010</Typography>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Remove
                                    </Button>
                                    <Button size="small" color="primary">
                                        Process
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid> : <Grid item xs={12} sm={6} md={4} lg={3} key={x}>
                            <Card className={classes.card}>
                                <CardHeader
                                    title="Dataset name"
                                    subheader="Training Set"
                                />
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/T1-weighted-MRI.png/200px-T1-weighted-MRI.png"
                                        title="Contemplative Reptile"
                                    />
                                    <Typography variant={'subtitle2'} color={"textSecondary"}
                                                className={classes.date}>10/12/2010</Typography>

                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Remove
                                    </Button>
                                    <Button size="small" color="primary">
                                        Process
                                    </Button>
                                    <Button size="small" color="primary">
                                        Download
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
