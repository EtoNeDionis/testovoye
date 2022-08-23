import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {login} from "../store/reducers/user/actionsCreators";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/useTypedSelector";

const LoginPage = () => {
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const {error, isAuth} = useAppSelector(state => state.user)
    const navigate = useNavigate()

    const validateLogin = async () => {
        dispatch(login(name, password))
        setName('')
        setPassword('')
    }

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth])

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={"1rem"}>
            <Typography m={"1rem 0"}>
                Login
            </Typography>
            <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} id="email"
                       aria-describedby="my-helper-text"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password"
                       aria-describedby="my-helper-text"/>
            </FormControl>
            <Button onClick={validateLogin} variant="contained">Login</Button>
            {error}
        </Box>
    );
};

export default LoginPage;