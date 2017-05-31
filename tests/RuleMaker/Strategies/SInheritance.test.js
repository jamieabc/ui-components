import SInheritance from '../../../src/RuleMaker/Strategies/SInheritance';

describe('SInheritance', () => {
  describe('when ancestor is included', () => {
    it('tries to disable the record', () => {
      const ancestors = [{ id: 1, name: '1' }];
      const record = { id: 11, name: '11' };
      const selected = [{ id: 1, selected: 'included' }];

      const actual = SInheritance({ record, selected, ancestors });
      expect(actual).toEqual({ disabled: ['included'] });
    })
  })

  describe('when ancestor is not included', () => {
    it('does nothing', () => {
      const ancestors = [{ id: 1, name: '1' }];
      const record = { id: 11, name: '11' };
      const selected = [{ id: 111, selected: 'included' }];

      const actual = SInheritance({ record, selected, ancestors });
      expect(actual).toEqual({});
    })
  })
})
