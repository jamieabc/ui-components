import StrategyRunnerWrapper from '../../../src/RuleMaker/Strategies/Runner';

describe('StrategyRunnerWrapper', () => {
  describe('.prepare', () => {
    it('returns a real instance which responds with .build', () => {
      const runner = StrategyRunnerWrapper.prepare([], []);
      expect(runner.build).toBeTruthy();
    })
  })

  describe('.register', () => {
    it('provides a way where strategies could register to it', () => {
      const registered = (k) => {
        const keys = StrategyRunnerWrapper.enabledStrategies.map(s => s.key);
        return keys.includes(k);
      }
      const newStrategy = 'foo';
      expect(registered(newStrategy)).toBe(false)

      StrategyRunnerWrapper.register(newStrategy, () => {});
      expect(registered(newStrategy)).toBe(true)
    })
  })

  describe('Real Runner', () => {
    it('builds with active strategies', () => {
      const activeCallback = jest.fn();
      const inactiveCallback = jest.fn();

      StrategyRunnerWrapper.register('a', activeCallback);
      StrategyRunnerWrapper.register('b', inactiveCallback);

      StrategyRunnerWrapper.prepare(['a'], []).build([{ id: 1 }]);
      expect(activeCallback).toBeCalled();
      expect(inactiveCallback).not.toBeCalled();
    })

    it('stops when any strategy returns "terminated" flag', () => {
      const noDeeper = () => ({ terminated: true, selected: false, disabled: true });
      const deeperStrategy = jest.fn();

      StrategyRunnerWrapper.register('noDeeper', noDeeper);
      StrategyRunnerWrapper.register('deeper', deeperStrategy);

      const result = StrategyRunnerWrapper.prepare(['noDeeper', 'deeper'], []).build([{ id: 1 }]);
      expect(result).toEqual([{ id: 1, selected: false, disabled: true, terminated: true }]);
      expect(deeperStrategy).not.toBeCalled();
    })
  })
})
