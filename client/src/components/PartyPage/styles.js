import styled from 'styled-components';

import { modalBlur, containerMixin } from '../../global-styles/mixins';

export const Container = styled.div`
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  width: 100%;
  ${(props) => props.modalOpen && modalBlur};
`;

export const Food = styled.div`
  ${containerMixin}
  width: 100%;
`;
