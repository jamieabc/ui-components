import Merger from '../../src/utils/Merger';

function sortFunc(a, b) {
  return a['id'] > b['id'] ? 1 : -1;
}

describe('when data duplicates', () => {
  it('do not copy', () => {
    const base = [1];
    const src = [1];

    expect(Merger.run(base, src)).toEqual([1]);
  })
})

it('could handle []', () => {
  const base = [1];
  const src = ['a'];

  expect(Merger.run(base, src)).toEqual([1, 'a']);
})

it('could handle {}', () => {
  const base = { a: [1] };
  const src = { a: ['lol'], b: '1' };

  expect(Merger.run(base, src)).toEqual({ a: [1, 'lol'], b: '1' });
})

it('could merge objects indentified with specific key', () => {
  const base = [{ id: 1 }, { id: 3 }];
  const src = [{ id: 1, value: 'a' }, { id: 2 }];

  expect(Merger.run(base, src, { idKey: 'id' }).sort(sortFunc))
    .toEqual([{ id: 1, value: 'a' }, { id: 2 }, { id: 3 }].sort(sortFunc));
})

it('could handle complex data', () => {
  // individual node is { id, children }
  const base = [
    {
      id: 1,
      children: [
        {
          id: 11,
          children: [
            { id: 111 }
          ]
        },
        {
          id: 21,
          children: [
            { id: 121 }
          ]
        }
      ]
    },
    {
      id: 2,
      children: [
        {
          id: 22,
          children: []
        }
      ]
    }
  ];
  const src = [
    {
      id: 1,
      children: [
        {
          id: 11,
          children: [
            { id: 111, children: [] },
            { id: 211, children: [] },
          ]
        }
      ]
    },
    {
      id: 2,
      children: [
        {
          id: 32,
          children: []
        }
      ]
    },
    { id: 3, children: [] }
  ];

  const expected = [
    {
      id: 1,
      children: [
        {
          id: 11,
          children: [
            { id: 111, children: [] },
            { id: 211, children: [] },
          ]
        },
        {
          id: 21,
          children: [
            { id: 121 }
          ]
        }
      ]
    },
    {
      id: 2,
      children: [
        {
          id: 22,
          children: []
        },
        {
          id: 32,
          children: []
        }
      ]
    },
    { id: 3, children: [] }
  ];

  expect(Merger.run(base, src, { idKey: 'id' }).sort(sortFunc))
    .toEqual(expected.sort(sortFunc));
})

describe('when options.overrideKey is provided', () => {
  it('stops going deeper', () => {
    const target = [{ id: 1, children: [{ id: 11 }] },
                    { id: 2, children: [{ id: 22 }] }];
    const src = [{ id: 1, children: [] },
                 { id: 2, selected: true, children: [] }];
    const expected = [{ id: 1, children: [{ id: 11 }] },
                      { id: 2, selected: true, children: [] }];

    expect(Merger.run(target, src, { idKey: 'id', overrideKey: 'selected' }).sort(sortFunc))
      .toEqual(expected.sort(sortFunc));
  })
})
