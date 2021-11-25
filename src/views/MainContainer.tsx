import { useContext, useEffect } from 'react';
import { Item, ItemContext } from '../contexts/Item/ItemContext';
import { ViewContext } from '../contexts/View/ViewContext';
import { getItems } from '../contexts/Item/ItemActions';
import { showModal } from '../contexts/View/ViewActions';

import AddUpdate from './AddUpdate';
import ConfirmDelete from './ConfirmDelete';

import List from '../components/List'

export const MainContainer = () => {
    const { viewDispatch } = useContext(ViewContext);
    const { state, dispatch } = useContext(ItemContext);

    useEffect(() => {

        const getAllItems = async () => {
            await getItems(dispatch);
        }

        if(!state?.items.length) {
            getAllItems();
        }

    }, [state.items, dispatch]);

    const editItem = (item: Item) => {
        showModal(viewDispatch, {
            title: 'Add Item',
            component: <AddUpdate item={item} />
        });
    }

    const deleteItem = (id: string) => {
        showModal(viewDispatch, {
            title: 'Delete Item',
            component: <ConfirmDelete id={id} />
        });
    }

    const addItem  = () => {
        showModal(viewDispatch, {
            title: 'Add Item',
            component: <AddUpdate />
        });
    }

    return (
        <div className="App">
            <List 
                data={state?.items}
                filterType="type"
                sortOptions={["hdd_capacity", "system_name"]}
                editEntry={editItem}
                deleteEntry={deleteItem}
                addEntry={addItem}
            />
        </div>
    );
}