import { useContext } from 'react';
import { ItemContext } from '../contexts/Item/ItemContext';
import { ViewContext } from '../contexts/View/ViewContext';
import { removeItem } from '../contexts/Item/ItemActions';
import { hideModal } from '../contexts/View/ViewActions';

import './Form.scss';

type FormProps = {
    id?: string
}

const ConfirmDelete = ({ id }: FormProps) => {
    const { viewDispatch } = useContext(ViewContext);
    const { dispatch } = useContext(ItemContext);

    const submit = async () => {
        await removeItem(dispatch, id as string);
        hideModal(viewDispatch);
    }

    return (
        <div id="confirm-form">
            <p>Are you sure you want to delete this item?</p>
            <div className="panel">
                <button onClick={() => hideModal(viewDispatch) }>No</button>
                <button onClick={submit}>Yes</button>
            </div>
        </div>
    );
}

export default ConfirmDelete;