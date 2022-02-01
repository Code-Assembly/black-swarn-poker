import { PlayingCardT } from 'game/models/PlayingCardT.model';
import { IPlayer } from 'game/models/Player.model';

export type PlayStates =
	| 'Start'
	| 'Shuffle'
	| 'Ante'
	| 'Deal'
	| 'Draw'
	| 'Bet'
	| 'Showdown';

export interface IGame {
	players: Array<IPlayer>;
	deck: Array<PlayingCardT>;
	stateOfPlay: PlayStates;
	pot: number;
	lastBet: number;
	ante: number;
	round: number;
	//
	shuffleDeck: (deck: Array<PlayingCardT>) => Array<PlayingCardT>;
	sortHand: (hand: Array<PlayingCardT>) => Array<PlayingCardT>;
}
