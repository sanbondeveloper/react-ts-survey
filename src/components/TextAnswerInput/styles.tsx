import styled from 'styled-components';

export const Wrapper = styled.div<{ width: number }>`
  max-width: ${(props) => props.width}px;
`;
