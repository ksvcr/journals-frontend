import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Button from './Button';

describe('Render Button', () => {
  it('render correctly default Button component', () => {
    const ButtonComponent = TestRenderer.create(<Button>Кнопка</Button>).toJSON();
    expect(ButtonComponent).toMatchSnapshot();
  });

  it('render correctly Button component with link type', () => {
    const props = {
      type: 'link'
    };

    const ButtonComponent = mount(
      <MemoryRouter>
        <Button { ...props }>Кнопка</Button>
      </MemoryRouter>);

    expect(ButtonComponent.exists('a')).toEqual(
      true
    );
  });
});

