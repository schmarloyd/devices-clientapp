import { render, fireEvent } from '@testing-library/react';

import List from './';

const batch = [
    {id: "e8okoP2l5", system_name: "DESKTOP-SMART", type: "WINDOWS_WORKSTATION", hdd_capacity: "10"},
    {id: "Q1JdBnE12", system_name: "ARMANDO-SERVER", type: "WINDOWS_SERVER", hdd_capacity: "256"},
    {id: "Jj5bn3G2H", system_name: "FIRST-MAC", type: "MAC", hdd_capacity: "180"},
    {id: "R5LdSnQhY", system_name: "SERVER-ONE", type: "WINDOWS_SERVER", hdd_capacity: "50"},
    {id: "LM5dBnJ2G", system_name: "MOON-SMART", type: "WINDOWS_SERVER", hdd_capacity: "256"}
]

describe('List', () => {

    it('renders list', async () => {

        const { container, getByTestId } = render(
            <List 
                data={batch}
                filterType="type"
                sortOptions={["hdd_capacity", "system_name"]}
                editEntry={() => {}}
                deleteEntry={() => {}}
                addEntry={() => {}}
            />
        );

        const listEl = getByTestId("list");

        expect(container);
        expect(listEl)

    });

    it('entries should be listed', async () => {

        const { queryAllByTestId, getByTestId } = render(
            <List 
                data={batch}
                filterType="type"
                sortOptions={["hdd_capacity", "system_name"]}
                editEntry={() => {}}
                deleteEntry={() => {}}
                addEntry={() => {}}
            />
        );

        const listEntries = queryAllByTestId("list-entry");

        expect(listEntries).toHaveLength(batch.length);

    });

    it('entries should filter', async () => {

        const { queryAllByTestId, getByTestId } = render(
            <List 
                data={batch}
                filterType="type"
                sortOptions={["hdd_capacity", "system_name"]}
                editEntry={() => {}}
                deleteEntry={() => {}}
                addEntry={() => {}}
            />
        );

        fireEvent.change(getByTestId("filter-options"), {
            target: {
                value: 'WINDOWS_SERVER'
            }
        });

        const listEntries = queryAllByTestId("list-entry");

        expect(listEntries).toHaveLength(3);


    });

});

