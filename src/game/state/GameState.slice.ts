import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IGame } from 'game/models/Game.model';
import { IPlayer } from 'game/models/Player.model';

import {
	buildDeck,
	createPlayer,
	shuffleDeck,
	sortHand,
} from 'game/engine/Game.services';
import { compareHandsByRank, rankHand } from 'game/engine/HandRanker.service';

const initialState: IGame = {
	players: [],
	deck: [],
	ante: 10,
	stateOfPlay: 'Ready',
	//
	pot: 0,
	round: 0,
	lastBet: 0,
	//
	lastWinner: null,
};

type StartActionPayload = {
	players: Array<{
		id: string;
		name: string;
		bank: number;
		actor: 'Ai' | 'User';
	}>;
	ante: number;
};

const playerIsIn = (player: IPlayer) => player.playState === 'In';

export const GameStateSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		NEW_GAME: (game: IGame, action: PayloadAction<StartActionPayload>) => {
			game.stateOfPlay = 'New Game';

			const { ante, players } = action.payload;

			// Reset Game
			game.ante = ante;
			game.deck = [];
			game.pot = 0;
			game.round = 0;
			game.lastBet = 0;
			game.lastWinner = null;

			// Create Players
			game.players = players.map(({ id, name, bank, actor }) =>
				createPlayer(id, name, bank, actor)
			);
		},

		SHUFFLE_DECK: (game) => {
			game.stateOfPlay = 'Shuffle';

			game.players.forEach((player: IPlayer) => {
				console.log(player);
				// Remove players without sufficient bank
				player.playState = player.bank >= game.ante ? 'In' : 'Out';
				// Return all cards to the deck
				player.hand = [];
				// Make the Users hand visible
				player.revealHand = player.actor === 'User';
			});

			// Shuffle deck
			game.deck = buildDeck();
			game.deck = shuffleDeck(game.deck);
		},

		ANTE: (game: IGame) => {
			game.stateOfPlay = 'Ante';
			game.players.filter(playerIsIn).forEach((player: IPlayer) => {
				player.bank -= game.ante;
				game.pot += game.ante;
			});

			game.lastBet = game.ante;

			// Start the round
			game.round++;
			game.lastWinner = null;
		},

		DEAL: (game: IGame) => {
			game.stateOfPlay = 'Deal';
			game.players.filter(playerIsIn).forEach((player: IPlayer) => {
				// deal 5 cards to each player
				for (let card = 0; card < 5; card++) {
					player.hand.push(game.deck.pop()!);
				}
				// Sort the hands
				player.hand = sortHand(player.hand);
				// // Rank the hand
				player.handRank = rankHand(player.hand);
			});
		},

		DRAW: (game: IGame) => {
			game.stateOfPlay = 'Draw';
			game.players.filter(playerIsIn).forEach((player) => {
				// Pass control to the player actors
				// run the actions asynchronously and compound the resulting state
			});
		},

		SHOWDOWN: (game: IGame) => {
			game.stateOfPlay = 'Showdown';

			// Show all hands
			game.players.forEach((player) => {
				player.revealHand = true;
				// Mark players that won't have enough for the next round
				player.playState = player.bank >= game.ante ? 'In' : 'Out';
			});

			const leaderBoard = game.players
				.filter(playerIsIn)
				.sort((playerA, playerB) =>
					compareHandsByRank(playerA.hand, playerB.hand)
				);

			// assign the winnings
			const roundWinner: IPlayer = leaderBoard.pop()!;
			roundWinner.bank += game.pot;
			game.pot = 0;
			game.lastWinner = roundWinner;

			const remainingPlayers = game.players.filter(playerIsIn);
			const user = game.players.find((player) => player.actor === 'User');

			// If there is than 3 players, or the User is out, end the game
			if (remainingPlayers.length < 3 || (user && !playerIsIn(user))) {
				let largestBank = 0;
				remainingPlayers.forEach((player) => {
					if (player.bank > largestBank) {
						game.lastWinner = player;
						largestBank = player.bank;
					}
				});
				game.stateOfPlay = 'Game Over';
			}
		},
	},
});

export const { NEW_GAME, SHUFFLE_DECK, ANTE, DEAL, DRAW, SHOWDOWN } =
	GameStateSlice.actions;

export const GameStateReducer = GameStateSlice.reducer;
