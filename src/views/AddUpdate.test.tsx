import { render, fireEvent } from '@testing-library/react';
import AddUpdate from './AddUpdate';

describe('Add Update Form', () => {

    it.skip('Add / update form cannot be submitted', async () => {
        const { container, getByTestId } = render(
            <AddUpdate />
        );
        const submitBtn = getByTestId("submit");

        expect(submitBtn).toHaveProperty('disabled');
    });

    it.skip('Add / update form can be submitted', async () => {
        const { container, getByTestId } = render(
            <AddUpdate />
        );

        const systemNameInput = container.querySelector('input[name="system_name"]') as HTMLElement;
        const typeInput = container.querySelector('select[name="type"]') as HTMLElement;
        const hddInput = container.querySelector('input[name="hdd_capacity"]') as HTMLElement;

        fireEvent.change(systemNameInput, {
            target: { value: "testsystem" }
        });

        fireEvent.change(typeInput, {
            target: {
                value: 'MAC'
            }
        });

        fireEvent.change(hddInput, {
            target: {
                value: 47
            }
        });

        const submitBtn = getByTestId("submit");

        expect(submitBtn).toBeEnabled()
    });

    it.skip('Add / update form can be submitted', async () => {
        const { container, getByTestId } = render(
            <AddUpdate />
        );

        const systemNameInput = container.querySelector('input[name="system_name"]') as HTMLElement;
        const typeInput = container.querySelector('select[name="type"]') as HTMLElement;
        const hddInput = container.querySelector('input[name="hdd_capacity"]') as HTMLElement;

        fireEvent.change(systemNameInput, {
            target: { value: "testsystem" }
        });

        fireEvent.change(typeInput, {
            target: {
                value: 'MAC'
            }
        });

        fireEvent.change(hddInput, {
            target: {
                value: 47
            }
        });

        const submitBtn = getByTestId("submit");

        expect(submitBtn).toBeEnabled();
    });

    it.skip('Values are populated', async () => {
        const item = {id: ("e8okoP2l5" as unknown) as Number, system_name: "DESKTOP-SMART", type: "WINDOWS_WORKSTATION", hdd_capacity: 10};
        const { container, getByTestId } = render(
            <AddUpdate
                item={item}
            />
        );

        const systemNameInput = container.querySelector('input[name="system_name"]') as HTMLInputElement;
        const typeInput = container.querySelector('select[name="type"]') as HTMLSelectElement;
        const hddInput = container.querySelector('input[name="hdd_capacity"]') as HTMLInputElement;
        
        expect(systemNameInput.value).toEqual(item.system_name);
        expect(typeInput.value).toEqual(item.type);
        expect(hddInput.value as string).toEqual(String(item.hdd_capacity));
    });

});