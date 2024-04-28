import styled from 'styled-components';

export const Container = styled.div<{ $width: number }>`
  max-width: ${(props) => props.$width}px;
`;
