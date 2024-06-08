import styled from 'styled-components'
// lib
import * as styles from 'lib/styles/styles'

const ViewerWrapper = styled.div`
  position: relative;
  width : auto;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  ${styles.scrollbar(0)};
`;

export default ViewerWrapper