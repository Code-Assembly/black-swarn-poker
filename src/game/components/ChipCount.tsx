import React, { useEffect, useRef } from 'react';

import { animate } from 'framer-motion';
import styled from 'styled-components';

import { ReactComponent as ChipSVG } from 'assets/icons/chip.svg';

const Icon = styled(ChipSVG)`
	height: 2em;
	display: inline-block;
	width: auto;
`;

const Container = styled.div`
	display: inline-flex;
	align-items: center;

	border: 1px solid #1c262e;
	border-radius: 2.8rem;

	padding: 0.4rem;
	width: min-content;
	height: min-content;
`;

const Value = styled.p`
	margin: 0 0.8em;
	font-size: 1.2rem;
	line-height: 1;
	position: relative;

	span {
		position: absolute;
		width: 100%;
		text-align: right;
	}

	&:after {
		content: '000';
		color: transparent;
		display: block;
	}
`;

interface DealerProps {
	count: number;
}

export const ChipCount: React.FC<DealerProps> = ({ count = 0 }) => {
	const spanRef = useRef(null);
	const prevCount = useRef(0);

	useEffect(() => {
		const span = spanRef.current;

		const controls = animate(prevCount.current, count, {
			duration: 0.8,
			onUpdate(count) {
				if (span != null)
					(span as HTMLSpanElement).textContent = count.toFixed(0);
			},
		});

		prevCount.current = count;

		return () => controls.stop();
	}, [count]);

	return (
		<Container>
			<Icon />
			<Value>
				<span ref={spanRef}>{count}</span>
			</Value>
		</Container>
	);
};
