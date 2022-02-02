export type GreaterThanFn = <T>(a: T, b: T) => boolean;

const greaterThan: GreaterThanFn = (a, b) => a > b;


/**
 * Quick Sort: Accepts an array and comparison function and returns an ordered array 
 * 
 * @param arr - unsorted input array
 * @param isGreaterThan - custom comparison function of the form (a,b) => boolean. 
 * Accepts two input parameters and returns true if a > b  
 * 
 * @returns new sorted array
 */
 export const quickSort = <T>(
	arr: Array<T>,
	isGreaterThan: GreaterThanFn = greaterThan
): Array<T> => {
	if (arr.length <= 1) {
		return [...arr];
	}
	// Select the first element as the pivot for comparisons
	const pivot: T = arr[0];
	// Temporary arrays to store values larger or smaller that the pivot
	const lessThanPivot: Array<T> = [];
	const greaterThanPivot: Array<T> = [];

	for (let i = 1; i < arr.length; i++) {
		const value = arr[i];
		if (isGreaterThan(value, pivot)) {
			greaterThanPivot.push(value);
		} else {
			lessThanPivot.push(value);
		}
	}

	return ([] as Array<T>).concat(
		quickSort(lessThanPivot, isGreaterThan),
		pivot,
		quickSort(greaterThanPivot, isGreaterThan)
	);
};

/**
 * Merge Sort: Accepts an array and optional comparison function as input
 * and returns an ordered array.
 * 
 * @param arr - unsorted input array
 * @param isGreaterThan - custom comparison function of the form (a,b) => boolean. 
 * Accepts two input parameters and returns true if a > b  
 * 
 * @returns new sorted array
 */
export const mergeSort = <T>(
	arr: Array<T>,
	isGreaterThan: GreaterThanFn = greaterThan
): Array<T> => {
	if (arr.length === 1) {
		return arr;
	}

	const middle = Math.floor(arr.length / 2);
	const left = arr.slice(0, middle);
	const right = arr.slice(middle);
	return merge(mergeSort(left), mergeSort(right), isGreaterThan);
};

const merge = <T>(
	left: Array<T>,
	right: Array<T>,
	isGreaterThan: GreaterThanFn = greaterThan
): Array<T> => {
	let sorted: Array<T> = [];

	while (left.length && right.length) {
		const value: T | undefined = isGreaterThan(left[0], right[0])
			? right.shift()
			: left.shift();
		sorted.push(value!);
	}

	// Add any remaining elements
	if (left.length) {
		sorted = sorted.concat(left);
	}
	if (right.length) {
		sorted = sorted.concat(right);
	}

	return sorted;
};
