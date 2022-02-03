import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

import { IPlayer } from 'game/models/Player.model';

import { ReactComponent as ChipSVG } from 'assets/icons/chip.svg';

const Notice = styled.div`
	flex: none;
	display: flex;
	align-items: center;

    
	padding: 1rem 2rem 1rem 1rem;
	border-radius: 0.5rem;
    
	background-color: #ff4e00;
	background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
    
	position: absolute;
    left: 2rem;
	z-index: 1000;
`;

const Chip = styled(ChipSVG)`
	flex: none;
	display: inline-block;

	margin-right: 1.5rem;
	width: 4em;
	height: auto;

	fill: #eee;
`;
const Count = styled.div`
	font-size: 1.5em;
	line-height: 2;
	display: flex;
`;

const Details = styled.div`
	flex: none;
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: max-content;

	h1,
	h2 {
		color: #eee;
		margin: 0;
		line-height: 1.2;
		text-align: left;
	}

	h1 {
		font-size: 1.5em;
	}

	h2 {
		font-size: 1em;
	}
`;

const MotionNotice = motion(Notice);

const motionNoticeVariants = {
	initial: {
		translateY: '-100%',
		opacity: 0,
	},
	enter: {
		translateY: 0,
		opacity: 1,
		transition: {
			type: 'tween',
			duration: 0.4,
			ease: 'easeOut',
		},
	},
	exit: {
		translateY: '100%',
		opacity: 0,
		transition: {
			type: 'tween',
			duration: 0.4,
			ease: 'easeIn',
		},
	},
};

interface WinnerNoticeProps {
	winner: IPlayer;
	victory: 'Round' | 'Game';
}

export const WinnerNotice: React.FC<WinnerNoticeProps> = ({
	winner: player,
	victory,
}) => {
	const victoryText =
		victory === 'Game' ? `Won the GAME!` : 'Took the Round!';

	return (
		<AnimatePresence>
			<MotionNotice
				variants={motionNoticeVariants}
				initial="initial"
				animate="enter"
				exit="exit"
			>
				<Chip />
				<Details>
					<h1>{player.name}</h1>
					<h2>{victoryText}</h2>
				</Details>
			</MotionNotice>
		</AnimatePresence>
	);
};
