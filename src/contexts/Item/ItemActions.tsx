import { Dispatch } from 'react'
import Axios from "axios";
import { Item, ISetLoadAssets } from './ItemContext';
import Settings from '../../settings';

type keys = "development" | "test";

const env = process.env.NODE_ENV as keys;
const baseURL = Settings[env]["server_url"];

export const getItems = async (dispatch: Dispatch<ISetLoadAssets>) => {
    try {
        const res = await Axios.get(`${baseURL}/devices`);

        if (res.status === 200) {
            dispatch({
                type: "SET_ITEMS",
                payload: res.data
            })
        }
    } catch (e) {
        console.log(e);
    }
}

export const addItem = async (dispatch: Dispatch<ISetLoadAssets>, data: Item) => {
    try {
        const res = await Axios.post(`${baseURL}/devices`, {
            ...data
        });

        if (res.status === 200) {
            dispatch({
                type: "ADD_ITEM",
                payload: res.data
            })
        }
    } catch (e) {
        console.log(e);
    }
}

export const removeItem = async (dispatch: Dispatch<ISetLoadAssets>, id: string) => {
    try {
        const res = await Axios.delete(`${baseURL}/devices/${id}`);

        if (res.status === 200) {
            dispatch({
                type: "REMOVE_ITEM",
                payload: id
            })
        }
    } catch (e) {
        console.log(e);
    }
}