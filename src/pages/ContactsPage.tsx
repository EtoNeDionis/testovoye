import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/useTypedSelector";
import MyCard from "../components/MyCard";
import {fetchContacts} from "../store/reducers/contacts/actionsCreators";
import MyRemovedCard from "../components/MyRemovedCard";
import {fetchDeletedContact} from "../store/reducers/deletedContacts/actionsCreators";
import {FormControl, Input, InputLabel} from "@mui/material";


const ContactsPage = () => {
    const dispatch = useAppDispatch()
    const [queryByEmail, setQueryByEmail] = useState('')
    const [queryDeletedByEmail, setDeletedQueryByEmail] = useState('')

    const {contacts} = useAppSelector(state => state.contacts)
    const {email} = useAppSelector(state => state.user.user)
    const {deletedContacts} = useAppSelector(state => state.deletedContacts)

    const contactsSortedByEmail = contacts.filter(contact => contact.email.toLowerCase().includes(queryByEmail.toLowerCase()))
    const deletedContactsSortedByEmail = deletedContacts.filter(contact => contact.email.toLowerCase().includes(queryDeletedByEmail.toLowerCase()))
    useEffect(() => {
        dispatch(fetchDeletedContact(email))
        dispatch(fetchContacts(email))
    }, [])

    return (
        <div>
            <div style={{textAlign: "center", padding: "1rem"}}>Существующие контакты</div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <FormControl>
                    <InputLabel htmlFor="email">email</InputLabel>
                    <Input type={'text'}
                           placeholder={'search by email'}
                           value={queryByEmail}
                           onChange={(e) => setQueryByEmail(e.target.value)}
                           aria-describedby="my-helper-text"/>
                </FormControl>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
                {contactsSortedByEmail.map(contact => (
                    <MyCard key={contact.id} name={contact.name} id={contact.id} email={contact.email}
                            username={contact.username}/>
                ))}
            </div>
            <hr/>
            <div style={{textAlign: "center", padding: "1rem"}}>Удаленные контакты</div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <FormControl>
                    <InputLabel htmlFor="email">email</InputLabel>
                    <Input type={'text'}
                           placeholder={'search by email'}
                           value={queryDeletedByEmail}
                           onChange={(e) => setDeletedQueryByEmail(e.target.value)}
                           aria-describedby="my-helper-text"/>
                </FormControl>

            </div>
            <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
                {deletedContactsSortedByEmail.map(contact => (
                    <MyRemovedCard key={contact.id} name={contact.name} id={contact.id} email={contact.email}
                                   username={contact.username}/>
                ))}
            </div>
        </div>
    );
};

export default ContactsPage;