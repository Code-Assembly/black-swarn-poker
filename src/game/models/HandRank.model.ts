export type HandRank =
	| 'Royal Flush'
	| 'Straight Flush'
	| 'Four of a Kind'
	| 'Full House'
	| 'Flush'
	| 'Straight'
	| 'Three of a Kind'
	| 'Two Pair'
	| 'Pair'
	| 'High Card';

export const HandRankOrder: { [rank in HandRank]: number } = {
	'Royal Flush': 10,
	'Straight Flush': 9,
	'Four of a Kind': 8,
	'Full House': 7,
	Flush: 6,
	Straight: 5,
	'Three of a Kind': 4,
	'Two Pair': 3,
	Pair: 2,
	'High Card': 1,
} as const;

export const HandRankProbability: { [rank in HandRank]: number } = {
	'Royal Flush': 0.000154,
	'Straight Flush': 0.0015,
	'Four of a Kind': 0.0256,
	'Full House': 0.17,
	Flush: 0.367,
	Straight: 0.76,
	'Three of a Kind': 2.87,
	'Two Pair': 7.62,
	Pair: 49.9,
	'High Card': 100,
} as const;
