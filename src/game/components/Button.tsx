import React from 'react';

import styled from 'styled-components';

const StyledButton = styled.button<ButtonProps>`
	padding: 0.5em 1.2em;
	min-width: max-content;

	color: #eee;

	font-size: 1em;
	line-height: 1;
	font-weight: 700;

	background-color: #89d4cf;
	background-image: linear-gradient(315deg, #89d4cf 0%, #6e45e1 74%);

	border: 0px;
	border-radius: 3px;

	appearance: none;
	cursor: pointer;

	/* Remove default focus styles for mouse users 
	ONLY if :focus-visible is supported on this platform. */
	:focus:not(:focus-visible) {
		outline: none;
	}
`;

export type ButtonProps = {
	children?: HTMLCollection | string;
	onClick: (e?: React.MouseEvent) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ onClick, children, ...otherProps }: ButtonProps) => {
	return (
		<StyledButton onClick={onClick} {...otherProps}>
			{children}
		</StyledButton>
	);
};
