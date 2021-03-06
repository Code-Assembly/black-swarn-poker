import { HandRank } from 'game/models/HandRank.model';
import { IPlayingCard } from 'game/models/PlayingCard.model';

export interface IPlayer {
	id: string;
	name: string;
	//
	hand: Array<IPlayingCard>;
	handRank: HandRank;
	bank: number;
	//
	revealHand: boolean;
	//
	actor: 'User' | 'Ai';
	playState: 'In' | 'Out' | 'Folded';
}
