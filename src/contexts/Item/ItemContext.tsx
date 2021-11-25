import React, { createContext, useReducer } from 'react'
import ItemReducer from "./ItemReducer";

export interface ISetLoadAssets {
    type: string,
    payload: any
}

export type Item = {
    id: Number;
    system_name: string;
    type: string;
    hdd_capacity: Number
}

interface IAppContextProps {
    state: IAppState
    dispatch: React.Dispatch<ISetLoadAssets>
}

interface IAppState {
    items: Array<Item> | []
    loading: boolean
}

const initialState: IAppState = {
    items: [],
    loading: false
}

export const ItemContext = createContext({ state: initialState } as IAppContextProps);

export const ItemProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(ItemReducer, initialState);

    return (
        <ItemContext.Provider 
            value={{
               state,
               dispatch 
            }}
        >
        {children}
        </ItemContext.Provider>
    );
}