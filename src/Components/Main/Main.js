import React, { useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import { ExpenseTrackerContext } from '../../Context/Context';
import InfoCard from '../InfoCard';

const Main = () => {

    const classes = useStyles();
    const { balance } = useContext(ExpenseTrackerContext);

    return (
        <Card className={classes.root}>
            <CardHeader title="Income-Expense Tracker" subheader="Ekansh Anand Srivastava 😷"/>
            <Typography variant="subtitle1" align="center" color="Secondary">Hold Space Bar Or Button For Voice 🎤</Typography>
            <Divider />
            <CardContent>
                <Typography variant="h5" align="center">Total Balance ₹{balance}</Typography>
                <Typography variant="subtitle1" style={{lineHeight: '1.5em', marginTop: '20px', textAlign: 'center'}}>
                   <InfoCard />
                </Typography>
                <Divider />
            </CardContent>

            <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Form />
                    </Grid>
                </Grid>
            </CardContent>

            <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Main
