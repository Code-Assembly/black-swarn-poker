import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

import { IPlayingCard } from 'game/models/PlayingCard.model';

import { PlayingCard, PlayingCardFrame } from 'game/deck/PlayingCard';

const Stack = styled.div`
	position: relative;
`;

const PlaceHolder = styled(PlayingCardFrame)`
	background-color: #ffffff;
	background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%);
	z-index: 0;
`;

const StackedPlayingCard = styled(PlayingCard)<{ order: number }>`
	position: absolute;
	top: 0;
	left: 0;
	z-index: ${(props) => props.order};
	transform-origin: 50% 100%;
`;

// Animation
const MotionStackVariants = {
	enter: {
		opacity: 1,
		transition: {
			type: 'tween',
			ease: 'easeIn',
			duration: 0.5,
		},
	},

	exit: {
		opacity: 0,
		transition: {
			type: 'tween',
			ease: 'easeOut',
			duration: 0.5,
		},
	},
};

const MotionStackedPlayingCardVariants = {
	initial: {
		rotateZ: 0,
		opacity: 0,
	},

	enter: ({ order }: { order: number; numCards: number }) => ({
		opacity: 1,
		rotateZ: 360,
		transition: {
			type: 'tween',
			duration: 0.5,
			ease: 'easeIn',
			delay: 0.02 * order,
		},
	}),

	exit: ({ order, numCards }: { order: number; numCards: number }) => ({
		translateX: '-100%',
		opacity: 0,
		transition: {
			type: 'tween',
			duration: 0.3,
			ease: 'easeOut',
			delay: Math.abs(numCards - order) * 0.02,
		},
	}),
};

const MotionStack = motion(Stack);
const MotionStackedPlayingCard = motion(StackedPlayingCard);

export const CardDeck: React.FC<{
	deck: Array<IPlayingCard>;
}> = ({ deck }) => {
	return (
		<AnimatePresence>
			<MotionStack
				variants={MotionStackVariants}
				initial="exit"
				animate="enter"
				exit="exit"
			>
				<PlaceHolder />
				<AnimatePresence>
					{deck.map((card: IPlayingCard, order) => (
						<MotionStackedPlayingCard
							key={`${card.suit}_${card.rank}`}
							card={card}
							order={order}
							custom={{ order, numCards: deck.length }}
							variants={MotionStackedPlayingCardVariants}
							initial="initial"
							animate="enter"
							exit="exit"
						/>
					))}
				</AnimatePresence>
			</MotionStack>
		</AnimatePresence>
	);
};
