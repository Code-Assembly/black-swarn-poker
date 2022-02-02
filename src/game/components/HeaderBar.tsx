import React from 'react';
import styled from 'styled-components';

import { ReactComponent as BlackSwanLogoSVG } from 'assets/icons/blackswan_logo.svg';

const Header = styled.header`
	display: flex;
	flex: none;
	background: #1c262e;
	align-items: center;
	padding: 0.6rem;

	h1 {
		font-size: 1.2em;
		line-height: 1;
		margin: 0 0 0 2.6em;
		color: #eee;
		justify-self: center;
	}
`;

const BlackSwanLogo = styled(BlackSwanLogoSVG)`
	height: 2em;
	display: inline-block;
	width: auto;
`;

export const HeaderBar = () => {
	return (
		<Header>
			<BlackSwanLogo />
			<h1>Five Card Draw</h1>
		</Header>
	);
};
