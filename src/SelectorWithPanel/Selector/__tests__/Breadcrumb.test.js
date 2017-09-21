import React from 'react';

import Breadcrumb from '../Breadcrumb';
import LinkOrText from '../LinkOrText';

describe('Breadcrumb', () => {
  describe('props.path', () => {
    it('renders the home when no path given', () => {
      const wrapper = shallow(
        <Breadcrumb />
      );
      expect(wrapper.find('li').length).toEqual(1);
    });

    it('appends to home', () => {
      const path = [
        { prop_id: 1, name: '1' },
        { prop_id: 2, name: '2' },
      ];
      const wrapper = shallow(
        <Breadcrumb path={path} />
      )
      expect(wrapper.find('li').length).toEqual(path.length + 1);
      const classNames = wrapper.find('li').map(w => w.prop('className'));
      classNames.forEach((c, i) =>{
        expect(c.includes('active')).toBe(i !== classNames.length - 1);
      });
    });
  })

  describe('props.onClick', () => {
    describe('for home icon', () => {
      it('works only when path provided', () => {
        const onClick = jest.fn();
        const wrapper = shallow(
          <Breadcrumb onClick={onClick} />
        );
        const home = wrapper.find('li').first();
        home.simulate('click');

        expect(onClick).not.toBeCalled();
      });

      it('fires onClick with null', () => {
        const onClick = jest.fn();
        const wrapper = mount(
          <Breadcrumb path={[{ prop_id: '1' }]} onClick={onClick} />,
          { context: { idKey: 'prop_id' } }
        );
        const home = wrapper.find('li').first();
        home.find('a').simulate('click');

        expect(onClick).toBeCalledWith({ parent_id: null });
      });
    })

    it('fires with id', () => {
      const onClick = jest.fn();
      const path = [{ prop_id: '1', name: 'a' },
                    { prop_id: '2', name: 'b' }];
      const wrapper = mount(
        <Breadcrumb path={path} onClick={onClick} />,
        { context: { idKey: 'prop_id' } }
      );
      const lis = wrapper.find(LinkOrText);

      lis.forEach((li, i) => {
        const link = li.find('a');
        const parent_id = path[i - 1] ? path[i - 1].prop_id : null;

        if (i === path.length) {
          expect(link.length).toEqual(0);
        } else {
          link.simulate('click');
          expect(onClick).toBeCalledWith({ parent_id })
        }
      })
    });
  })
})
