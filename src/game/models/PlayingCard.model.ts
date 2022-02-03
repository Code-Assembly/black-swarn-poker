export type CardSuit = 'Spades' | 'Hearts' | 'Diamonds' | 'Clubs';

export interface IPlayingCard {
	suit: CardSuit;
	rank: number;
}

// Ranking for non numeric cards
export const ACE = 14;
export const KING = 13;
export const QUEEN = 12;
export const JACK = 11;

// FUTURE: implement a variation of Cactus Kev's algorithm
// http://suffe.cool/poker/evaluator.html
export const CardPrimeRank: { [key: string]: number } = {
	'14': 41,
	'13': 37,
	'12': 31,
	'11': 29,
	'10': 23,
	'9': 19,
	'8': 17,
	'7': 14,
	'6': 11,
	'5': 7,
	'4': 5,
	'3': 3,
	'2': 2,
} as const;
// export const CardRank = {
// 	ACE: 41,
// 	KING: 37,
// 	QUEEN: 31,
// 	JACK: 29,
// 	TEN: 23,
// 	NINE: 19,
// 	EIGHT: 17,
// 	SEVEN: 14,
// 	SIX: 11,
// 	FIVE: 7,
// 	FOUR: 5,
// 	TREY: 3,
// 	DEUCE: 2,
// } as const;
