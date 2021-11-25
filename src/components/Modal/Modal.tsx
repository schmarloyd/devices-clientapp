import { useContext } from 'react';
import { ViewContext } from '../../contexts/View/ViewContext';
import { hideModal } from '../../contexts/View/ViewActions';

import './Modal.scss'

type ModalProps = {
    title: string
    component: JSX.Element
}

const Modal = ({ title, component }: ModalProps) => {
    const { viewDispatch } = useContext(ViewContext);

    return (
        <div id="modal-overlay">
            <div id="modal-wrap" data-testid="modal">
                <div className="title">
                    <h3>{ title }</h3>
                    <button className="close" onClick={() => hideModal(viewDispatch) }>X</button>
                </div>
                { component }
            </div>
        </div>
    );
}

export default Modal;