/**
 * Richard Durstenfeld implementation of tFisher–Yates shuffle
 * returns a new array with randomly ordered elements of the
 * input array.
 *
 * See {@link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm | Fisher–Yates shuffle Wikipedia}
 * for an in-depth explanation of the algorithm.
 *
 * @param arr an array of elements to be shuffled
 * @returns a new array with a shuffled elements
 */
export const fisherYatesShuffle = <T>(arr: Array<T>): Array<T> => {
	// Create a shallow copy
	const shuffled: Array<T> = arr.slice();

	// Start at n - 1
	let i = arr.length - 1;

	// Continue until i === 1
	while (i > 0) {
		// Select a random index where 0 <= randomIndex <= i
		const randomIndex = Math.floor(Math.random() * (i + 1));

		// Swap the two elements
		const swap = shuffled[i];
		shuffled[i] = shuffled[randomIndex];
		shuffled[randomIndex] = swap;

		// decrement the index
		i -= 1;
	}

	return shuffled;
};
