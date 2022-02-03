import React from 'react';

import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { IGame } from 'game/models/Game.model';
import { RootState } from 'app/store';
import { delay } from 'app/utils';

import { Button } from 'game/components/Button';
import { Dealer } from 'game/agents/Dealer';
import { HeaderBar } from 'game/components/HeaderBar';
import { Player } from 'game/agents/Player';
import { WinnerNotice } from 'game/components/WinnerNotice';

import { gameTick } from 'game/engine/GameMachine';

const Container = styled.main`
	display: flex;
	flex-direction: column;

	width: 100vw;
	min-height: 100vh;
`;

const Table = styled.main`
	display: flex;
	flex-direction: column;
	width: 100vw;
	flex: 1 0 auto;
	flex-wrap: wrap;
	padding: 2rem;
`;

const House = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 2rem;
`;

const Guests = styled.section`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
`;

interface FiveCardPokerProps {}

export const FiveCardPoker: React.FC<FiveCardPokerProps> = () => {
	const game: IGame = useSelector((state: RootState) => state.game);
	const displayWinnerNotice: boolean = useSelector((state: RootState) => {
		return (
			(state.game.stateOfPlay === 'Showdown' ||
				state.game.stateOfPlay === 'Game Over') &&
			state.game.lastWinner !== null
		);
	});
	// const roundWinner: IPlayer = useSelector((state: RootState) => state.game);

	const playGame = async () => {
		let transition = gameTick();

		switch (transition.next) {
			case 'New Game':
				transition.runAction();
				playGame();
				break;
			case 'Shuffle':
				transition.runAction();
				await delay(2500);
				playGame();
				break;
			case 'Ante':
				transition.runAction();
				await delay(2000);
				playGame();
				break;
			case 'Deal':
				transition.runAction();
				await delay(3000);
				playGame();
				break;
			case 'Draw':
				transition.runAction();
				await delay(2000);
				// TODO: Pass control to Ai and User in turn
				playGame();
				break;
			case 'Showdown':
				transition.runAction();
				await delay(3000);
				break;
		}
	};

	return (
		<Container>
			<HeaderBar />
			<Table>
				<House>
					<Dealer game={game}>
						{(game.stateOfPlay === 'Ready' ||
							game.stateOfPlay === 'Game Over') && (
							<Button onClick={playGame}>New Game</Button>
						)}

						{game.stateOfPlay === 'Showdown' && (
							<Button onClick={playGame}>Next Round</Button>
						)}
					</Dealer>
					{displayWinnerNotice && (
						<WinnerNotice
							winner={game.lastWinner!}
							victory={
								game.stateOfPlay === 'Game Over'
									? 'Game'
									: 'Round'
							}
						/>
					)}
				</House>
				<Guests>
					{game.players.map((player, i) => (
						<Player key={`${player.name}_${i}`} player={player} />
					))}
				</Guests>
			</Table>
		</Container>
	);
};
