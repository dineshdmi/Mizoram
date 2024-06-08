import styled from 'styled-components'
// lib
import * as styles from 'lib/styles/styles'
import palette from 'lib/styles/palette'
import { mediaQuery } from 'lib/styles/media'
import logo from "../../inp logo.png"


const Logo = () => {
	return (
		<Wrapper >
			<Img src={logo} alt="Logo" />
		</Wrapper>
	);
}

const Wrapper = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	margin-left: 16px;
	background-color: rgba(0,0,0,0);
	transition: .2s ${styles.transition};
	border-radius: 8px;
	padding: 4px 8px;
	cursor: pointer;

	${mediaQuery(700)} {
		display: none;
	}

	&:focus, &:hover {
		background-color: ${palette.blue0};
	}
`;

const Img = styled.img`
	height: 30px;
`;

export default Logo