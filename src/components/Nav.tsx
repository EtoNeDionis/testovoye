import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/useTypedSelector";
import {NavLink} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import {logout} from "../store/reducers/user/actionsCreators";
import {pathnameEnum} from "../router/routes";

const Nav = () => {
    const {isAuth, user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const btnLogout = () => {
        dispatch(logout())
    }
    return (
        <Box sx={{flexGrow: 1}} alignItems={"center"}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink to={pathnameEnum.HOME}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <HomeIcon/>
                        </IconButton>
                    </NavLink>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {user.name && <div>{user.name}</div>}
                    </Typography>
                    <div>
                        {isAuth ?
                            <div>
                            <NavLink to={pathnameEnum.CONTACTS}><Button color="inherit">Contacts</Button></NavLink>
                                <Button color="inherit" onClick={btnLogout}>Logout</Button>
                            </div>:
                            <NavLink to={pathnameEnum.LOGIN}><Button color="inherit">Login</Button></NavLink>}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Nav;