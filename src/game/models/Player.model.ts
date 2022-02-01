import { PlayingCardT } from 'game/models/PlayingCardT.model';
import { HandRank } from '../FiveCardHandRanker.service';

export interface IPlayer {
	name: String;
	hand: Array<PlayingCardT>;
	handRank: HandRank;
	bank: number;
	actor: 'User' | 'Ai';
	state: 'In' | 'Out';
}
