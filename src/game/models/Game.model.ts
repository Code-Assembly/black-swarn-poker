import { IPlayer } from 'game/models/Player.model';
import { IPlayingCard } from 'game/models/PlayingCard.model';

export type StateOfPlay =
	| 'Ready'
	| 'New Game'
	| 'Shuffle'
	| 'Ante'
	| 'Deal'
	| 'Draw'
	| 'Showdown';

export interface IGame {
	// Game
	players: Array<IPlayer>;
	deck: Array<IPlayingCard>;
	stateOfPlay: StateOfPlay;

	ante: number;
	// Round
	pot: number;
	lastBet: number;
	round: number;
}
