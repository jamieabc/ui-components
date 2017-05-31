class Runner {
  constructor(activeStrategies, { selected, ancestors }) {
    this.activeStrategies = activeStrategies || [];
    this.selected = selected || [];
    this.ancestors = ancestors || [];
  }

  buildSingle(r) {
    return this.activeStrategies.reduce((memo, s) => (
      memo.terminated ?
        memo :
        Object.assign({}, memo, s.f({ record: r, selected: this.selected, ancestors: this.ancestors }))
    ), r);
  }

  build(dataSource) {
    return dataSource.map(r => this.buildSingle(r))
  }
}

const RunnerWrapper = {
  enabledStrategies: [],

  register(key, f) {
    RunnerWrapper.enabledStrategies.push({ key, f });
  },

  prepare(sKeys, { selected, ancestors }) {
    const activeStrategies = RunnerWrapper.enabledStrategies.filter(s => sKeys.includes(s.key))

    return new Runner(activeStrategies, { selected, ancestors });
  }
}

export default RunnerWrapper;
