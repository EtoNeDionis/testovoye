import React, {FC} from 'react';
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/useTypedSelector";
import {addContact} from "../store/reducers/contacts/actionsCreators";

interface Props{
    id: string,
    name: string,
    username: string,
    email: string
}

const MyRemovedCard: FC<Props> = ({email, id, username, name}) => {
    const {isLoading} = useAppSelector(state => state.contacts)
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.user)

    if(isLoading) return <div>LOADING</div>
    return (
        <div style={{border: "1px solid red", margin: "1rem", borderRadius: "1rem", textAlign: "center"}}>
            {id}
            <div>email: {email}</div>
            <div>name: {name}</div>
            <div>username: {username}</div>
            <Button onClick={() => dispatch(addContact(user.email, email))}>Add to contacts</Button>
        </div>
    );
};

export default MyRemovedCard;