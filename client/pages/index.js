import buildClient from '../api/build-client'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { Container, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1 },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    topMargin: {
        marginTop: theme.spacing(5),
    },
}))

const LandingPage = ({ currentUser, files }) => {
    const classes = useStyles()

    if (currentUser) {
        return (
            <Container maxWidth="md">
                <Grid
                    container
                    direction="column"
                    className={classes.topMargin}
                >
                    <Grid item xs={12}></Grid>

                    <Grid item></Grid>
                </Grid>
            </Container>
        )
    } else {
        return (
            <Container component="main" maxWidth="md">
                <h1>Signed out</h1>
            </Container>
        )
    }
}

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context)
    const { currentUser } = (await client.get('/api/users/currentuser')).data
    let files = []
    if (currentUser) {
        console.log(currentUser)
        files = (await client.get('/api/upload')).data
        console.log({ files })
    }
    return { currentUser, files }
}

export default LandingPage
