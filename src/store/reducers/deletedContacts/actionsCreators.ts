import {AppDispatch} from "../../index";
import {IUser} from "../../../models/IUser";
import {
    deletedContactsFetching,
    deletedContactsFetchingError,
    deletedContactsFetchingSuccess
} from "./deletedContactsSlice";
import {IContacts} from "../../../models/IContacts";
import {IData} from "../../../models/IData";

export const fetchDeletedContact = (email: string) => (dispatch: AppDispatch) => {
    try {
        deletedContactsFetching()
        if (localStorage.getItem('deletedContacts')) {
            const deletedContactsData: IData = JSON.parse(localStorage.getItem('deletedContacts') || '[]')
            const isHavingDeletedContacts = deletedContactsData.data.find(user => user.userEmail === email)
            if (!isHavingDeletedContacts) {
                return deletedContactsFetchingSuccess([])
            }
            const deletedContacts = isHavingDeletedContacts.contacts
            return dispatch(deletedContactsFetchingSuccess(deletedContacts))
        }

        deletedContactsFetchingSuccess([])
    } catch (e) {
        if (e instanceof Error) deletedContactsFetchingError(e.message)
    }
}

export const addDeletedContact = (userEmail: string, deletedContact: IUser) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deletedContactsFetching())

        //если нет удаленных контактов, то создаем новый объект, по аналогии с контактами
        if (localStorage.getItem('deletedContacts')) {

            const deletedContactsData: IData = JSON.parse(localStorage.getItem('deletedContacts') || '[]')
            const isHavingDeletedContacts = deletedContactsData.data.find(user => user.userEmail === userEmail)

            //если нет удаленных контактов, то значит, что удаление в первый раз нужно добавить его в localstorage
            if (!isHavingDeletedContacts) {
                const deletedContacts: IContacts = {
                    userEmail: userEmail,
                    contacts: [deletedContact]
                }
                deletedContactsData.data.push(deletedContacts)
                const string = JSON.stringify(deletedContactsData)
                localStorage.setItem('deletedContacts', string)
                return dispatch(deletedContactsFetchingSuccess(deletedContacts.contacts))
            }
            //если удаленные контакты есть, то мы должны их взять с localstorage

            const deletedContacts = isHavingDeletedContacts.contacts
            const mergedDeletedContacts = [...deletedContacts, deletedContact]
            isHavingDeletedContacts.contacts = mergedDeletedContacts
            const a = deletedContactsData.data.filter(data => data.userEmail !== userEmail)
            a.push(isHavingDeletedContacts)
            const newDeletedData = {
                data: a
            }
            const string = JSON.stringify(newDeletedData)
            localStorage.setItem('deletedContacts', string)
            return dispatch(deletedContactsFetchingSuccess(mergedDeletedContacts))
        } else {
            const deletedContactsData: IData = {data: []}

            const contacts: IContacts = {
                userEmail: userEmail,
                contacts: [deletedContact]
            }
            deletedContactsData.data.push(contacts)
            const string = JSON.stringify(deletedContactsData)
            localStorage.setItem('deletedContacts', string)
            return dispatch(deletedContactsFetchingSuccess(contacts.contacts))
        }
    } catch (e) {
        console.log(e)
    }
}