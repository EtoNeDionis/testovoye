import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ContactsPage from "../pages/ContactsPage";
import ErrorPage from "../pages/ErrorPage";

interface IRoute {
    path: string
    element: JSX.Element
}

export enum pathnameEnum {
    LOGIN = "/login",
    HOME = "/",
    CONTACTS = "/contacts",
    ERROR = "*"
}

export const publicRoutes: IRoute[] = [
    {
        path: pathnameEnum.LOGIN,
        element: <LoginPage/>
    },
    {
        path: pathnameEnum.HOME,
        element: <HomePage/>
    },
    {
        path: pathnameEnum.ERROR,
        element: <ErrorPage/>
    }
]

export const privateRoutes: IRoute[] = [
    ...publicRoutes,
    {
        path: pathnameEnum.CONTACTS,
        element: <ContactsPage/>
    }
]