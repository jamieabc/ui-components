import React from 'react';
import RuleMaker from '../../src/RuleMaker';
import Selector from '../../src/SelectorWithPanel';

describe('RuleMaker', () => {
  function assertForward(propKey, propValue, callback, options = {}) {
    const wrapper = shallow(<RuleMaker />);
    wrapper.setProps({ [propKey]: propValue });
    const forwarded = wrapper.find(Selector).prop(options.renamed || propKey);

    if (!callback) {
      return expect(forwarded).toEqual(propValue);
    }

    callback(propValue, forwarded);
  }

  describe('props.ancestors', () => {
    it('is forwarded to the Selector', () => {
      assertForward('ancestors', [{ id: 1, name: 'name' }]);
    })
  })

  describe('props.dataSource', () => {
    it('decorates & forwards it to the Selector', () => {
      assertForward('dataSource', [{ id: 1, name: 'a' }],
                    (original, forwarded) => {
                      expect(forwarded).toEqual([{ id: 1, name: 'a' }])
                    });
    })
  })

  describe('props.columns', () => {
    it.only('prepends another two columns onto it and forwards it to the Selector', () => {
      const columns = [{ name: 'foo' }, { name: 'bar' }];

      const dumbWrapper = { props: { onToggle: jest.fn() } };
      assertForward('columns', columns, (origin, forwarded) => {
        const customColumns = forwarded(dumbWrapper.props);
        expect(customColumns.length).toEqual(origin.length + 2);
        const x = shallow(customColumns[0].render({}, {}));
        x.prop('onClick')();
        expect(dumbWrapper.props.onToggle).toBeCalled();
      }, { renamed: 'columnFactory' })
    })
  })

  describe('.getColumns', () => {
    it('expands expandable columns', () => {
      const context = {
        props: {
          onToggle: jest.fn(),
          onQuery: jest.fn()
        }
      };
      const columns = [{ name: 'foo', expandable: true }];
      const wrapper = shallow(<RuleMaker columns={columns} />)
      const newColumns = wrapper.instance().getColumns(columns, [])(context.props);
      const link = mount(newColumns[2].render(null, {}));
      expect(link.prop('name')).toEqual('foo');
      link.prop('onClick')();
      expect(context.props.onQuery).toBeCalled();
    })
  })

  describe('props.text', () => {
    it('forwards it to the Selector', () => {
      assertForward('text', { leftPanel: 'l' });
    })
  })

  describe('props.selected', () => {
    it('appends fields onto it and forwards it to the Selector', () => {
      const selected = [
        { id: 1, selected: null,
          children: [{ id: 11, selected: 'included' }] },
        { id: 2, selected: 'excluded' }
      ];
      assertForward('selected', selected);
    })
  })

  describe('props.onUnselectAllConfirm', () => {
    assertForward('onUnselectAllConfirm', () => {});
  })

  describe('props.onQuery', () => {
    assertForward('onQuery', () => {});
  })

  describe('props.onOverrideSelected', () => {
    assertForward('onOverrideSelected', () => {});
  })

  describe('props.onOverrideAncestors', () => {
    assertForward('onOverrideAncestors', () => {});
  })
})
