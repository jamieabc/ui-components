import SBasic from '../../../src/RuleMaker/Strategies/SBasic';

describe('SBasic', () => {
  describe('when it has been chosen', () => {
    it('appends selected to the record', () => {
      const record = { id: 1, name: '1' };
      const selected = [{ id: 1, selected: 'include' }, { id: 2, selected: 'exclude' }];

      const actual = SBasic({ record, selected });
      expect(actual).toEqual({ selected: 'include' });
    })
  })

  describe('when not selected', () => {
    it('changes nothing', () => {
      const record = { id: 1, name: '1' };
      const selected = [{ id: 2, selected: 'exclude' }];

      const actual = SBasic({ record, selected });
      expect(actual).toEqual({});
    })
  })
})
