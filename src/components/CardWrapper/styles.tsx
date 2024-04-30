import styled from 'styled-components';
import Card from '@mui/material/Card';

export const CustomCard = styled(Card)<{ $isError?: boolean }>`
  position: relative;
  padding: 30px 20px 15px;
  margin-top: 10px;

  border: ${(props) => (props.$isError ? '1px solid red' : 'none')};
`;
