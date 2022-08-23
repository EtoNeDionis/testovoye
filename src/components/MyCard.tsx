import React, {FC} from 'react';
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/useTypedSelector";
import {deleteContact} from "../store/reducers/contacts/actionsCreators";

interface Props {
    id: string,
    name: string,
    username: string,
    email: string
}

const MyCard: FC<Props> = ({email, id, username, name}) => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.user)
    const {isLoading} = useAppSelector(state => state.contacts)
    const removeContact = () => {
        dispatch(deleteContact(user.email, email))
    }

    if (isLoading) return <div>LOADING</div>

    return (
        <div style={{border: "1px solid green", margin: "1rem", borderRadius: "1rem", textAlign: "center"}}>
            {id}
            <div>email: {email}</div>
            <div>name: {name}</div>
            <div>username: {username}</div>
            <Button onClick={removeContact}>remove</Button>
        </div>
    );
};

export default MyCard;