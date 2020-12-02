import Link from 'next/link'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { ListItem } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    clickable: {
        cursor: 'pointer',
    },
    menuButtons: {
        marginLeft: 'auto',
        display: 'inline-block',
    },
    buttonContainers: {
        display: 'inline-block',
    },
}))

const Header = ({ currentUser }) => {
    const classes = useStyles()

    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' },
    ]
        .filter((linkConfig) => linkConfig)
        .map(({ label, href }) => {
            return (
                <div key={href} className={classes.buttonContainers}>
                    <Link href={href} passHref>
                        <Button color="inherit">{label}</Button>
                    </Link>
                </div>
            )
        })

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/" passHref>
                        <Typography
                            variant="h6"
                            className={(classes.title, classes.clickable)}
                        >
                            YT Notes
                        </Typography>
                    </Link>
                    <div className={classes.menuButtons}>{links}</div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Header
