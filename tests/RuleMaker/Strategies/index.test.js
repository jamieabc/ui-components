import StrategyFactory from '../../../src/RuleMaker/Strategies';
import StrategyRunner from '../../../src/RuleMaker/Strategies/Runner';

jest.mock('../../../src/RuleMaker/Strategies/Runner');

describe('StrategyFactory', () => {
  describe('.prepare', () => {
    it('works as a proxy', () => {
      const activeStrategies = ['a', 'b', 'c'];
      const options = { selected: [], ancestors: [] };
      StrategyFactory.prepare(activeStrategies, options);

      expect(StrategyRunner.prepare).toBeCalledWith(activeStrategies, options);
    })
  })
})
