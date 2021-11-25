import { useContext, useState } from 'react';
import { Item, ItemContext } from '../contexts/Item/ItemContext';
import { ViewContext } from '../contexts/View/ViewContext';
import { addItem } from '../contexts/Item/ItemActions';
import { hideModal } from '../contexts/View/ViewActions';


import './Form.scss';

type FormProps = {
    item?: Item
}

type systemType = 'WINDOWS_WORKSTATION' | 'MAC' | 'WINDOWS_SERVER';

const AddUpdate = ({ item }: FormProps) => {
    const { viewDispatch } = useContext(ViewContext);
    const { dispatch } = useContext(ItemContext);

    const systemTypeOptions: Array<systemType> = ['WINDOWS_WORKSTATION', 'MAC', 'WINDOWS_SERVER'];

    const [valid, setValid] = useState<boolean>(false);
    const [formState, setFormState] = useState(item ? item : ({
        system_name: '',
        type: systemTypeOptions[0],
        hdd_capacity: ''
    } as unknown) as Item);

    const setValue = (name: string, value: string) => {
        const newValues = { ...formState, [name]: value };

        setValid(isValid(newValues));
        setFormState(newValues);
    }

    const isValid = (vals: Item) => {
        let empty = false;
        for (const key in vals) {
            if(!vals[key as keyof Item]) empty = true;
        }

        return !empty;
    }

    const submit = async () => {
        await addItem(dispatch, formState);
        hideModal(viewDispatch);
    }

    return (
        <div id="add-update-form">
            <ul>
                <li>
                    <span className="label">
                        <label>System Name: </label>
                    </span>
                    <input 
                        type="text"
                        name="system_name"
                        id="system_name"
                        value={formState.system_name || ''}
                        onChange={(e) => setValue(e.currentTarget.name, e.currentTarget.value) }
                    />
                </li>
                <li>
                    <span className="label">
                        <label>Type: </label>
                    </span>
                    <select 
                        name="type"
                        value={formState.type}
                        onChange={(e) => setValue(e.currentTarget.name, e.currentTarget.value) }
                    >
                        {
                            systemTypeOptions?.map(typeOpt => (<option key={typeOpt} value={typeOpt}>{typeOpt}</option>))
                        }
                    </select>
                </li>
                <li>
                    <span className="label">
                        <label>HDD Capacity: </label>
                    </span>
                    <input 
                        type="number"
                        name="hdd_capacity"
                        id="hdd_capacity"
                        value={(formState.hdd_capacity as unknown) as string || ''}
                        onChange={(e) => setValue(e.currentTarget.name, e.currentTarget.value) }
                    />
                </li>
                <li>
                    <button
                        data-testid="submit"
                        onClick={submit}
                        disabled={!valid}
                    >
                        Submit
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default AddUpdate;