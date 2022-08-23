import {AppDispatch} from "../../index";
import {contactsFetching, contactsFetchingError, contactsFetchingSuccess} from "./contactSlice";
import {Users} from "../../../API/Users";
import {IUser} from "../../../models/IUser";
import {IData} from "../../../models/IData";
import {IContacts} from "../../../models/IContacts";
import {addDeletedContact} from "../deletedContacts/actionsCreators";
import {deletedContactsFetching, deletedContactsFetchingSuccess} from "../deletedContacts/deletedContactsSlice";

export const fetchContacts = (email: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(contactsFetching())

        const response = await Users.getAll()
        const newContacts = response.data.filter(contact => contact.email !== email)

        //чтобы хранить контакты других юзеров
        if (localStorage.getItem('contacts')) {
            const contactsData: IData = JSON.parse(localStorage.getItem('contacts') || '[]')
            const isHavingContacts = contactsData.data.find(user => user.userEmail === email)

            //если нет контактов, то значит, что заходит в первый раз и нужно добавить их в localstorage
            if (!isHavingContacts) {
                const contacts: IContacts = {
                    userEmail: email,
                    contacts: newContacts
                }
                contactsData.data.push(contacts)
                const string = JSON.stringify(contactsData)
                localStorage.setItem('contacts', string)
                return dispatch(contactsFetchingSuccess(contacts.contacts))
            }

            //если контакты есть, то мы должны их взять с localstorage
            const contacts = isHavingContacts.contacts
            return dispatch(contactsFetchingSuccess(contacts))
        }//самый первый вход на сайт
        else {
            const contactsData: IData = {data: []}

            const contacts: IContacts = {
                userEmail: email,
                contacts: newContacts
            }
            contactsData.data.push(contacts)
            const string = JSON.stringify(contactsData)
            localStorage.setItem('contacts', string)
            return dispatch(contactsFetchingSuccess(contacts.contacts))
        }
    } catch (e) {
        if (e instanceof Error) dispatch(contactsFetchingError(e.message))
    }
}

export const deleteContact = (userEmail: string, deleteEmail: string) => async (dispatch: AppDispatch) => {
    try {
        const contactsData: IData = JSON.parse(localStorage.getItem('contacts') || '[]')
        const data = contactsData.data.find(user => user.userEmail === userEmail)

        //удаление ненужного контакта из массива
        const newContacts = data?.contacts.filter(contact => contact.email !== deleteEmail) || []
        const deletedContact = data?.contacts.find(contact => contact.email === deleteEmail) || {} as IUser

        const contacts: IContacts = {
            userEmail: userEmail,
            contacts: newContacts
        }

        //обновление localStorage и redux`а
        const newData = contactsData.data.filter(data => data.userEmail !== userEmail)
        newData.push(contacts)
        const newContactsData: IData = {
            data: newData
        }

        const string = JSON.stringify(newContactsData)
        localStorage.setItem('contacts', string)
        dispatch(contactsFetchingSuccess(newContacts))
        dispatch(addDeletedContact(userEmail, deletedContact))
    } catch (e) {
        console.log(e)
    }
}

export const addContact = (userEmail: string, addEmail: string) => (dispatch: AppDispatch) => {
    try {
        dispatch(contactsFetching())
        dispatch(deletedContactsFetching())
        const contactsData: IData = JSON.parse(localStorage.getItem('contacts') || '[]')
        const deletedContactsData: IData= JSON.parse(localStorage.getItem('deletedContacts') || '[]')

        const deletedContacts = deletedContactsData.data.find(contact => contact.userEmail === userEmail)
        const contacts = contactsData.data.find(contact => contact.userEmail === userEmail) || {} as IContacts

        const newContact = deletedContacts?.contacts.find(contact => contact.email === addEmail)
        const newDeletedContacts = deletedContacts?.contacts.filter(contact => contact.email !== addEmail)

        const updateContacts: IContacts = {
            userEmail: userEmail,
            contacts:  [...contacts.contacts, newContact] as IUser[]
        }
        const newData = contactsData.data.filter(data => data.userEmail !== userEmail)
        newData.push(updateContacts)
        const newContactsData = {
            data: newData
        }

        const updateDeletedContacts: IContacts = {
            userEmail: userEmail,
            contacts: newDeletedContacts as IUser[]
        }
        const newDataDeleted = deletedContactsData.data.filter(data => data.userEmail !== userEmail)
        newDataDeleted.push(updateDeletedContacts)
        const newDeletedContactsData = {
            data: newDataDeleted
        }


        const string = JSON.stringify(newContactsData)
        localStorage.setItem('contacts', string)

        const string2 = JSON.stringify(newDeletedContactsData)
        localStorage.setItem('deletedContacts', string2)

        dispatch(contactsFetchingSuccess(updateContacts.contacts))
        dispatch(deletedContactsFetchingSuccess(newDeletedContacts || []))
    } catch (e) {
        console.log(e)
    }
}