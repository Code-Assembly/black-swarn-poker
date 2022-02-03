import { ACE, IPlayingCard } from 'game/models/PlayingCard.model';

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
	'Royal Flush': 1,
	'Straight Flush': 2,
	'Four of a Kind': 3,
	'Full House': 4,
	Flush: 5,
	Straight: 6,
	'Three of a Kind': 7,
	'Two Pair': 8,
	Pair: 9,
	'High Card': 10,
} as const;

export const getHandRankOrder = (handRank: HandRank) => HandRankOrder[handRank];

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
export const getHandRankProbability = (handRank: HandRank) =>
	HandRankProbability[handRank];

/**
 * Detects a hand where the suit's of all card match
 *
 * @param hand - sorted hand ranked form highest [0] to lowest card [5]
 * @returns true if all cards in the hand have the same suit
 */
const isFlush = (hand: Array<IPlayingCard>): boolean => {
	return hand.every((card: IPlayingCard) => hand[0].suit === card.suit);
};

/**
 * Detects a hand with a sequence that decereses by one with each card
 * e.g. K-10-9-8-7 or 7-6-5-4-3
 *
 * @param hand - sorted hand ranked form highest [0] to lowest card [5]
 * @returns true if hand contains a full set of sequentially decreasing cards
 */
const isStraight = (hand: Array<IPlayingCard>): boolean => {
	return hand.every((card: IPlayingCard, index: number) => {
		// ignore the first card
		if (index === 0) return true;
		// the current card rank must be sequentially smaller that the previous one
		return card.rank === hand[index - 1].rank - 1;
	});
};

/**
 * Detects a hand with the sequence of A-K-Q-J-10
 *
 * @param hand - sorted hand ranked form highest [0] to lowest card [5]
 * @returns true if hand matches the sequence A-K-Q-J-10
 */
const isRoyalFlush = (hand: Array<IPlayingCard>) => {
	if (!isFlush(hand)) return false;

	// first card must be an ACE
	if (hand[0].rank !== ACE) return false;

	return isStraight(hand);
};

const isStraightFlush = (hand: Array<IPlayingCard>) => {
	if (!isFlush(hand)) return false;
	return isStraight(hand);
};

const groupHand = (hand: Array<IPlayingCard>): Map<number, number> => {
	const groupMap: Map<number, number> = new Map();
	hand.forEach((card) => {
		groupMap.set(card.rank, (groupMap.get(card.rank) ?? 0) + 1);
	});

	return groupMap;
};

// We can assign each hand a unique value by deriving a key from the set counts
const GroupMap: { [key: number]: HandRank } = {
	// K-K-K-K-Q
	[(4 ^ 2) + (1 ^ 2)]: 'Four of a Kind',
	// K-K-K-Q-Q
	[(3 ^ 2) + (2 ^ 2)]: 'Full House',
	// K-K-K-7-5
	[(3 ^ 2) + (1 ^ 2) + (1 ^ 2)]: 'Three of a Kind',
	// 7-7-7-4-5
	[(2 ^ 2) + (2 ^ 2) + (1 ^ 2)]: 'Two Pair',
	// A-A-7-2-5
	[(2 ^ 2) + (1 ^ 2) + (1 ^ 2) + (1 ^ 2)]: 'Pair',
} as const;

const groupHandValue = (groups: Map<number, number>): HandRank | null => {
	let handValue = 0;
	groups.forEach((value, key) => {
		handValue += value ^ 2;
	});

	return GroupMap[handValue] || null;
};

export const rankHand = (hand: Array<IPlayingCard>): HandRank => {
	// All cards in a hand are of the same suit
	const flushSuit = isFlush(hand);
	// All cards sequentially decrease in rank by 1
	const straightHand = isStraight(hand);

	if (flushSuit && straightHand) {
		// A-K-Q-J-10 same suit
		if (hand[0].rank === ACE) return 'Royal Flush';
		// 8-7-6-5-4 same suit
		return 'Straight Flush';
	}

	// Count groups
	const groups = groupHand(hand);
	// Rank the grouped hand
	const groupedHandRank = groupHandValue(groups);

	if (groupedHandRank != null) {
		return groupedHandRank;
	}

	return 'High Card';
};

