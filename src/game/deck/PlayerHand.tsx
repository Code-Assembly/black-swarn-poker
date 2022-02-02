import React from 'react';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { IPlayingCard } from 'game/models/PlayingCard.model';

import { PlayingCard, PlayingCardFrame } from 'game/deck/PlayingCard';

const Stack = styled.div<{ showCards: boolean }>`
	position: relative;
	transform: scale(0.76)
		rotateY(${({ showCards }) => (showCards ? 180 : 0)}deg);

	transform-style: preserve-3d;
`;

const StackedPlayingCard = styled(PlayingCard)<{ order: number }>`
	position: absolute;
	top: 0;
	left: 0;
	z-index: ${(props) => props.order};
	transform-origin: 50% 100%;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

// Animation
const MotionStackVariants = {
	enter: {
		opacity: 1,
		transition: {
			duration: 1,
			when: 'beforeChildren',
			staggerChildren: 0.15,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 1,
			when: 'afterChildren',
		},
	},
};

const MotionStackedPlayingCardVariants = {
	enter: ({ card, total }: { card: number; total: number }) => ({
		rotateZ: (0.5 * total - card) * 12,
		transition: {
			type: 'spring',
			duration: 0.8,
			bounce: 0.5,
		},
	}),
	exit: {
		rotateZ: 0,
		transition: {
			type: 'tween',
			duration: 0.8,
			ease: 'easeIn',
		},
	},
};

const MotionStack = motion(Stack);
const MotionStackedPlayingCard = motion(StackedPlayingCard);

export const PlayerHand: React.FC<{
	hand: Array<IPlayingCard>;
	showHand?: boolean;
}> = ({ hand, showHand = false }) => {
	return (
		<MotionStack
			showCards={showHand}
			custom={showHand}
			variants={MotionStackVariants}
			initial="exit"
			animate="enter"
		>
			{hand.map((card: IPlayingCard, order) => (
				<MotionStackedPlayingCard
					key={`${card.suit}_${card.rank}`}
					card={card}
					order={order}
					custom={{ card: order, total: hand.length }}
					variants={MotionStackedPlayingCardVariants}
				/>
			))}
			<PlayingCardFrame />
		</MotionStack>
	);
};
