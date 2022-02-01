import React from 'react';
import styled, { css } from 'styled-components';

import {
	ACE,
	CardSuit,
	KING,
	QUEEN,
	JACK,
	PlayingCardT,
} from 'game/models/PlayingCardT.model';
import { PlayingCardSuit } from 'game/deck/PlayingCardSuit';

import { ReactComponent as BlackSwanLogoSVG } from 'assets/icons/blackswan_logo.svg';

const SuitColours: { [suit in CardSuit]: string } = {
	Hearts: '#D32F2F',
	Diamonds: '#D32F2F',
	Clubs: '#EEEEEE',
	Spades: '#EEEEEE',
} as const;

const mapCardRankToSymbol = (rank: number): String => {
	switch (rank) {
		case ACE:
			return 'A';
		case KING:
			return 'K';
		case QUEEN:
			return 'Q';
		case JACK:
			return 'J';
		default:
			return rank.toString();
	}
};

const CardContainer = styled.article`
	background-color: transparent;
	position: relative;
	width: 240px;

	/* 
	aspect-ratio is much less complicated than the alternative solutions. 
	However, is a relatively new rule (2021) and may not be fully supported.
	*/
	aspect-ratio: 64/89;
`;

const Flip = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	text-align: center;
	transform-style: preserve-3d;
`;

const baseFaceStyle = css`
	display: flex;
	justify-content: space-between;

	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;
	padding: 8%;

	background-color: #000000;
	background-image: linear-gradient(315deg, #000000 0%, #414141 74%);
	border-radius: 2.5%;

	backface-visibility: hidden;
`;

const FrontFace = styled.div<{ suitColor: string }>`
	${baseFaceStyle}
	color: ${(props) => props.suitColor};
	svg {
		fill: ${(props) => props.suitColor};
	}
`;

const BackFace = styled.div`
	${baseFaceStyle}
	transform: rotateY(180deg);
	justify-content: center;
	align-items: center;
`;

const BlackSwanLogo = styled(BlackSwanLogoSVG)`
	width: 45%;
`;

const basePositionStyle = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 12%;

	flex: none;

	svg {
		width: 70%;
	}
`;

const TopLeft = styled.div`
	${basePositionStyle}
	align-self: flex-start;
`;
const BottomRight = styled.div`
	${basePositionStyle}
	align-self: flex-end;
	transform: scale(-1, -1);
`;

const Rank = styled.h1`
	/* We can't easily scale font relative to its parent 
	container but this looks fine at there dimensions */
	font-size: 1.8em;
	line-height: 1.6;
	font-weight: 300;
	margin: 0;
`;

export const PlayingCard: React.FC<{ card: PlayingCardT }> = ({ card }) => {
	return (
		<CardContainer>
			<Flip>
				<FrontFace suitColor={SuitColours[card.suit]}>
					<TopLeft>
						<Rank>{mapCardRankToSymbol(card.rank)}</Rank>
						<PlayingCardSuit suit={card.suit} />
					</TopLeft>
					<BottomRight>
						<Rank>{mapCardRankToSymbol(card.rank)}</Rank>
						<PlayingCardSuit suit={card.suit} />
					</BottomRight>
				</FrontFace>
				<BackFace>
					<BlackSwanLogo />
				</BackFace>
			</Flip>
		</CardContainer>
	);
};
