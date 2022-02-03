import { ACE, CardSuit, IPlayingCard } from 'game/models/PlayingCard.model';
import { IPlayer } from 'game/models/Player.model';

import { GreaterThanFn, quickSort } from 'app/array/sort';
import { fisherYatesShuffle } from 'app/array/shuffle';

export const buildDeck = (): Array<IPlayingCard> => {
	const suits: Array<CardSuit> = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];

	const deck: Array<IPlayingCard> = [];
	suits.forEach((suit: CardSuit) => {
		for (let cardValue = 2; cardValue <= ACE; cardValue++) {
			deck.push({ suit, rank: cardValue });
		}
	});

	return deck;
};

export const createPlayer = (
	id: string,
	name: string,
	bank: number,
	actor: 'Ai' | 'User'
): IPlayer => ({
	id,
	name,
	bank,
	hand: [],
	handRank: 'High Card',
	revealHand: actor === 'User',
	actor,
	playState: 'In',
});

export const shuffleDeck: (deck: Array<IPlayingCard>) => Array<IPlayingCard> =
	fisherYatesShuffle;

const isRankedHigher = (a: IPlayingCard, b: IPlayingCard) => a.rank < b.rank;

export const sortHand = (hand: Array<IPlayingCard>): Array<IPlayingCard> =>
	quickSort(hand, isRankedHigher as GreaterThanFn);
