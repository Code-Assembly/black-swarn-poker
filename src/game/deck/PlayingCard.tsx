import React from 'react';

import styled, { css } from 'styled-components';

import {
	ACE,
	CardSuit,
	IPlayingCard,
	JACK,
	KING,
	QUEEN,
} from 'game/models/PlayingCard.model';
import { PlayingCardSuit } from 'game/deck/PlayingCardSuit';

import { ReactComponent as BlackSwanLogoSVG } from 'assets/icons/blackswan_logo.svg';

const SuitColours: { [suit in CardSuit]: string } = {
	Hearts: '#D32F2F',
	Diamonds: '#D32F2F',
	Clubs: '#EEEEEE',
	Spades: '#EEEEEE',
} as const;

const mapCardRankToSymbol = (rank: number): string => {
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

export const PlayingCardFrame = styled.article`
	background-color: transparent;
	position: relative;

	border-radius: 0.6rem;

	/* 
	aspect-ratio is much less complicated than the alternative solutions. 
	However, is a relatively new rule (2021) and may not be fully supported.
	*/
	aspect-ratio: 64/89;
	width: 12.4em;

	transform-style: preserve-3d;
	transform: none;
`;

const Flip = styled.div<{ show: boolean }>`
	position: relative;
	width: 100%;
	height: 100%;
	transform-style: preserve-3d;
	transform: rotateY(${(props) => (props.show ? 0 : 180)}deg);
`;

const baseFaceStyle = css`
	display: flex;
	justify-content: space-between;

	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;
	padding: 8% 10%;

	background-color: #000000;
	background-image: linear-gradient(315deg, #000000 0%, #414141 74%);
	border-radius: 0.6rem;

	backface-visibility: hidden;
`;

const FrontFace = styled.section<{ suitColor: string }>`
	${baseFaceStyle}
	color: ${(props) => props.suitColor};
	svg {
		fill: ${(props) => props.suitColor};
	}
`;

const BackFace = styled.section`
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

interface PlayingCardProps {
	card: IPlayingCard;
	show?: boolean;
	className?: string;
}

export const PlayingCard = React.forwardRef<any, PlayingCardProps>(
	({ card, show = false, className }, ref) => {
		return (
			<PlayingCardFrame ref={ref} className={className}>
				<Flip show={show}>
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
			</PlayingCardFrame>
		);
	}
);
