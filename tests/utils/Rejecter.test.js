import Rejecter from '../../src/utils/Rejecter';

it('removes basic element from the array', () => {
  const src = ['a', 'b', 'c'];
  const item = 'c';

  expect(Rejecter.run(src, item)).toEqual(['a', 'b']);
});

it('could remove object from array', () => {
  const src = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const item = { id: 1 };
  const expected = [{ id: 2 }, { id: 3 }];

  expect(Rejecter.run(src, item, { idKey: 'id' })).toEqual(expected);
})

it('could handle nested objects', () => {
  const src = [{ id: 1, children: [{ id: 11 }, { id: 21 }] },
               { id: 2, children: [{ id: 22 }] }, { id: 3 }];
  const item = { id: 22 };
  const expected = [{ id: 1, children: [{ id: 11 }, { id: 21 }] },
                    { id: 2, children: [] }, { id: 3 }];
  const actual = Rejecter.run(src, item, { idKey: 'id', childKey: 'children' });

  expect(actual).toEqual(expected);
});

it('could also handle complex data', () => {
  const src = [{ id: 1, children: [{ id: 11 }, { id: 21 }] },
               { id: 2, children: [{ id: 22 }] }, { id: 3 }, 'a', 'b', 'c'];
  const item = [{ id: 22 }, 'c'];
  const expected = [{ id: 1, children: [{ id: 11 }, { id: 21 }] },
                    { id: 2, children: [] }, { id: 3 }, 'a', 'b'];
  const actual = Rejecter.run(src, item, { idKey: 'id', childKey: 'children' });

  expect(actual).toEqual(expected);
});

describe('could accept a function', () => {
  describe('when basic elements', () => {
    it('works', () => {
      const actual = Rejecter.run(['a', 'b', 'bbc'], (s) => s.includes('b'));
      expect(actual).toEqual(['a']);
    })
  })

  describe('when nested objects', () => {
    it('works', () => {
      const collection = [
        { id: '1', children: [{ id: '11', children: [] }] },
        { id: '2', children: [] },
        { id: '3', children: [{ id: '33', selected: true, children: [] },
                              { id: '34', children: [] }] }
      ]
      const actual = Rejecter.run(collection,
                                  (r) => !r.selected && r.children.length === 0,
                                  { idKey: 'id', childKey: 'children' });
      const expected = [{ id: '3', children: [{ id: '33', selected: true, children: [] }] }];
      expect(actual).toEqual(expected);
    })
  })
});
