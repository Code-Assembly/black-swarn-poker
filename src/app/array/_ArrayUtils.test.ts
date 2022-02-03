import { mergeSort, quickSort } from './sort';
import { fisherYatesShuffle } from './shuffle';

const arrayIsShuffled = <T>(source: Array<T>, shuffled: Array<T>): boolean => {
	// Are the source and output the same length?
	if (source === shuffled || source.length !== shuffled.length) return false;

	// Assuming an array without duplicates was used as the source
	// can all elements of the source be found in the target
	if (!source.every((item: T) => shuffled.includes(item))) {
		return false;
	}

	// Ensure all item indexes have changed
	const numShuffled = source.reduce((count: number, item: T, i: number) => {
		return count + (item !== shuffled[i] ? 1 : 0);
	}, 0);

	// Ensure at least 75% of items are shuffled from their original index
	return numShuffled / source.length > 0.75;
};

const arrayIsEqual = <T>(source: Array<T>, target: Array<T>): boolean => {
	if (source === target || source.length !== target.length) return false;

	// Ensure all item are equal
	return source.every((item: T, i: number) => item === target[i]);
};

const orderedStr: Array<string> = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
];

const unorderedStr: Array<string> = [
	'E',
	'H',
	'C',
	'D',
	'A',
	'G',
	'B',
	'J',
	'I',
	'F',
];

const orderedInt: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const unorderedInt: Array<number> = [5, 1, 3, 9, 0, 6, 8, 4, 2, 7];

describe('Test core array utilities', () => {
	test('Fisher Yates Shuffle: array is randomly ordered', () => {
		const shuffledStr = fisherYatesShuffle<string>(orderedStr);
		expect(arrayIsShuffled(orderedStr, shuffledStr)).toBe(true);

		const shuffledInt = fisherYatesShuffle<number>(orderedInt);
		expect(arrayIsShuffled(orderedInt, shuffledInt)).toBe(true);
	});

	test('Quick Sort: returns an sorted array', () => {
		const sortedStr = quickSort<string>(unorderedStr, (a, b) => a > b);
		expect(arrayIsEqual(orderedStr, sortedStr)).toBe(true);

		const sortedInts = quickSort<number>(unorderedInt, (a, b) => a > b);
		expect(arrayIsEqual(orderedInt, sortedInts)).toBe(true);
	});

	test('Merge Sort: returns an sorted array', () => {
		const sortedStr = mergeSort<string>(unorderedStr, (a, b) => a > b);
		expect(arrayIsEqual(orderedStr, sortedStr)).toBe(true);

		const sortedInts = mergeSort<number>(unorderedInt, (a, b) => a > b);
		expect(arrayIsEqual(orderedInt, sortedInts)).toBe(true);
	});
});
