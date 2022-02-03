import {
	ANTE,
	DEAL,
	DRAW,
	NEW_GAME,
	SHOWDOWN,
	SHUFFLE_DECK,
} from 'game/state/GameState.slice';
import { AppDispatch, store } from 'app/store';

import { StateOfPlay } from 'game/models/Game.model';

const PlaySequence: Array<StateOfPlay> = [
	'New Game',
	'Shuffle',
	'Ante',
	'Deal',
	'Draw',
	'Showdown',
];

const dispatchAction: AppDispatch = store.dispatch;

const startNewGame = () => {
	dispatchAction(
		NEW_GAME({
			players: [
				{
					id: '45209ddf-b188-497e-b8b0-cbf65aaaf978',
					name: 'Philip J. Fry',
					bank: 50,
					actor: 'Ai',
				},
				{
					id: '59e41075-c908-4595-80cb-21c730df24f9',
					name: 'Turanga Leela',
					bank: 50,
					actor: 'Ai',
				},
				{
					id: '5a9dbcad-c6cb-41f0-bce6-0aee3cc90230',
					name: 'Player',
					bank: 50,
					actor: 'User',
				},
				{
					id: 'b1c4bb48-7142-419d-ba9f-1c6fd379fdad',
					name: 'Bender B. Rodríguez',
					bank: 50,
					actor: 'Ai',
				},
				{
					id: '24e9cc0e-ff0f-4e1e-a04b-c369296bd33a',
					name: 'Prof. Hubert J. Farnsworth',
					bank: 50,
					actor: 'Ai',
				},
			],
			ante: 15,
		})
	);
};

export const resetGame = startNewGame;

const shuffleDeck = () => {
	dispatchAction(SHUFFLE_DECK());
};

const buyIn = () => {
	dispatchAction(ANTE());
};

const dealCards = () => {
	dispatchAction(DEAL());
};

const runPlayerActions = () => {
	dispatchAction(DRAW());
};

const showdown = () => {
	dispatchAction(SHOWDOWN());
};

const getCurrentStateOfPlay = (): StateOfPlay =>
	store.getState().game.stateOfPlay;

const getNextStateOfPlay = (): StateOfPlay => {
	const current = getCurrentStateOfPlay();
	// Next round
	if (current === 'Showdown') return 'Shuffle';
	// New Game
	if (current === 'Game Over') return 'New Game';

	// All other sates are sequential
	const nextIndex = (PlaySequence.indexOf(current) + 1) % PlaySequence.length;

	return PlaySequence[nextIndex];
};

const TransitionActions: { [key: string]: Function } = {
	'New Game': startNewGame,
	Shuffle: shuffleDeck,
	Ante: buyIn,
	Deal: dealCards,
	Draw: runPlayerActions,
	Showdown: showdown,
} as const;

interface Transition {
	current: StateOfPlay;
	next: StateOfPlay;
	runAction: Function;
}

export const gameTick = (): Transition => {
	const next = getNextStateOfPlay();
	const transition: Transition = {
		current: getCurrentStateOfPlay(),
		next: next,
		runAction: TransitionActions[next],
	};

	return transition;
};
