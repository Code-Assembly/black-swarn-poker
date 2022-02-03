import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

import { IPlayingCard } from 'game/models/PlayingCard.model';

import { PlayingCard, PlayingCardFrame } from 'game/deck/PlayingCard';

const Stack = styled.div`
	position: relative;
	transform-origin: 50% 100%;
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
	initial: {
		opacity: 0,
		scale: 0.76,
		rotateY: 0,
	},

	enter: {
		opacity: 1,
		rotateY: 0,
		transition: {
			type: 'tween',
			duration: 0.8,
			ease: 'easeOut',
		},
	},

	exit: {
		opacity: 0,
		rotateY: 0,
		transition: {
			type: 'tween',
			duration: 0.8,
			ease: 'easeOut',
		},
	},

	reveal: {
		opacity: 1,
		rotateY: 180,
		transition: {
			type: 'tween',
			duration: 0.8,
			ease: 'easeOut',
		},
	},
};

const MotionStackedPlayingCardVariants = {
	enter: ({ card, total }: { card: number; total: number }) => ({
		rotateZ: Math.floor(0.5 * total - card) * 12,
		transition: {
			type: 'spring',
			duration: 0.7,
			bounce: 0.5,
			delay: 0.4 + 0.15 * card,
		},
	}),

	exit: {
		rotateZ: 0,
		transition: {
			type: 'tween',
			duration: 0.6,
			ease: 'backIn',
		},
	},
};

const MotionStack = motion(Stack);
const MotionStackedPlayingCard = motion(StackedPlayingCard);

export const PlayerHand: React.FC<{
	hand: Array<IPlayingCard>;
	reveal?: boolean;
}> = ({ hand, reveal = false }) => {
	return (
		<AnimatePresence>
			<MotionStack
				variants={MotionStackVariants}
				initial="initial"
				animate={reveal ? 'reveal' : 'enter'}
				exit="exit"
			>
				<AnimatePresence>
					{hand.map((card: IPlayingCard, order) => (
						<MotionStackedPlayingCard
							key={`${card.suit}_${card.rank}`}
							card={card}
							order={order}
							custom={{ card: order, total: hand.length }}
							variants={MotionStackedPlayingCardVariants}
							initial="ini"
							animate="enter"
							exit="exit"
						/>
					))}
				</AnimatePresence>
				<PlayingCardFrame />
			</MotionStack>
		</AnimatePresence>
	);
};
