import { arrayToObj, countJobAllocations } from './Helper';

test('arrayToObj func', () => {
  const testArr = [
    {
      id: 1,
      name: 'Jack',
    },
    {
      id: 2,
      name: 'Rose',
    },
  ];
  const results = arrayToObj('id', testArr);
  const expectedResults = {
    1: {
      id: 1,
      name: 'Jack',
    },
    2: {
      id: 2,
      name: 'Rose',
    },
  };

  expect(expectedResults).toEqual(results);
});

test('countJobAllocations func', () => {
  const testParams1 = [
    {
      id: '0',
      name: 'Build a fence',
      contactId: '0',
      start: '2018-09-01T10:00:00Z',
      end: '2018-09-01T11:00:00Z',
      location: 'Brisbane',
    },
    {
      id: '1',
      name: 'Build a shed',
      contactId: '1',
      start: '2018-09-01T10:15:00Z',
      end: '2018-09-01T11:00:00Z',
      location: 'Brisbane',
    },
    {
      id: '2',
      name: 'Shield some wiring',
      contactId: '0',
      start: '2018-09-01T09:00:00Z',
      end: '2018-09-01T13:00:00Z',
      location: 'Brisbane',
    },
    {
      id: '3',
      name: 'Pick up a trailer',
      contactId: '0',
      start: '2018-09-01T13:00:00Z',
      end: '2018-09-01T13:15:00Z',
      location: 'Brisbane',
    },
  ];

  const testParams2 = [
    { id: '0', resourceId: 1, jobId: 1 },
    { id: '1', resourceId: 0, jobId: 2 },
  ];

  const expectedResults = [
    {
      id: '0',
      name: 'Build a fence',
      contactId: '0',
      start: '2018-09-01T10:00:00Z',
      end: '2018-09-01T11:00:00Z',
      location: 'Brisbane',
      count: 0,
    },
    {
      id: '1',
      name: 'Build a shed',
      contactId: '1',
      start: '2018-09-01T10:15:00Z',
      end: '2018-09-01T11:00:00Z',
      location: 'Brisbane',
      count: 1,
    },
    {
      id: '2',
      name: 'Shield some wiring',
      contactId: '0',
      start: '2018-09-01T09:00:00Z',
      end: '2018-09-01T13:00:00Z',
      location: 'Brisbane',
      count: 1,
    },
    {
      id: '3',
      name: 'Pick up a trailer',
      contactId: '0',
      start: '2018-09-01T13:00:00Z',
      end: '2018-09-01T13:15:00Z',
      location: 'Brisbane',
      count: 0,
    },
  ];

  const results = countJobAllocations(testParams1, testParams2);

  expect(expectedResults).toEqual(results);
});
