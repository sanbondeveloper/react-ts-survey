import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';

export const MenuItemWithPadding = styled(MenuItem)`
  padding: 15px 10px;
`;

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const OptionText = styled.p`
  flex: 1;
  margin-left: 10px;
`;
