import React from 'react';

import styled, { css } from 'styled-components';

import { CardSuit } from 'game/models/PlayingCard.model';

import { ReactComponent as ClubIconSVG } from 'assets/icons/club.svg';
import { ReactComponent as DiamondIconSVG } from 'assets/icons/diamond.svg';
import { ReactComponent as HeartIconSVG } from 'assets/icons/heart.svg';
import { ReactComponent as SpadeIconSVG } from 'assets/icons/spade.svg';

const suitIconStyle = css`
	fill: #fff;
`;

const SuitIconMap: { [suit in CardSuit]: any } = {
	Hearts: styled(HeartIconSVG)`
		${suitIconStyle}
	`,
	Clubs: styled(ClubIconSVG)`
		${suitIconStyle}
	`,
	Spades: styled(SpadeIconSVG)`
		${suitIconStyle}
	`,
	Diamonds: styled(DiamondIconSVG)`
		${suitIconStyle}
	`,
} as const;

export const PlayingCardSuit: React.FC<{ suit: CardSuit }> = ({ suit }) => {
	const SuitIcon = SuitIconMap[suit];
	return <SuitIcon />;
};
