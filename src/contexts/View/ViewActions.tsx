import { Dispatch } from 'react'

interface ISetLoadAssets {
    type: string,
    payload: any
}

export const showModal = (dispatch: Dispatch<ISetLoadAssets>, options: {title: string, component: JSX.Element}) => {
    dispatch({ type: 'SHOW_MODAL', payload: options });
}

export const hideModal = (dispatch: Dispatch<ISetLoadAssets>) => {
    dispatch({ type: 'HIDE_MODAL', payload: undefined });
}