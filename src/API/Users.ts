import {IUser} from "../models/IUser";
import axios from "axios";

export class Users {
    static async getAll() {
        return axios.get<IUser[]>('./db.json')
    }
}