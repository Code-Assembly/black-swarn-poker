import {
	ACE,
	CardPrimeRank,
	IPlayingCard,
} from 'game/models/PlayingCard.model';
import {
	HandRank,
	HandRankOrder,
	HandRankProbability,
} from 'game/models/HandRank.model';

export const getHandRankOrder = (handRank: HandRank) => HandRankOrder[handRank];

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
 * Detects a hand with a sequence that decreases by one with each card
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

const groupHand = (hand: Array<IPlayingCard>): Map<number, number> => {
	const groupMap: Map<number, number> = new Map();
	hand.forEach((card) => {
		groupMap.set(card.rank, (groupMap.get(card.rank) ?? 0) + 1);
	});

	return groupMap;
};

// We can assign each hand a unique value by deriving a key from the set counts
const GroupMap: { [key: number]: HandRank } = {
	// [17] eg. K-K-K-K-Q
	[(4 ^ 2) + (1 ^ 2)]: 'Four of a Kind',
	// [13] eg. K-K-K-Q-Q
	[(3 ^ 2) + (2 ^ 2)]: 'Full House',
	// [11] .eg K-K-K-7-5
	[(3 ^ 2) + (1 ^ 2) + (1 ^ 2)]: 'Three of a Kind',
	// [9] eg. 7-7-7-4-5
	[(2 ^ 2) + (2 ^ 2) + (1 ^ 2)]: 'Two Pair',
	// [7] eg. A-A-7-2-5
	[(2 ^ 2) + (1 ^ 2) + (1 ^ 2) + (1 ^ 2)]: 'Pair',
} as const;

const getGroupHandRank = (groups: Map<number, number>): HandRank | null => {
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
	const groupedHandRank = getGroupHandRank(groups);

	if (groupedHandRank != null) {
		return groupedHandRank;
	}

	if (flushSuit) return 'Flush';
	if (straightHand) return 'Straight';

	return 'High Card';
};

const getPrimeProductRank = (hand: Array<IPlayingCard>) => {
	return hand.reduce((product: number, card: IPlayingCard) => {
		return CardPrimeRank[card.rank.toString()] * product;
	}, 1);
};

export const compareHandsByRank = (
	handA: Array<IPlayingCard>,
	handB: Array<IPlayingCard>
): number => {
	const rankA = rankHand(handA);
	const rankB = rankHand(handB);

	if (rankA !== rankB) {
		return HandRankOrder[rankA] - HandRankOrder[rankB];
	}

	switch (rankA) {
		case 'Royal Flush':
			return 0;

		case 'Straight Flush':
			return getPrimeProductRank(handA) - getPrimeProductRank(handB);

		case 'Four of a Kind':
			const handAKicker =
				handA[0].rank === handA[1].rank
					? handA[handA.length - 1]
					: handA[0];

			const handBKicker =
				handB[0].rank === handB[1].rank
					? handB[handB.length - 1]
					: handB[0];

			return handAKicker.rank - handBKicker.rank;

		// Caveat sets are not carefully ranked
		// TODO: Grouped sets should compare groups before kickers
		case 'Full House':
		case 'Flush':
		case 'Straight':
		case 'Three of a Kind':
		case 'Two Pair':
		case 'Pair':
		case 'High Card':
			return getPrimeProductRank(handA) - getPrimeProductRank(handB);
	}

	return 0;
};
