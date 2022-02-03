import React from 'react';

import styled from 'styled-components';

import { ChipCount } from 'game/components/ChipCount';
import { PlayerHand } from 'game/deck/PlayerHand';

import { IPlayer } from 'game/models/Player.model';

interface PlayerProps {
	player: IPlayer;
}

const Seat = styled.article`
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 1.4em;
`;

const PlayerDetail = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
`;

const PlayerName = styled.h1<{ inPlay: boolean }>`
	font-size: 1em;
	line-height: 2;
	text-align: center;
	margin: 0;
	opacity: ${(props) => (props.inPlay ? 1 : 0.5)};
	text-decoration: ${(props) => (props.inPlay ? 'none' : 'line-through')};
`;

const HandRank = styled.p`
	font-size: 0.8em;
	line-height: 2;
	text-align: center;
	margin: 1.8rem 0 0.4rem 0;
`;

export const Player: React.FC<PlayerProps> = ({ player }) => {
	return (
		<Seat>
			<PlayerHand hand={player.hand} reveal={player.revealHand} />
			<PlayerDetail>
				<HandRank>
					{player.revealHand ? player.handRank : '---'}
				</HandRank>
				<ChipCount count={player.bank} />
				<PlayerName inPlay={player.playState === 'In'}>
					{player.name}
				</PlayerName>
			</PlayerDetail>
			{player.actor === 'User' && (
				// TODO: These are placeholders for user actions
				<div>
					<span>Call</span>
					<span> Raise </span>
					<span>Fold</span>
				</div>
			)}
		</Seat>
	);
};
