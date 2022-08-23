import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes";
import {useAppSelector} from "../hooks/useTypedSelector";

const AppRouter = () => {
    const {isAuth} = useAppSelector(state => state.user)
    return (
        isAuth ?
            <Routes>
                {privateRoutes.map((route, index) => (
                    <Route key={index} element={route.element} path={route.path}/>
                ))}
            </Routes>
            :
            <Routes>
                {publicRoutes.map((route, index) => (
                    <Route key={index} element={route.element} path={route.path}/>
                ))}
            </Routes>
    );
};

export default AppRouter;