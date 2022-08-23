import React from 'react';
import {useAppSelector} from "../hooks/useTypedSelector";

const HomePage = () => {
    const {isAuth, user} = useAppSelector(state => state.user)
    return (
        <div style={{textAlign: "center", marginTop: "10rem"}}>
            {isAuth ?
                <div>
                    <div>email: {user.email}</div>
                    <div>name: {user.name}</div>
                    <div>username: {user.username}</div>
                   </div>
                :
                <div>ВОЙДИТЕ</div>
            }
        </div>
    );
};

export default HomePage;