import styled from 'styled-components';

import { CardDeck } from 'game/deck/CardDeck';
import { ChipCount } from 'game/components/ChipCount';

import { IGame } from 'game/models/Game.model';

const DealerSeat = styled.article`
	display: flex;
	gap: 4%;
`;

const DealerDetail = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	margin-left: 0.8rem;

	h1,
	> p {
		margin: 0;
		margin-bottom: 0.4em;
	}

	h1 {
		font-size: 1.2em;
		line-height: 1.6;
	}

	> p {
		font-size: 1em;
		line-height: 1.6;
	}
`;

export const Dealer: React.FC<{ game: IGame; children?: React.ReactNode }> = ({
	game,
	children,
}) => {
	return (
		<DealerSeat>
			<CardDeck deck={game.deck} />
			<DealerDetail>
				<ChipCount count={game.pot} />
				<h1>Dealer</h1>
				<p>Round: {game.round}</p>
				<p>Deck: {game.deck.length}</p>
				<p>{game.stateOfPlay}</p>
				{children}
			</DealerDetail>
		</DealerSeat>
	);
};
