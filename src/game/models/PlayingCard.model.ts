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
export const CardRank = {
	ACE: 41,
	KING: 37,
	QUEEN: 31,
	JACK: 29,
	TEN: 23,
	NINE: 19,
	EIGHT: 17,
	SEVEN: 14,
	SIX: 11,
	FIVE: 7,
	FOUR: 5,
	TREY: 3,
	DEUCE: 2,
} as const;
