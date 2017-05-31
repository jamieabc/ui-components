import ArrayHelper from '../../src/utils/ObjectArray';

describe('flattenWith', () => {
  it('converts a nested object array into 1d', () => {
    const src = [{ a: 'a',
                   children: [{ c: 'c', children: [{ d: 'd' }] }] },
                 { b: 'b', children: [] }];

    const expected = [
      { a: 'a', children: [] },
      { b: 'b', children: [] },
      { c: 'c', children: [] }, { d: 'd' }
    ];
    expect(ArrayHelper.flattenWith(src, 'children')).toEqual(expected);
  })
})

describe('includes', () => {
  it('works with nested array which contains objects', () => {
    const src = [{ id: 'a',
                   children: [{ id: 'c', selected: true, children: [{ id: 'd' }] }] },
                 { id: 'b', children: [] }];

    expect(ArrayHelper.includes(src, (r) => r.id === 'c')).toBe(true);
    expect(ArrayHelper.includes(src, (r) => r.id === 'ck')).toBe(false);
  })
});
