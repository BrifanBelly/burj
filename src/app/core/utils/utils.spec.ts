import { getNextInArray, getPrevInArray, removeObjectFromArray, updateObjectInArray } from './utils';
import { getNextTestCases, getPrevTestCases } from '../../../../testing/fixtures/utils-test-cases';

interface MockObject {
	id: number;
	a: string;
}

const objects: MockObject[] = [ { a: '1', id: 0 }, { a: '2', id: 1 }, { a: '7', id: 2 } ];
const numbers: number[] = [ 1, 2, 3, 4, 5 ];

describe('Utils', () => {
  const arrayOfNumbers: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
  const arrayOfObjects: { key: string, value: string }[] = [
    { key: 'key 1', value: 'value 1' },
    { key: 'key 2', value: 'value 2' },
    { key: 'key 3', value: 'value 3' },
    { key: 'key 4', value: 'value 4' },
    { key: 'key 5', value: 'value 5' },
  ];

  const getNextTestCases: any[] = [
    { input: [ arrayOfNumbers, 2 ], expect: 3 },
    { input: [ arrayOfNumbers, 1 ], expect: 2 },
    { input: [ arrayOfNumbers, 8 ], expect: 9 },
    { input: [ arrayOfNumbers, 9 ], expect: 1 },
    { input: [ arrayOfNumbers, 11 ], expect: undefined },
    { input: [ arrayOfNumbers, 10 ], expect: undefined },
    { input: [ arrayOfObjects, arrayOfObjects[ 0 ] ], expect: arrayOfObjects[ 1 ] },
    { input: [ arrayOfObjects, arrayOfObjects[ 4 ] ], expect: arrayOfObjects[ 0 ] },
    { input: [ arrayOfObjects, arrayOfObjects[ 5 ] ], expect: undefined },
    { input: [ arrayOfObjects, arrayOfObjects[ 0 ], 'key' ], expect: { key: 'key 2', value: 'value 2' } },
    { input: [ arrayOfObjects, arrayOfObjects[ 4 ], 'key' ], expect: { key: 'key 1', value: 'value 1' } },
    { input: [ arrayOfObjects, { key: 'key 11' }, 'key' ], expect: undefined },
  ];

  const getPrevTestCases: any[] = [
    { input: [ arrayOfNumbers, 2 ], expect: 1 },
    { input: [ arrayOfNumbers, 9 ], expect: 8 },
    { input: [ arrayOfNumbers, 1 ], expect: 9 },
    { input: [ arrayOfNumbers, 0 ], expect: undefined },
    { input: [ arrayOfNumbers, 11 ], expect: undefined },
    { input: [ arrayOfNumbers, 10 ], expect: undefined },
    { input: [ arrayOfObjects, arrayOfObjects[ 0 ] ], expect: arrayOfObjects[ 4 ] },
    { input: [ arrayOfObjects, arrayOfObjects[ 4 ] ], expect: arrayOfObjects[ 3 ] },
    { input: [ arrayOfObjects, arrayOfObjects[ 5 ] ], expect: undefined },
    { input: [ arrayOfObjects, arrayOfObjects[ 0 ], 'key' ], expect: { key: 'key 5', value: 'value 5' } },
    { input: [ arrayOfObjects, arrayOfObjects[ 4 ], 'key' ], expect: { key: 'key 4', value: 'value 4' } },
    { input: [ arrayOfObjects, { key: 'key 11' }, 'key' ], expect: undefined },
  ];

  fit('#getNextInArray should return next argument from array or undefined', () => {
    getNextTestCases.forEach(( testCase: any ) => {
      const result = getNextInArray<number>(testCase.input[ 0 ], testCase.input[ 1 ], testCase.input[ 2 ]);
      expect(result).toEqual(testCase.expect);
    });
  });

  it('#getPrevInArray should return previous argument from array or undefined', () => {
    getPrevTestCases.forEach(( testCase: any ) => {
      const result = getPrevInArray<number>(testCase.input[ 0 ], testCase.input[ 1 ], testCase.input[ 2 ]);
      expect(result).toEqual(testCase.expect);
    });
  });

	describe('#updateObjectInArray should update object', () => {
		it('should update object', () => {
			const updated1 = updateObjectInArray<MockObject>(objects, { a: '66', id: 0 }, 'id');
			const updated2 = updateObjectInArray<MockObject>(objects, { a: '66', id: 7 }, 'id');
			expect(updated1.length).toEqual(objects.length);
			expect(updated1).toContain({ a: '66', id: 0 });
			expect(updated2.length).toEqual(objects.length);
			expect(updated2.length).not.toContain({ a: '66', id: 7 });
		});

	});
	describe('#removeObjectFromArray', () => {
		it('should remove base type', () => {
			expect(removeObjectFromArray<number>(numbers, 3)).toEqual([ 1, 2, 4, 5 ]);
			expect(removeObjectFromArray<number>(numbers, 1)).not.toContain(1);
			expect(removeObjectFromArray<number>(numbers, 8)).toEqual(numbers);
		});
		it('should remove object by..', () => {
			expect(removeObjectFromArray<MockObject>(objects, { a: '2', id: 1 }, 'a'))
			.toEqual([ { a: '1', id: 0 }, { a: '7', id: 2 } ]);
			expect(removeObjectFromArray<MockObject>(objects, { a: '8', id: 2 }, 'a')).toEqual(objects);
		});
	});

});
