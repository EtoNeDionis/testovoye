import {AppDispatch} from "../../index";
import {userFetching, userFetchingError, userFetchingSuccess, userLogout} from "./userSlice";
import {Users} from "../../../API/Users";
import {contactsFetchingSuccess} from "../contacts/contactSlice";
import {deletedContactsFetchingSuccess} from "../deletedContacts/deletedContactsSlice";

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userFetching())
        const response = await Users.getAll()
        const [userData] = response.data.filter(user => {
            if(user.email === email && user.password === password) return true
        })
        if(!userData)dispatch(userFetchingError('Пользователя нет'))
        else {
            const data = JSON.stringify(userData)
            localStorage.setItem('user', data)
            dispatch(userFetchingSuccess(userData))
        }
    } catch (e) {
        if (e instanceof Error) dispatch(userFetchingError(e.message))
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userFetching())
        localStorage.removeItem('user')
        dispatch(contactsFetchingSuccess([]))
        dispatch(deletedContactsFetchingSuccess([]))
        dispatch(userLogout())
    } catch (e) {
        if (e instanceof Error) dispatch(userFetchingError(e.message))
    }
}