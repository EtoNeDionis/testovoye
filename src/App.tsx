import React, {useEffect} from 'react';
import AppRouter from "./router/AppRouter";
import Nav from "./components/Nav";
import {useAppDispatch} from "./hooks/useTypedSelector";
import {userFetching, userFetchingSuccess} from "./store/reducers/user/userSlice";

const App = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(localStorage.getItem('user')){
            dispatch(userFetching())
            const user = JSON.parse(localStorage.getItem('user') || '')
            dispatch(userFetchingSuccess(user))
        }
    }, [])
    return (
        <div>
            <Nav/>
            <AppRouter/>
        </div>
    );
};

export default App;