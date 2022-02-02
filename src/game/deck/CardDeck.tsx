import React from 'react';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { IPlayingCard } from 'game/models/PlayingCard.model';

import { PlayingCard, PlayingCardFrame } from 'game/deck/PlayingCard';

const Container = styled.div`
	position: relative;
`;

const Stack = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
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
	initial: {},

	enter: {
		transition: {
			staggerChildren: 0.02,
		},
	},

	exit: {
		transition: {
			staggerChildren: 0.02,
			when: 'afterChildren',
		},
	},
};

const MotionStackedPlayingCardVariants = {
	initial: {
		rotateZ: 0,
		opacity: 0,
	},

	enter: {
		opacity: 1,
		rotateZ: 360,
		transition: {
			type: 'tween',
			duration: 0.7,
			ease: 'easeInOut',
		},
	},

	exit: {
		y: '100%',
		opacity: 0,
		transition: {
			type: 'tween',
			duration: 0.7,
			ease: 'easeOut',
		},
	},
};

const MotionStack = motion(Stack);
const MotionStackedPlayingCard = motion(StackedPlayingCard);

export const CardDeck: React.FC<{
	deck: Array<IPlayingCard>;
}> = ({ deck }) => {
	return (
		<Container>
			<PlaceHolder />
			{deck.length > 0 && (
				<MotionStack
					variants={MotionStackVariants}
					initial="initial"
					animate="enter"
					exit="exit"
				>
					{deck.map((card: IPlayingCard, order) => (
						<MotionStackedPlayingCard
							key={`${card.suit}_${card.rank}`}
							card={card}
							order={order}
							variants={MotionStackedPlayingCardVariants}
						/>
					))}
				</MotionStack>
			)}
		</Container>
	);
};
