import { render } from '@testing-library/react';

import Modal from './';

describe('Modal', () => {

    it('renders modal', async () => {
        const component = (<div data-testid="child-component">A child component.</div>);
        const { container, getByTestId } = render(
            <Modal 
                title="A Title"
                component={component}
            />
        );

        const modalEl = getByTestId("modal");
        const childComponent = getByTestId("child-component");

        expect(container);
        expect(modalEl);
        expect(childComponent);
    });

});
