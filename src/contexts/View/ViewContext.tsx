import React, { createContext, useReducer } from 'react'
import ViewReducer from "./ViewReducer";

import Modal from '../../components/Modal';

interface ISetLoadAssets {
    type: string,
    payload: any
}

interface IViewContextProps {
    viewState: IViewState
    viewDispatch: React.Dispatch<ISetLoadAssets>
}

interface IViewState {
    modal?: {
        title: string,
        component: JSX.Element
    }
}

const initialState: IViewState = {
    modal: undefined
}

export const ViewContext = createContext({ viewState: initialState } as IViewContextProps);

export const ViewProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(ViewReducer, initialState);

    return (
        <ViewContext.Provider 
            value={{
               viewState: state,
               viewDispatch: dispatch 
            }}
        >
        { state.modal && 
            <Modal 
                title={ state.modal.title } 
                component={state.modal.component} 
            /> 
        }
        {children}
        </ViewContext.Provider>
    );
}